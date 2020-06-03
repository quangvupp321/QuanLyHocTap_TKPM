const express = require('express');
const router = express.Router();

const mCat = require('../models/category_model');
const mPro = require('../models/product_model');
const mUser = require('../models/user_model');
const order = require('../models/order_model');
const mRefuse = require("../models/refuse_model");

const extendsFunc = require('../utils/extensionFunc'),
    run = extendsFunc.errorHandle,
    //function to convert milisecconds to date
    convertTime = extendsFunc.convertTime;


router.get('/:id', async (req, res, next) => {
    //B1: get category fordropdown button

    const LIMIT = 5;
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
    //B2: get data need to render
    //product details data 
    const id = parseInt(req.params.id);
    let [product,proErr] = await run(mPro.productByProId(id));
    if (proErr)
    {
        return next(proErr);
    }
    //seller Name
    const [seller,sellerErr] = await run(mUser.getByUserID(product.SellerID));
    if (sellerErr)
    {
        return next(sellerErr);
    }
    //Subcategory
    const [subCategory,subErr] = await run(mCat.getSubCategoryBySubCatID(product.SubCatID));
    if (subErr)
    {
        return next(subErr);
    }
    //Category
    const [category,catErr] = await run(mCat.getCategoryByCategoryID(subCategory.categoryID));
    if (catErr)
    {
        return next(catErr);
    }   
    //product in the same sub category
    let [samePro,sProErr] = await run(mPro.productBySubCatID(LIMIT,product.SubCatID));
    if (sProErr)
    {
        return next(sProErr);
    }
    //list of Bidded of this product
    const [listofBidded,biddedError] = await run(order.getListBidedOfProducts(id)) ; 
    if (biddedError)
    {
        return next(biddedError);
    }

    //B2: get list of bidded
    for (bidded of listofBidded)
    {
        // convert time of bidded so it easy to render
        bidded.OrderDate = bidded.OrderDate.toLocaleDateString();

        // hide a part in name of  bidder
        let name = bidded.f_fullname;
        let postion = name.lastIndexOf(" ");
        name = name.slice(0,postion);
        bidded.f_fullname = bidded.f_fullname.replace(name, '*******');
    }

    let name = seller.f_fullname;
    let postion = name.lastIndexOf(" ");
    name = name.slice(0,postion);
    seller.f_fullname = seller.f_fullname.replace(name, '*******');
    

    //B3: lsit of bidded is sorted so the first elemet is the highest price
    let Offer = listofBidded[0].PriceOrdered + product.IncreasePrice;
    //console.log(Offer);
    let canBidded = true;

    //B4: Check end time of product 
    const timeremain = product.end_time.getTime() - Date.now();
    
    //B5: check if product will end in 3 days timeremain is milisecond and convert create time
    if (timeremain < 0)
    {
        canBidded = false;
    }
    else if (timeremain < 3*24*60*60*1000)
    {
        product.end_time = convertTime(timeremain);
    }
    else
    {
        product.end_time = product.end_time.toLocaleDateString();      
    }
   console.log(canBidded);
    product.create_time = product.create_time.toLocaleDateString();
    //B6: get infor of 5 products in the same subcategory
    let sameProducts = [];
    for (let i = 0 ; i < samePro.length ;i++)
    {
        //B6.1: Check if didn't get the same product 
        if (samePro[i].ProID != product.ProID)
        {
            //B6.2: get name of user who bidded the highest price
            const [productinfo, spErr] = await run(order.nameofMostPriceBidder(samePro[i].ProID));
            //console.log(productinfo);
            if (spErr)
            {
                return next(spErr);
            }
            //B6.3 : convert end time to remainingTime
            const endtime = new Date(samePro[i].end_time);
            const remainTime = convertTime(endtime.getTime() - Date.now());

            //B6.4: mask name
            let name = productinfo.f_fullname;
            
            let postion = name.lastIndexOf(" ");
            name = name.slice(0,postion);
            productinfo.f_fullname = productinfo.f_fullname.replace(name, '*******');


        //B6.5: Create a object contain data to render 
            sameProducts[i] = {
                ProID: samePro[i].ProID,
                ProName: samePro[i].ProName,
                Price: productinfo.maxprice,
                Name: productinfo.f_fullname,
                ceilPrice: samePro[i].CeilPrice,
                NameSeller: seller.f_fullname,
                //using toLocateDateString to convert international time to local time string 
                Post: samePro[i].create_time.toLocaleDateString(),
                End: remainTime,
                number_of_bidded:samePro[i].number_of_bidded,
            };
        }
    }

    res.render(`./layouts/product_details`, {
        title: `${product.ProName}`, 
        layout: 'product_details',
        product,
        seller,
        Offer,
        listofBidded,
        subCategory,
        category,
        sameProducts,
        sideCategory: sideCat,
        canBidded,
    });
});

