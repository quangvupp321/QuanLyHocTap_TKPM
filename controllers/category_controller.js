const express = require('express');
const router = express.Router();

const mCat = require('../models/category_model');
const mPro = require('../models/product_model');
const mUser = require('../models/user_model');
const order = require('../models/order_model');
const extendsFunc = require('../utils/extensionFunc'),
    run = extendsFunc.errorHandle,
    //function to convert milisecconds to date
    convertTime = extendsFunc.convertTime;

router.get('', async (req, res, next) => {

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
    let page = parseInt(req.query.page) || 1;
    let order_ = req.query.order || "Price";

    // console.log(sideCat);
    const cats = await mCat.allCategories();
    for (let cat of cats) {
        cat.isActive = false;
    }
    // console.log(cats);
    let product = [];
    const productinfo = await mPro.allProductslimit(page,order_);
    //  console.log(productinfo);

    for (let i = 0; i < productinfo.length; i++) {


        // lấy số lượt đã đấu giá và giá cao nhất
        const [product_number_maxprice, pnm_err] = await run(order.maxprice_numberbidded(parseInt(productinfo[i].ProID)));
        if (pnm_err) {
            return next(pnm_err);
        }

        // lấy tên người trả giá cao nhât
        // console.log(product_number_maxprice.bidderID);

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
    console.log(product);
    const maxproduct = await mPro.allProducts();
    const maxpage = [];
    for (i = 0; i <Math.ceil(maxproduct.length/6); i++)
    {
        maxpage[i] = {
            maxpage_page: i+1,
        };
    }
    const previouspage = page-1;
    const nextpage = page+1;
    res.render(`./layouts/category`, {
        title: `All Category`,
        layout: 'category',
        sideCategory: sideCat,
        order_,
        cats,
        page,
        maxpage,
        previouspage,
        nextpage,
        products: product,
    });
});


//------------------------------------------
router.get('/:id', async (req, res) => {
    const [categories, cErr] = await run(mCat.allCategories());
    if (cErr) {
        return next(cErr);
    }
    let sideCat = [];
    for (let i = 0; i < categories.length; i++) {
        sideCat[i] = {
            CatID: categories[i].CategoryID,
            CatName: categories[i].CatName,
        };
    }
    console.log('haha2');
    console.log(req.query.page);

    const id = parseInt(req.params.id) || 1;
    let page = parseInt(req.query.page) || 1;
    let order_ = req.query.order || "Price";
    const cats = await mCat.allCategories();
    for (let cat of cats) {
        if (cat.CategoryID === id) {
            cat.isActive = true;
        } else {
            cat.isActive = false;
        }
    }
    const subCategories = await mCat.getSubCategoryByCategoryID(id);
    const category = await mCat.getCategoryByCategoryID(id);

    console.log(id);
    let product = [];
    const productinfo = await mPro.getProductByCatIdlimit(id,page,order_);
    console.log(productinfo);
    if (productinfo != null) {
        for (let i = 0; i < productinfo.length; i++) {


            // lấy số lượt đã đấu giá và giá cao nhất
            const [product_number_maxprice, pnm_err] = await run(order.maxprice_numberbidded(parseInt(productinfo[i].ProID)));
            if (pnm_err) {
                return next(pnm_err);
            }

            // lấy tên người trả giá cao nhât
            console.log(product_number_maxprice.bidderID);

            const [user_name, user1_err] = await run(order.getuser_name(product_number_maxprice.bidderID));
            if (user1_err) {
                return next(user1_err);
            }

            // lấy tên người bán
            const [user_name2, user2_err] = await run(order.getuser_name(productinfo[i].SellerID));
            if (user2_err) {
                return next(user2_err);
            }

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


    }

    console.log(product);
    const maxproduct = await mPro.getProductByCatId(id);
    const maxpage = [];
    let maxlength = 1
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
        title: `${category.CatName}`,
        layout: 'category',
        sideCategory: sideCat,
        cats,
        subCategories,
        page,
        maxpage,
        previouspage,
        nextpage,
        products: product
    });
});



router.get('/:catid/cat/:subid', async (req, res) => {
    const [categories, cErr] = await run(mCat.allCategories());
    if (cErr) {
        return next(cErr);
    }
    let sideCat = [];
    for (let i = 0; i < categories.length; i++) {
        sideCat[i] = {
            CatID: categories[i].CategoryID,
            CatName: categories[i].CatName,
        };
    }

    const catid = parseInt(req.params.catid) ;
    const subid = parseInt(req.params.subid) ;
    let page = parseInt(req.query.page) || 1;
    let order_ = req.query.order || "Price";
    const cats = await mCat.allCategories();
    for (let cat of cats) {
        if (cat.CategoryID === catid) {
            cat.isActive = true;
        }
        else {
            cat.isActive = false;
        }
    }

    const category = await mCat.getCategoryByCategoryID(catid);
    const subCategory = await mCat.getSubCategoryByCategoryID(catid);
    const subcas = await mCat.getSubCategoryByCategoryID(catid);
    for (let subCa of subcas) {
        if (subCa.SubCatID === subid) {
            subCa.isActive_sub = true;
        } else {
            subCa.isActive_sub = false;
        }
    }
    
    let product = [];
    const productinfo = await mPro.productBySubCatIDlimit(subid,page,order_);
    console.log(productinfo);

    for (let i =0 ;i< productinfo.length ; i++)
    {


        // lấy số lượt đã đấu giá và giá cao nhất
        const [product_number_maxprice,pnm_err] = await run(order.maxprice_numberbidded(parseInt(productinfo[i].ProID)));
            if(pnm_err)
        {
            return next(pnm_err);
        }
   
        // lấy tên người trả giá cao nhât
        console.log(product_number_maxprice.bidderID);
    
        const [user_name,user1_err]= await run(order.getuser_name(product_number_maxprice.bidderID));
        if(user1_err)
        {
            return next(user1_err);
        }
        
        // lấy tên người bán
        const [user_name2,user2_err]= await run(order.getuser_name(productinfo[i].SellerID));
        if(user2_err)
        {
            return next(user2_err);
        }  
         
        // chuyển đổi thời gian kết thúc thành thười gian còn lại
        const endtime = new Date(productinfo[i].end_time);
        const remainTime = convertTime(endtime.getTime() - Date.now());

        // tạo object để rander 
        product[i]={
            SubCatID: productinfo[i].SubCatID,
            ProID: productinfo[i].ProID,
            ProName: productinfo[i].ProName,
            Price: productinfo[i].Price,
            SellerID: productinfo[i].SellerID,
            NameSeler: user_name2.f_username,
            rating:productinfo[i].Rating,
            ceilPrice: productinfo[i].CeilPrice,
            //using toLocateDateString to convert international time to local time string 
            Post: productinfo[i].create_time.toLocaleDateString(),
            End: remainTime,
            number_of_bidded: product_number_maxprice.number_of_bidded,
            MaxPeiceBidded: product_number_maxprice.Max_PriceOrdered,
            BidderID:product_number_maxprice.bidderID,   
            Bidder_name:user_name.f_username,
            IncreasePrice: productinfo[i].IncreasePrice
        }

    }
    const subCate = await mCat.getSubCategoryBySubCatID(subid);
    console.log(product);
    const maxproduct = await mPro.getAllProductBySubCatId(subid);
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
        title: `${subCate.SubCateName}`,
        layout: 'category',
        sideCategory: sideCat,
        subCategories: subcas,
        order_,
        cats,
        page,
        maxpage,
        previouspage,
        nextpage,
        products: product
    });
});


module.exports = router;