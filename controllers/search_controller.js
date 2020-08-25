
const express = require('express');
const router = express.Router();

const extendsFunc = require('../utils/extensionFunc'), 
    run = extendsFunc.errorHandle,
    //function to convert milisecconds to date
    convertTime = extendsFunc.convertTime;

//  router.get('/', async (req, res, next) => {
//     let search =req.query.search|| "";
//     let page =parseInt(req.query.page)||1;
//     let order_ =req.query.order|| "Tên";

    
//     // lấy product
//     res.render(`./layouts/`, {
//         title: `Search`,
//         layout: '',
//         order_,
//         page,
//         maxpage,
//         previouspage,
//         nextpage,
//         search,
//     });
//  });

module.exports = router;