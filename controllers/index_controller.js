const express = require('express');
const router = express.Router();

const mUser = require('../models/user_model');
const mCat = require('../models/category_model');
const mPro = require('../models/product_model');
const order = require('../models/order_model');
const extendsFunc = require('../utils/extensionFunc'),
    run = extendsFunc.errorHandle,
    convertTime = extendsFunc.convertTime;

//direct of home page
router.get('/', async (req, res, next) => {

    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {

        res.render('home', {
            title: 'Homepage',
        });
    }
});

//contact page
router.get('/contact', (req, res) => {
    res.render('./layouts/contact', {
        title: 'Contact',
        layout: 'contact',
    });
});

//about page
router.get('/about', (req, res) => {
    res.render('./layouts/about', {
        title: 'About',
        layout: 'about',
    });
});

module.exports = router;