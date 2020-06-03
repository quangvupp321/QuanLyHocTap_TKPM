const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const account = require('../models/user_model');
const run = require('../utils/extensionFunc').errorHandle;
/*
var Recaptcha = require('express-recaptcha').RecaptchaV2;
var recaptcha = new Recaptcha('6Lc_0coUAAAAAFViwejrcZT3BVpDrzcF6jlqB_JM', '6Lc_0coUAAAAALGMehCLsHsucDQJLnmSGdxqNXqw', {
    callback: 'cb'
});
*/

// chi phí để xử lí dữ liệu tạo ra hash pass
const saltRounds = 10;

//render layout login và layout register
router.get('/signin', (req, res) => {
    res.render('./layouts/signin', {
        title: 'Signin',
        layout: 'signin',
    });
});

router.get('/signup', (req, res) => {
    res.render('./layouts/signup', {
        title: 'Signup',
        layout: 'signup',
    });
});

// log in
router.post('/signin', (req, res, next) => {
    //authenticate with local sign in =
    passport.authenticate('local', (err, user, infor) => {
        // error
        if (err) {
            return next(err);
        }
        // didn't sign in
        if (!user) {
            return res.render('./layouts/signin', {
                layout: 'signin',
                title: 'Signin Failed',
                messenge: infor.message,
            });
        }
        // success
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/account/profile');
        });
    })(req, res, next);
});

//register for new account
router.post('/signup', async (req, res, next) => {
    //B1: get data from sign up form
    const fullName = req.body.fullname;
    const userName = req.body.username;
    const password = req.body.password;
    const DOB = req.body.birth;

    //B2: hash password 
    const hashPass = bcrypt.hashSync(password, saltRounds);

    //B3: check email is exists
    /*
    const [isExists, error] = await run(account.checkEmmailExists(email));
    if (error) {
        return next(error);
    }
    //is exist
    else if (isExists) {
        return res.render('./layouts/signup', {
            layout: 'signup',
            captcha: recaptcha.renderWith({
                'hl': 'en-US'
            }),
            message: 'Email has been registed',
        })
    }
    */

    //B4: create object to add new account
    const newAccount = {
        f_fullname: fullName,
        f_username: userName,
        f_email: "abc@gmail.com",
        f_password: hashPass,
        f_birth: DOB,
        f_address: "address",
        f_rating: 0,
        f_permission: 0,
    };

    //B5: check captcha
    const [id, err] = await run(account.addNewAccount(newAccount));
    if (err) {
        console.log(err);
    } else {
        console.log("New id: " + id);
    }
    return res.redirect('/user/signin');
});

module.exports = router;