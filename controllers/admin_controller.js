const express = require('express');
const router = express.Router();
const category = require('../models/category_model');
const account = require('../models/user_model');
const promotion = require('../models/promote_model');
const product = require('../models/product_model');

const major_model = require('../models/major_model');
const e = require('express');

const extensFunc = require('../utils/extensionFunc'),
    run = extensFunc.errorHandle;

//list category
router.get('/course', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else if (req.user.permission != 1) {
        console.log("fail");
        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        });
    } else {
        //B1: get all category list
        const [categories, err] = await run(category.allCategories());
        if (err) {
            return next(err);
        }
        emptyList = false;
        if (!categories) {
            let messenge = "Không có category nào";
            console.log(messenge);
            emptyList = true;
        }
        //B2: render to web
        res.render('./layouts/admin/course', {
            title: 'Admin-Course',
            layout: './admin/course',
            categories,
            emptyList,
        });
    }
});

router.get('/major', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else if (req.user.permission != 1) {
        console.log("fail");
        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        });
    } else {
        //B1: get all category list
        const [majors, err] = await run(major_model.allMajor());
        if (err) {
            return next(err);
        }
        //B2: render to web
        res.render('./layouts/admin/major', {
            title: 'Admin-major',
            layout: './admin/major',
            majors,
        });
    }
});

//============================edit
router.post('/course/edit', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else if (req.user.f_permission != 1) {
        console.log("fail");
        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        });
    } else {
        //B1: get data from form 
        const catID = parseInt(req.body.catid);
        console.log(req.body.catid);
        //B2:Create new entity by catID

        const newCate = {
            CategoryID: catID,
            CatName: req.body.categoryname,
        }

        console.log(newCate);
        //B3: update new Category Name 
        const [newRow, upErr] = await run(major_model.updateNewCateName(newCate));

        console.log(newRow);


        //B4: redirect 
        return res.redirect('/admin/course');
    }
});

router.post('/major/edit', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else if (req.user.permission != 1) {
        console.log("fail");
        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        });
    } else {
        //B1: get data from form 
        const majorID = parseInt(req.body.majorid);
        console.log(req.body.id);
        //B2:Create new entity by majorID

        const newMajor = {
            id: majorID,
            name: req.body.majorname,
        }

        console.log(newMajor);
        //B3: update new Category Name 
        const [newRow, upErr] = await run(major_model.updateNewMajorName(newMajor));

        console.log(newRow);


        //B4: redirect 
        return res.redirect('/admin/major');
    }
});

//=============================== delete 
router.post('/course/delete', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else if (req.user.f_permission != 1) {
        console.log("fail");
        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        });
    } else {
        //B1: get data from form 
        const catID = parseInt(req.body.catid);

        //B2: check if category emty
        const [subCat, err] = await run(category.getSubCategoryByCategoryID(catID));
        if (err) {
            return next(err);
        }
        if (!subCat) {
            const [id, delErr] = await run(category.delCategory(catID));
            // if (delErr)
            // {
            //     console.log("err");
            // }
            // else
            // {
            console.log(id);
            //}
        }
        //Category have sub categyry can not delete
        console.log("Category have sub categyry can not delete ");
        //B : redirect
        return res.redirect('/admin/course');
    }
});

router.post('/major/delete', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else if (req.user.permission != 1) {
        console.log("fail");
        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        });
    } else {
        //B1: get data from form 
        const majorID = parseInt(req.body.majorid);

        //B2: check if category emty
        const [course, err] = await run(major_model.getCourseByMajorID(majorID));
        console.log(majorID);
        console.log(course);

        if (err) {
            return next(err);
        }
        if (!course) {
            const [id, delErr] = await run(major_model.delMajor(majorID));
            // if (delErr)
            // {
            //     console.log("err");
            // }
            // else
            // {
            console.log(id);
            //}
        } else {
            //Category have sub categyry can not delete
            console.log("Major have course can not delete ");
            this.alert("Major have course can not delete ");
        }
        //B : redirect
        return res.redirect('/admin/major');
    }
});


