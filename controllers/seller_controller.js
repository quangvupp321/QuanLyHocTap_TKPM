const express = require('express');
const router = express.Router();
const mCat = require('../models/category_model');
const mProduct = require('../models/product_model');
const order = require('../models/order_model');
const refuse = require('../models/refuse_model');

const extensFunc = require('../utils/extensionFunc'),
    run = extensFunc.errorHandle;
//list product has been posted by seller
router.get('/products-owned', async (req, res, next) => {
    //B1: Check permission of account
    //console.log(req.user);
    if (!req.user) {
        return res.redirect('/user/signin');
    }
    //if you is not a seller or admin you can't user this function
    else if (req.user.f_permission == 0) {
        //console.log("fail");
        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Ops!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        })
    }

    //B2: get user ID (had been saved) from req in session
    const userID = req.user.f_userID;

    //B3: get list of prduct has been posted by this user
    let [listOfPro, err] = await run(mProduct.getListProductOwned(userID));
    if (err) {
        return next(err);
    }


    //B4: Check if seller or admin have posted some products
    emptyList = false;
    if (!listOfPro) {
        let messenge = "Không có sản phẩm nào";
        console.log(messenge);
        emptyList = true;
    } else {
        for (i=0;i<listOfPro.length;i++) {
            listOfPro[i].end_time = listOfPro[i].end_time.toLocaleDateString();

            let topBidder = await order.getTopBidderByProID(listOfPro[i].ProID);
            listOfPro[i] = {
                ProID: listOfPro[i].ProID,
                Rating: listOfPro[i].Rating,
                ProName: listOfPro[i].ProName,
                OrderID: listOfPro[i].OrderID,
                price: listOfPro[i].price,
                end_time: listOfPro[i].end_time,
                topBidder,
            }
        }
    }

    let [proWon, error] = await run(mProduct.getListProductOwnedAndBidded(userID));

    //B2: check if user has some interested-products
    if (error) {
        return next(error);
    }
    emptyList_Bidded = false;
   let productWon = [];
    if (!proWon) {
        //reder layout 
        emptyList_Bidded = true;
    } else {
        for (eachPro of proWon) {
            eachPro.end_time = eachPro.end_time.toLocaleDateString();
            let [topBidder,topErr] = await run(order.getTopBidderByProID(eachPro.ProID));
            if (topErr) {
                return topErr;
            } else {
                eachPro.topBidder = topBidder;
                emptyList_Bidded = false;
                productWon.push(eachPro);
            }
        }
    }


    //Thêm phần productBidding ở đây
    let productBidding = [];
    let emptyList_Bidding = true;
    for (eachPro of listOfPro)
    {
        let dateEnd = new Date(eachPro.end_time);
        let timeRemain = dateEnd.getTime() - Date.now();
        //console.log(timeRemain);
        if (timeRemain > 0)
        {
            let [topBidder,topErr] = await run(order.getTopBidderByProID(eachPro.ProID));
            if (topErr)
            {
                return nextErr;
            }
            eachPro.topBidder = topBidder;
            emptyList_Bidding = false;
            productBidding.push(eachPro);
        }
    }

    res.render('./layouts/seller/products-owned', {
        title: 'My Products',
        layout: './seller/products-owned',
        emptyList,
        emptyList_Bidding,
        emptyList_Bidded,
        listOfPro,
        productBidding,
        productWon,
    });
});

