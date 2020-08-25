const express = require('express');
const router = express.Router();
const account = require('../models/user_model');
const major_model = require('../models/major_model');

//require extenstion
const run = require('../utils/extensionFunc').errorHandle;
const bcrypt = require('bcrypt');
var Recaptcha = require('express-recaptcha').RecaptchaV2;
const saltRounds = 10;

//get profile (profile has been rendered in form, so user can change it )
router.get('/profile', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        console.log("Sign in!!");
        // B1: get user ID (had been saved) from req in session
        const userID = req.user.id;
        //get data by user ID 
        const [user, err] = await run(account.getByUserID(userID));
        if (err) {
            return next(err);
        }
        //display perrmisson of account
        let permission = "User";
        let isUser = true;
        let isAdmin = false;

        //console.log(user);
        if (user.permission === 1) {
            permission = "Admin";
            isUser = false;
            isAdmin = true;
        }
        //infor of user show in profile 
        //can't change permission and rating
        const infor = {
            name: user.name,
            mssv: user.mssv,
            email: user.email,
            major: user.major,
            year: user.year,
            permiss: permission,
        };
        console.log("User information: ", infor);

        let total_year = [];
        for (i = 2016; i <= 2019; i++) {
            if (i == infor.year) {
                isSelected = true;
            } else {
                isSelected = false;
            }
            total_year[i-2016] = {
                year: i,
                isSelected,
            }
        }
        const [majors, merr] = await run(major_model.allMajor());
        if (err) {
            return next(merr);
        }

        let total_major = [];
        for (i = 1; i < majors.length; i++) {
            if (i == infor.major) {
                isSelected = true;
            } else {
                isSelected = false;
            }
            total_major[i-1] = {
                major: majors[i].name,
                id: majors[i].id,
                isSelected,
            }
        }

        res.render('./layouts/account/profile', {
            title: 'Account',
            layout: './account/profile',
            infor,
            total_major,
            total_year,
            isUser,
            isAdmin,
        });
    }
});

//post profile (edited profile of account)
router.post('/profile', async (req, res, next) => {
    //B1: user ID from req in session   
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        const userID = req.user.id;

        //B2: get data changed from profile form
        const fullname = req.body.fullname;
        const email = req.body.email;
        const major = req.body.major;
        const year = req.body.year;
        let oldPass = req.body.old_password;
        const newPass = req.body.new_password;
        const isChangePass = req.body.is_change_pass;

        // B3: get data by user ID 
        const [user, err] = await run(account.getByUserID(userID));
        if (err) {
            return next(err);
        }

        //B4: check if user want to change password
        if (isChangePass === 'checked') {
            //if old password is not correct
            if (!bcrypt.compareSync(oldPass, user.password)) {
                return res.redirect('/user/signin');
            } else {
                //hash password
                oldPass = bcrypt.hashSync(newPass, saltRounds);
            }
        } else {
            console.log('Password: ', user.password);
            oldPass = user.password;
        }


        //B5: create entity for change
        const newInfor = {
            id: userID,
            mssv: user.mssv,
            name: fullname,
            email: email,
            password: oldPass,
            major: major,
            year: year,
            permission: user.permission,
        };

        //B6: change database 
        const [changed, error] = await run(account.updateUserInfor(newInfor));
        if (error) {
            console.log(error);
        } else {
            console.log("Update user information successfully");
        }
        return res.redirect('/account/profile');
    }
});

//sign out
router.get('/signout', (req, res) => {
    //signout button in side of account page so you can't signout usless you sign in  
    req.logout();
    res.redirect('/user/signin');
});

module.exports = router;