// Add
router.post('/course/add', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else if (req.user.f_permission != 1) {
        console.log("fail");
        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        });
    } else {
        //B1: get new category name from form
        const catName = req.body.categoryname;

        console.log(catName);
        //B2: get list category
        const [categories, err] = await run(category.allCategories());
        if (err) {
            return next(err);
        }

        //B3 : Check if catname is exists in in list category
        let isExists = false;
        for (eachCat of categories) {
            if (catName === eachCat.CatName) {
                isExists = true;
                break;
            }
        }

        //B4: create new entity to add to database 
        if (!isExists) {
            const newCate = {
                CatName: catName,
            };

            const [newRow, addErr] = await run(category.addNewCategory(newCate));
            if (addErr) {
                console.log(err);
            } else {
                console.log(newRow);
            }
        }

        //B5: redirect 
        res.redirect('/admin/course');
    }
});

router.post('/major/add', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else if (req.user.permission != 1) {
        console.log("fail");
        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        });
    } else {
        //B1: get new category name from form
        const majorName = req.body.majorname;

        console.log(majorName);
        //B2: get list category
        const [majors, err] = await run(major_model.allMajor());
        if (err) {
            return next(err);
        }

        //B3 : Check if catname is exists in in list category
        let isExists = false;
        for (eachMajor of majors) {
            if (majorName === eachMajor.MajorName) {
                isExists = true;
                break;
            }
        }

        //B4: create new entity to add to database 
        if (!isExists) {
            const newMajorr = {
                name: majorName,
            };

            const [newRow, addErr] = await run(major_model.addNewMajor(newMajorr));
            if (addErr) {
                console.log(err);
            } else {
                console.log(newRow);
            }
        }

        //B5: redirect 
        res.redirect('/admin/major');
    }
});

//list sub-category
router.get('/subcat', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else if (req.user.f_permission != 1) {
        console.log("fail");
        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        });
    } else {

        const [subcategories, err] = await run(category.allSubCategories());
        if (err) {
            return next(err);
        }
        //B2: render to web
        emptyList = false;
        if (!subcategories) {
            let messenge = "Không có subcategory nào";
            console.log(messenge);
            emptyList = true;
        } else {
            //console.log(subcategories);
        }
        //B2: render to web
        res.render('./layouts/admin/subcat', {
            title: 'Admin-Subategory',
            layout: './admin/subcat',
            subcategories,
            emptyList,
        });

    }
});

//============================edit sub catategory
router.post('/subcat/edit', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else if (req.user.f_permission != 1) {
        console.log("fail");
        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        });
    } else {
        //B1: get data from form 
        const catID = parseInt(req.body.catid);
        const subCatID = parseInt(req.body.subcatid);

        //B2:Create new entity by catID

        const newCate = {
            SubCatID: subCatID,
            SubCateName: req.body.subcategoryname,
            categoryID: catID,
        }

        console.log(newCate);
        //B3: update new Category Name 
        const [newRow, upErr] = await run(category.updateNewSubCateName(newCate));
        if (upErr) {
            console.log(upErr);

        } else {
            console.log(newRow);
        }

        //B4: redirect 
        return res.redirect('/admin/subcat');
    }
});

//=============================== delete category
router.post('/subcat/delete', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else if (req.user.f_permission != 1) {
        console.log("fail");
        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        });
    } else {
        //B1: get data from form 
        const catID = parseInt(req.body.catid);
        const subCatID = parseInt(req.body.subcatid);
        console.log(subCatID);
        //B2: check if category emty
        const [subCat, err] = await run(product.productBySubCatID(5, subCatID));
        if (err) {
            return next(err);
        }
        if (!subCat) {
            //B3: delete
            const [id, delErr] = await run(category.delSubCategory(subCatID));
            if (delErr) {
                console.log(delErr);
            } else {
                console.log(id);
            }
        } else {
            //Category have sub categyry can not delete
            console.log("Sub categyry has product so t could not deleted ");
        }
        //B : redirect
        return res.redirect('/admin/subcat');
    }
});