router.get('/add-descript/:id', async (req, res, next) => {
    //B1: Check permission of account
    if (!req.user) {
        return res.redirect('/user/signin');
    }
    //if you is not a seller or admin you can't user this function
    else if (req.user.f_permission == 0) {
        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        })
    }

    //B2: get user ID (had been saved) from req in session
    const userID = req.user.f_userID;

    //B3: get list of prduct has been posted by this user
    const [listOfPro, err] = await run(mProduct.getListProductOwned(userID));
    if (err) {
        return next(err);
    }
    //B4: Check if seller or admin have posted some products
    let emptyList = false;
    let product = null;
    if (!listOfPro) {
        let messenge = "Bạn chưa đăng bất kỳ sảm phẩm nào";
        emptyList = true;
        // render layout with messenge
    } else {
        const id = parseInt(req.params.id);
        console.log(id);
        let isYourProduct = false;
        for (eachPro of listOfPro) {
            eachPro.end_time = eachPro.end_time.toLocaleDateString();
            if (eachPro.ProID == id) {
                product = await mProduct.productByProId(id);
                product.create_time = product.create_time.toLocaleDateString();
                product.end_time = product.end_time.toLocaleDateString();
                isYourProduct = true;
            }
        }
        if (!isYourProduct) {
            console.log("This is not your product");
            return res.render('error/errorPage', {
                layout: false,
                errcode: 'Opps!!',
                errMess: `sorry. You don't have permission to edit this product`,
                title: 'Sorry',
            })
        }
    }
    res.render('./layouts/seller/add-descript', {
        title: 'My Products',
        layout: './seller/add-descript',
        emptyList,
        product,
    });
});

router.get('/post-product', async (req, res, next) => {
    //B1: Check permission of account
    console.log(req.user);
    if (!req.user) {
        return res.redirect('/user/signin');
    }
    //if you is not a seller or admin you can't user this function
    else if (req.user.f_permission == 0) {
        console.log("fail");
        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Ops!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        })
    }

    //B2: get user ID (had been saved) from req in session
    const userID = req.user.f_userID;

    //B3: get list of prduct has been posted by this user
    const [listOfPro, err] = await run(mProduct.getListProductOwned(userID));
    if (err) {
        return next(err);
    }
    //B4: Check if seller or admin have posted some products
    if (!listOfPro) {
        let messenge = "Bạn chưa đăng bất kỳ sảm phẩm nào";
        console.log(messenge);
        // render layout with messenge
    } else {
        for (eachPro of listOfPro) {
            eachPro.end_time = eachPro.end_time.toLocaleDateString();
        }
        //console.log(listOfPro);
    }

    let total_date = [];
    for (i = 1; i <= 31; i++) {
        total_date[i - 1] = {
            date: i,
        }
    }
    let total_month = [];
    for (i = 1; i <= 12; i++) {
        total_month[i - 1] = {
            month: i,
        }
    }
    let total_year = [];
    for (i = 1950; i <= 2020; i++) {
        total_year[i - 1950] = {
            year: i,
        }
    }
    let total_hour = [];
    for (i = 0; i <= 23; i++) {
        total_hour[i] = {
            hour: i,
        }
    }
    let total_minute = [];
    for (i = 0; i <= 59; i++) {
        total_minute[i] = {
            minute: i,
        }
    }
    const total_day = {
        total_date,
        total_month,
        total_year,
        total_hour,
        total_minute,
    }
    const allSubCate = await mCat.allSubCategories();

    res.render('./layouts/seller/post-product', {
        title: 'New product',
        layout: './seller/post-product',
        total_day,
        allSubCate,
    });
});
router.post('/add-descript/update', async (req, res, next)=>
{
        let id = parseInt(req.body.ProID_);
        let string = req.body.description;

        const [row1,err1] = await run(order.updatederip(id,string));
        if(err1)
        {
            console.log(err1)
        }
        const [row2,err2] = await run(mProduct.updateProduct_derip(id,string));
        if(err2)
        {
            console.log(err2)
        }

        return res.redirect('/seller/products-owned')

});

router.post('/delete',async (req, res, next)=>{

    let id = parseInt(req.body.ProID_);
    
}),