// bidded products 
router.post('/bidded-now', async (req,res,next)=>{
    
    //B1: check if user is login
    if (!req.user)
    {
        console.log("Not sign in!!"); 
        return res.redirect('/user/signin');
    }
    else 
    {
    //B2: get data from hidden form 
        const PriceOrder = parseInt(req.body.priceOdrder);
        const sellerID = parseInt(req.body.Seller);
        const tProID = parseInt(req.body.ProID);
        const UserID = req.user.f_userID;
        const refuse = false;
        let messenge = "";
        let success  = 0;
        const INCRESE = 15;

        //B3:get data and check if user can bidded any product
        const [user,err] = await run(mUser.getByUserID(UserID));
        if (err)
        {
            return next(err);
        }
        const [refuselist,rErr] = await run(mRefuse.getRefuseLIst(tProID,UserID));
        if(rErr)
        {
            return next(rErr);
        }
        const [product,proErr] = await run(mPro.productByProId(tProID));
        if (proErr)
        {
            return next(proErr);
        }

        //console.log(user);
            //B3.1: check if user have rating move than or equals 8
        if (user.f_rating < 8)
        {
            refuse = true;
            messenge = "Sorry, Your rating is to low to bidded!!";
        }
            //B3.2 : check if user is new account
        else if (user.f_rating == 0)
        {
            success = -1;
        }
            //B3.3: Check if user is exists in refuse list 
        if (refuselist)
        {
            refuse = true;
            messenge = "Sorry, You have been refuse by Seller!!";
        }
            //B3.4: Check if user is seller who post this product
        else if (UserID == product.SellerID)
        {
            refuse = true;
            messenge = "Seller can not bidd their own products";
        }    

        //B4: Check if User have enough condition to bidded
        if (refuse)
        {
            res.render('error/errorPage',{
                layout: false,
                errcode: "Opps",
                errMess: messenge,
                title: "Sorry",
            }); 
        } 

        //B5: Create new order to add to order Detail
        const newOrder = {
            ProID: tProID,
            PriceOrdered: PriceOrder,
            IsSuccess: success,
            SellerID: sellerID,
            BidderID: UserID,
        };

        //B6: add to databse 
        const [newid,addErr] = await run(order.addNewOrder(newOrder));
        if (addErr)
        {
            console.log(addErr);
        }
        else
        {
            console.log(newid);
        }
        console.log(newid);

        //B7: Check if product end_time can be increase
        if(product.AutoIncreaseTime)
        {
            //get end time
            let dateNow = new Date(`${product.end_time}`);
            let minutes = dateNow.getMinutes() + INCRESE;
            let hours = dateNow.getHours();
            if (minutes >= 60)
            {
                minutes = minutes%60;
                hours++;
            }
            //increase end time
            dateNow.setMinutes(minutes);
            dateNow.setHours(hours);

            const newPro = {
                ProID: product.ProID,
                Price: product.Price,
                SellerID: sellerID,
                SubCatID: product.SubCatID,
                Rating: product.Rating,
                CeilPrice: product.CeilPrice,
                IncreasePrice: product.IncreasePrice,
                AutoIncreaseTime: product.AutoIncreaseTime,
                Description: product.Description,
                create_time: product.create_time,
                end_time: dateNow,
            }
            const [newRow,err] = await run(mPro.updateProduct(newPro));
            if (err) {
                console.log(err);
            } else {
                console.log(newRow);
            }
        }

        //B8: redirect to Prrduct view
        return res.redirect('/product/' + tProID);
    }
});

module.exports = router;