router.post('/subcat/add', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else if (req.user.f_permission != 1) {
        console.log("fail");
        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        });
    } else {
        //B1: get new category name from form
        const subcatName = req.body.subcategoryname;
        const categoryid = req.body.categoryid;

        //B2: get list category
        const [subcategories, err] = await run(category.allSubCategories());
        if (err) {
            return next(err);
        }
        //B3 : Check if subcatname is exists in in list category
        let subid = 0;
        let isExists = false;
        for (eachCat of subcategories) {
            if (subcatName === eachCat.SubCateName) {
                isExists = true;
                break;
            }

            //B4: Create new SubCatID 
            if (eachCat.categoryID == categoryid) {
                subid = eachCat.SubCatID;
            }
        }

        subid++;
        console.log(subid);
        //B5: create new entity to add to database 
        if (!isExists) {
            const newCate = {
                SubCatID: subid,
                SubCateName: subcatName,
                categoryID: categoryid,
            };

            const [newRow, addErr] = await run(category.addNewSubCategory(newCate));
            if (addErr) {
                console.log(err);
            } else {
                console.log(newRow);
            }
        }

        //B5: redirect 
        res.redirect('/admin/subcat');
    }
});

//list of user
router.get('/list-user', async (req, res, next) => {
    if (!req.user) {

        return res.redirect('/user/signin');
    } else if (req.user.f_permission != 1) {

        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        });
    } else {
        //get list of user 
        const [listOfUser, err] = await run(account.getlistAccount());
        if (err) {
            return next(err);
        }
        emptyList = false;
        if (!listOfUser) {
            let messenge = "Không có subcategory nào";
            console.log(messenge);
            emptyList = true;
        } else {
            console.log(listOfUser);
        }
        //B2: render to web
        res.render('./layouts/admin/list-user', {
            title: 'Admin-Account',
            layout: './admin/list-user',
            listOfUser,
            emptyList,
        });
    }
});

//list of bidded want to promote
router.get('/promotion-list', async (req, res, next) => {
    if (!req.user) {

        return res.redirect('/user/signin');
    } else if (req.user.f_permission != 1) {

        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        });
    } else {
        //get list of Bidder who want to promotion
        //B1: get all category list
        let isEmpty = false;
        const [listofUser, err] = await run(promotion.getPromoteList());
        if (err) {
            return next(err);
        }
        let listOfProm = [];
        //B2: check if list is emty
        if (!listofUser) {
            let messenge = "There is no bidder want to promotion";
            console.log(messenge);
            isEmpty = true;
        } else {
            //B3: if time is more than 7 day Delete it else return it 
            for (eachUser of listofUser) {
                const timeremain = Date.now() - eachUser.Time.getTime();
                if (timeremain < 7 * 24 * 60 * 60 * 1000) {
                    listOfProm.push(eachUser);
                } else {
                    //b4: if expired (more than 7 days)
                    const promoteID = eachUser.promoteID;
                    const [id, err] = await run(promotion.deletePromoteRequest(promoteID));
                    if (err) {
                        return next(err);
                    }
                    console.log(id);
                }
            }
            console.log(listOfProm);
        }
        res.render('./layouts/admin/promotion-list', {
            title: 'Admin-Promotion',
            layout: './admin/promotion-list',
            listOfProm,
            isEmpty,
        });
    }
});

router.post('/down-level', async (req, res, next) => {
    let userid = parseInt(req.body.userID_);
    const [rows, err] = await run(account.downpermission(userid));
    if (err) {
        return next(err);
    }
    return res.redirect('/admin/list-user')
})

router.post('/up-level/accept', async (req, res, next) => {
    let PromoteID_ = parseInt(req.body.PromoteID_);
    let userid = parseInt(req.body.UserID_);

    const [rows, err] = await run(account.uppermission(userid));
    if (err) {
        console.log("ok1")
        console.log(err)
    }

    const [rows1, errr] = await run(promotion.deletePromoteRequest(PromoteID_))
    if (errr) {
        console.log("ok2")
        console.log(errr)
    }
    console.log("ok")
    return res.redirect('/admin/promotion-list')
});

router.post('/up-level/denied', async (req, res, next) => {
    let PromoteID_ = parseInt(req.body.PromoteID_);
    const [rows1, errr] = await run(promotion.deletePromoteRequest(PromoteID_))

});

module.exports = router;