router.post('/post-product', async (req,res,next) =>{
    //console.log(req.body);

    //B1: get data from form 
    const subcategory = req.body.subcategory;
    const proName = req.body.ProName;
    const price = parseInt(req.body.price);
    const endTime = `${req.body.end_time.year}-${req.body.end_time.month}-${req.body.end_time.day} ${req.body.end_time.hours}:${req.body.end_time.minutes}:00`;
    const decript = req.body.area2;
    const ceilPrice = parseInt(req.body.ceilprice);
    const increasePrice = parseInt(req.body.increaseprice);
    const isAuto = req.body.is_auto_increase;
   
    //B2: check auto increase time 
    let isIncrease = false;
    if (isAuto === "checked")
    {
        isIncrease = true;
    }

    //B3: Get SubCatID of sub category name 
    const [subCategory, err] = await run(mCat.allSubCategories());
    if (err)
    {
        return next(err);
    }
    let subCatid = 0;

    for (eachSubcat of subCategory)
    {
        if (eachSubcat.SubCateName === subcategory)
        {
            subCatid = eachSubcat.SubCatID;
        }
    }
    //B4: Create entity to add to new product 
    const newProduct = {
        ProName: proName,
        Price: price,
        SellerID: req.user.f_userID,
        SubCatID: subCatid,
        Rating: 10,
        CeilPrice: ceilPrice,
        IncreasePrice: increasePrice,
        AutoIncreaseTime: isIncrease,
        Description: decript,
        create_time: new Date(),
        end_time: new Date(endTime),
    };
    
    console.log(newProduct);
    //B5: add new Product in database 
    const [id,addErr] = await run(mProduct.addNewProduct(newProduct));
    if (addErr)
    {
        return next(addErr);
    }
    else 
    {
        console.log("new product add: " + id);
    }
    //B6: Redirect 
    return res.redirect('/seller/products-owned');
});

router.post('/refuse', async (req,res,next) =>{

    //B1: get data fom hidden form 
    const orderID = req.body.orderid;

    console.log(`${orderID}: ${req.body.proid}: ${req.body.bidderid}`);

    //B2: create new entity
    const newRefuse ={
        ProID: req.body.proid,
        BidderID: req.body.bidderid,
        OrderID: orderID,
    };

    //B3: add to refuse list 
    console.log(newRefuse);
    const [newid,addErr] = await run(refuse.addNewUSerToRefuseList(newRefuse));
    if (addErr) {
        console.log(addErr);
    } else {
        console.log(newid);
    }

    //B4: delete order detail of refuse user
    const [id,delErr] = await run(order.delOrder(orderID));
    if (delErr) {
        console.log(delErr);
        //return next(delErr);
    } else {
        console.log(id);
    }

    //B5: redirect
    res.redirect('/seller/products-owned');
});

router.post('/refuse-winner',async (req,res,next) =>{
      //B1: get data fom hidden form 
        const orderID = req.body.orderid;
        const proID = req.body.proid;
      console.log(`${orderID}: ${req.body.proid}: ${req.body.bidderid}`);
  
      //B2: create new entity
      const newRefuse = {
          ProID: proID,
          BidderID: req.body.bidderid,
          OrderID: orderID,
      };
  
      //B3: add to refuse list 
      console.log(newRefuse);
      const [newid,addErr] = await run(refuse.addNewUSerToRefuseList(newRefuse));
      if (addErr) {
          console.log(addErr);
      } else {
          console.log(newid);
      }
  
      //B4: delete order detail of refuse user
      const [id,delErr] = await run(order.delOrder(orderID));
      if (delErr) {
          console.log(delErr);
          //return next(delErr);
      } else {
          console.log(id);
      }
      
      //B5: set wimming for the second person 
      let [topbidder,biddErr] = await run(order.getOrderByProID(proID));
      if (biddErr) {
          return next(biddErr);
      } 

      //B6: set winning condition
    const updateOrder = {
        OrderID: topbidder.OrderID,
        ProID: topbidder.ProID,
        PriceOrdered: topbidder.PriceOrdered,
        OrderDate: topbidder.OrderDate,
        IsSuccess: 1,
        SellerID: topbidder.SellerID,
        BidderID: topbidder.BidderID,
    }
    console.table(updateOrder);

    const [newId,newErr] = await run(order.updateOrder(updateOrder));
    if (newErr)
    {
        console.log(newErr);
    }
    else
    {
        console.log(newId);
    }
      //B: redirect
      res.redirect('/seller/products-owned');
});


module.exports = router;