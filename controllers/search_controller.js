
const express = require('express');
const router = express.Router();

const mCat = require('../models/category_model');
const mPro = require('../models/product_model');
const order = require('../models/order_model');
const extendsFunc = require('../utils/extensionFunc'), 
    run = extendsFunc.errorHandle,
    //function to convert milisecconds to date
    convertTime = extendsFunc.convertTime;
 router.get('/', async (req, res, next) => {
    let search =req.query.search|| "laptop";
    let page =parseInt(req.query.page)||1;
    let order_ =req.query.order||"Price";

    
    // lấy product
    let product = [];
    const productinfo = await mPro.getproductbysearch(search,page,order_);

    for (let i = 0; i < productinfo.length; i++) {

        // lấy số lượt đã đấu giá và giá cao nhất
        const [product_number_maxprice, pnm_err] = await run(order.maxprice_numberbidded(productinfo[i].ProID));
        if (pnm_err) {
            return next(pnm_err);
        }
      
        // lấy tên người trả giá cao nhât
        
        const [user_name, user1_err] = await run(order.getuser_name(product_number_maxprice.bidderID));
        if (user1_err) {
            return next(user1_err);
        }
        // console.log(user_name);
        // lấy tên người bán
        const [user_name2, user2_err] = await run(order.getuser_name(productinfo[i].SellerID));
        if (user2_err) {
            return next(user2_err);
        }
        console.log(user_name2);
        // chuyển đổi thời gian kết thúc thành thười gian còn lại
        const endtime = new Date(productinfo[i].end_time);
        const remainTime = convertTime(endtime.getTime() - Date.now());

        // tạo object để rander 
        product[i] = {
            SubCatID: productinfo[i].SubCatID,
            ProID: productinfo[i].ProID,
            ProName: productinfo[i].ProName,
            Price: productinfo[i].Price,
            SellerID: productinfo[i].SellerID,
            NameSeller: user_name2.f_username,
            rating: productinfo[i].Rating,
            ceilPrice: productinfo[i].CeilPrice,
            //using toLocateDateString to convert international time to local time string 
            Post: productinfo[i].create_time.toLocaleDateString(),
            End: remainTime,
            number_of_bidded: product_number_maxprice.number_of_bidded,
            MaxPeiceBidded: product_number_maxprice.Max_PriceOrdered,
            BidderID: product_number_maxprice.bidderID,
            Bidder_name: user_name.f_username,
            IncreasePrice: productinfo[i].IncreasePrice
        }
    }
    const [categories, cErr] = await run(mCat.allCategories());
    if (cErr) {
        return next(cErr);
    }
    // console.log(categories);
    let sideCat = [];
    for (let i = 0; i < categories.length; i++) {
        sideCat[i] = {
            CatID: categories[i].CategoryID,
            CatName: categories[i].CatName,
        };
    }
    const cats = await mCat.allCategories();
    for (let cat of cats) {
        cat.isActive = false;
    }
    console.log(product);
    const maxproduct = product;
    const maxpage = [];
    let maxlength = 1;
    if (!maxproduct)
    {
    }
    else
    {
        maxlength = Math.ceil(maxproduct.length/6);
    }
    for (i = 0; i <maxlength; i++)
    {
        maxpage[i] = {
            maxpage_page: i+1,
        };
    }
    const previouspage = page-1;
    const nextpage = page+1;
    res.render(`./layouts/category`, {
        title: `Search`,
        layout: 'category',
        sideCategory: sideCat,
        cats,
        products: product,
        order_,
        page,
        maxpage,
        previouspage,
        nextpage,
        search,
    });
 });
module.exports = router;