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

//get list of bidded-products
router.get('/bidded', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        //B1: get list of bidded-products base on user ID
        const userID = req.user.f_userID;

        const [listofPro, error] = await run(order.getMyBiddedList(userID));

        //B2: check if user has some interested-products
        if (error) {
            return next(error);
        }
        emptyList = false;
        let topBidders = [];
        if (!listofPro) {
            //reder layout 
            emptyList = true;
        } else {
            for (eachPro of listofPro) {
                eachPro.end_time = eachPro.end_time.toLocaleDateString();
            }
            for (i = 0; i < listofPro.length; i++) {
                let topBidder = await order.getTopBidderByProID(listofPro[i].ProID);
                topBidders[i] = topBidder;
                let highest = false;
                if (userID == topBidder.f_userID) {
                    highest = true;
                }
                listofPro[i] = {
                    ProID: listofPro[i].ProID,
                    Rating: listofPro[i].Rating,
                    ProName: listofPro[i].ProName,
                    OrderID: listofPro[i].OrderID,
                    priceOrder: listofPro[i].priceOrder,
                    IsSuccess: listofPro[i].IsSuccess,
                    end_time: listofPro[i].end_time,
                    topBidder: topBidder,
                    highest,
                }
            }
            //console.log(listofPro);
        }

        //B3: convert end time of product


        //B4: render to layout         
        res.render('./layouts/account/bidded', {
            title: 'Bidded',
            layout: './account/bidded',
            listofPro,
            emptyList,
        });
    }
});

router.get('/won', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        //B1: get list of bidded-products base on user ID
        const userID = req.user.f_userID;

        const [listofPro, error] = await run(order.getMyBiddedEndList(userID));

        //B2: check if user has some interested-products
        if (error) {
            return next(error);
        }
        emptyList = false;
        let topBidders = [];
        let winningList = [];
        if (!listofPro) {
            //reder layout 
            emptyList = true;
        } else {
            for (eachPro of listofPro) {
                eachPro.end_time = eachPro.end_time.toLocaleDateString();
            }
            for (i = 0; i < listofPro.length; i++) {
                let topBidder = await order.getTopBidderByProID(listofPro[i].ProID);
                topBidders[i] = topBidder;
                if (userID == topBidder.f_userID) {
                    winningList[i] = {
                        ProID: listofPro[i].ProID,
                        Rating: listofPro[i].Rating,
                        ProName: listofPro[i].ProName,
                        OrderID: listofPro[i].OrderID,
                        priceOrder: listofPro[i].priceOrder,
                        IsSuccess: listofPro[i].IsSuccess,
                        end_time: listofPro[i].end_time,
                    }
                }
            }
            //console.log(winningList);
        }

        //B3: convert end time of product


        //B4: render to layout         
        res.render('./layouts/account/won', {
            title: 'Won',
            layout: './account/won',
            winningList,
            emptyList,
        });
    }
});

//get watch list of user 
router.get('/watch-list', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        //B1: get list of bidded-products base on user ID
        const userID = req.user.f_userID;

        const [listofPro, error] = await run(watchList.getWatchList(userID));
        //B2: check if user has some interested-products
        if (error) {
            return next(error);
        }
        emptyList = false;
        if (!listofPro) {
            //reder layout 
            emptyList = true;
        } else {


            //B3: Convert time of products 
            for (eachPro of listofPro) {
                eachPro.end_time = eachPro.end_time.toLocaleDateString();
            }

            //B4: render to layout 
            //res.send(listofPro);
            //console.log(listofPro);
        }
        res.render('./layouts/account/watch-list', {
            title: 'Watch-List',
            layout: './account/watch-list',
            listofPro,
            emptyList,
        });
    }
});
//add to watch list
router.get('/add-watch-list/:proid', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        const proID = req.params.proid;
        console.log(proID);
        return res.redirect('/user/signin');
    } else {
        //B1: get proid and user ID to add to watchlist 
        const proID = req.params.proid;
        const userID = req.user.f_userID;

        //B2: create entity to add to database
        const newPro = {
            ProID: proID,
            UserID: userID,
        };

        //B3: Add to watchlist
        const [isValid, pErr] = await run(watchList.checkWatchList(userID, proID));
        if (pErr) {
            return next(err);
        }
        if (isValid) {
            console.log('You did add this product to Watch-List');
        } else {
            const [id, err] = await run(watchList.addProductToWatchList(newPro));
            if (err) {
                return next(err);
            } else {
                console.log(id);
            }
        }


        //B4: redirect to watch-list
        return res.redirect('/account/watch-list');
    }
});
router.post('/delete', async (req, res, next) => {
    let proid = parseInt(req.body.proID_);
    const userid = req.user.f_userID;
    console.log(req.body.proID_);
    console.log(proid);
    const [watID, err] = await run(watchList.getWatchListID(userid, proid));
    if (err) {
        return next(err);
    }

    const del = await run(watchList.delete(watID.WatchListID));
    if (err) {

        return next(err);
    }

    return res.redirect('/account/watch-list');


});

//sign out
router.get('/signout', (req, res) => {
    //signout button in side of account page so you can't signout usless you sign in  
    req.logout();
    res.redirect('/user/signin');
});

router.get('/review', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        // B1: get user ID (had been saved) from req in session
        const userID = req.user.f_userID;
        const [user, u_err] = await run(account.getByUserID(userID));
        if (u_err) {
            return next(u_err);
        }
        //get data by user ID 
        const [reviews, err] = await run(mReview.getAllReviewBySendID(userID));
        if (err) {
            return next(err);
        }

        let emptyList = false;
        let isBidder = true;
        let isSeller = false;
        if (!reviews) {
            let messenge = "Không có review nào";
            console.log(messenge);
            emptyList = true;
        } else {
            //display perrmisson of account
            if (user.f_permission === 1) {
                isBidder = false;
                isSeller = true;

            } else if (user.f_permission === 2) {
                isBidder = true;
                isSeller = true;
            }
            console.log(reviews);
        }

        for (const review of reviews) {
            review.OrderDate = review.OrderDate.toLocaleDateString();
        }
        //render layout account 

        res.render('./layouts/account/review', {
            title: 'Review',
            layout: './account/review',
            emptyList,
            reviews,
            isBidder,
            isSeller,
        });
    }
});

module.exports = router;