const express = require('express');
const path = require('path');
const router = express.Router();
const account = require('../models/user_model');
const major_model = require('../models/major_model');

//require extenstion
const run = require('../utils/extensionFunc').errorHandle;
const bcrypt = require('bcrypt');
var Recaptcha = require('express-recaptcha').RecaptchaV2;
const saltRounds = 10;

//get profile (profile has been rendered in form, so user can change it )
router.get('', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        // B1: get user ID (had been saved) from req in session
        const userID = req.user.id;
        //get data by user ID 
        const [user, err] = await run(account.getByUserID(userID));
        if (err) {
            return next(err);
        }

        let year_ = parseInt(req.query.year) || user.year;
        //infor of user show in profile 
        const infor = {
            name: user.name,
            mssv: user.mssv,
            email: user.email,
            major: user.major,
            year: user.year,
            permiss: user.permission,
        };

        let total_year = [];
        var valid;
        for (i = 2016; i <= 2019; i++) {
            if (i <= 2018) {
                valid = true;
            } else {
                valid = false;
            }
            total_year[i - 2016] = {
                id: i,
                year: i,
                valid: valid,
            }
        }

        const [majors, merr] = await run(major_model.allMajor());
        if (err) {
            return next(merr);
        }

        let total_major = [];
        var name, name_eng;
        var AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ", "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ"
        ];
        for (i = 1; i < majors.length; i++) {
            if (i == infor.major && infor.year == year_) {
                isSelected = true;
            } else {
                isSelected = false;
            }
            if (majors[i].id == 4) {
                name = majors[i].name + "/Công nghệ thông tin"
            } else {
                name = majors[i].name;
            }
            name_eng = majors[i].name;
            for (var k = 0; k < AccentsMap.length; k++) {
                var re = new RegExp('[' + AccentsMap[k].substr(1) + ']', 'g');
                var char = AccentsMap[k][0];
                name_eng = name_eng.replace(re, char);
            }
            name_eng = name_eng.replace(/\s/g,''); 
            total_major[i - 1] = {
                major: name,
                id: majors[i].id,
                isSelected,
                name_eng: name_eng,
                credit: 38,
            }
        }
        console.log(year_);

        res.render('./layouts/graduate', {
            title: 'Chương trình đào tạo',
            layout: 'graduate',
            infor,
            total_major,
            total_year,
            year_,
        });
    }
});

router.get('/:year/view/:major', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        // B1: get user ID (had been saved) from req in session
        const userID = req.user.id;
        //get data by user ID 
        const [user, err] = await run(account.getByUserID(userID));
        if (err) {
            return next(err);
        }
        const year_ = parseInt(req.params.year) || 2016;
        const major_ = parseInt(req.params.major) || 1;
        const file_path = '/graduate/' + year_ + '/' + major_;

        res.render('./layouts/graduate_details', {
            title: 'Chương trình đào tạo',
            layout: 'graduate_details',
            file_path,
        });
    }
});

module.exports = router;