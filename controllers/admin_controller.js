const express = require('express');
const router = express.Router();
const category = require('../models/category_model');
const account = require('../models/user_model');
const promotion = require('../models/promote_model');
const product = require('../models/product_model');

const course_model = require('../models/course_model');
const major_model = require('../models/major_model');
const study_model = require('../models/study_model');
const e = require('express');
const user_model = require('../models/user_model');

const extensFunc = require('../utils/extensionFunc'),
    run = extensFunc.errorHandle;

//==========================Course
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
        const [courses, err] = await run(course_model.allCourse());
        if (err) {
            return next(err);
        }
        const [majors, merr] = await run(major_model.allMajor());
        if (merr) {
            return next(merr);
        }
        //B2: render to web
        res.render('./layouts/admin/course', {
            title: 'Admin-Course',
            layout: './admin/course',
            courses,
            majors,
        });
    }
});
router.post('/course/edit', async (req, res, next) => {
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
        const cousreID = parseInt(req.body.courseid);
        console.log(req.body.courseid);
        //B2:Create new entity by majorID

        const newCourse = {
            id: cousreID,
            major: req.body.majorid,
            name: req.body.coursename,
            credit: req.body.credit,
        }
        console.log(newCourse);
        //B3: update new Category Name 
        const [newRow, upErr] = await run(course_model.updateNewCourseName(newCourse));

        console.log(newRow);


        //B4: redirect 
        return res.redirect('/admin/course');
    }
});

router.post('/course/delete', async (req, res, next) => {
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
        const courseID = parseInt(req.body.courseid);

        //B2: check if category emty
        const [users, err] = await run(study_model.getAllUserByCourseId(courseID));
        console.log(users);

        if (err) {
            return next(err);
        }
        if (!users) {
            const [id, delErr] = await run(course_model.delCourse(courseID));
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
            console.log("Course have user can not delete ");
        }
        //B : redirect
        return res.redirect('/admin/course');
    }
});

router.post('/course/add', async (req, res, next) => {
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
        const courseName = req.body.coursename;

        console.log(courseName);
        //B2: get list category
        const [courses, err] = await run(course_model.allCourse());
        if (err) {
            return next(err);
        }

        //B3 : Check if catname is exists in in list category
        let isExists = false;
        for (eachCourse of courses) {
            if (courseName === eachCourse.name) {
                isExists = true;
                break;
            }
        }

        //B4: create new entity to add to database 
        if (!isExists) {
            const newCoursee = {
                name: courseName,
                major: req.body.majorid,
                credit: req.body.credit,
            };

            const [newRow, addErr] = await run(course_model.addNewCourse(newCoursee));
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

//=========================Major
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
            title: 'Admin-Major',
            layout: './admin/major',
            majors,
        });
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
        }
        //B : redirect
        return res.redirect('/admin/major');
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
            if (majorName === eachMajor.name) {
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

//==========================User
router.get('/list-user', async (req, res, next) => {
    if (!req.user) {

        return res.redirect('/user/signin');
    } else if (req.user.permission != 1) {

        return res.render('error/errorPage', {
            layout: false,
            errcode: 'Opps!!',
            errMess: `sorry. You don't have permission to use this feture`,
            title: 'Sorry',
        });
    } else {
        //get list of user 
        const [listOfUser, err] = await run(user_model.getlistAccount());
        if (err) {
            return next(err);
        }
        if (!listOfUser) {
            let messenge = "Không có User nào";
            console.log(messenge);
            return res.render('error/errorPage', {
                layout: false,
                errcode: 'Opps!!',
                errMess: messenge,
                title: 'Sorry',
            });
        } else {
            console.log(listOfUser);
        }
        //B2: render to web
        res.render('./layouts/admin/list-user', {
            title: 'Admin-Account',
            layout: './admin/list-user',
            listOfUser,
        });
    }
});

router.post('/down-level', async (req, res, next) => {
    let userid = parseInt(req.body.userID_);
    const [rows, err] = await run(user_model.downpermission(userid));
    if (err) {
        return next(err);
    }
    return res.redirect('/admin/list-user')
});

router.post('/up-level', async (req, res, next) => {
    let userid = parseInt(req.body.userID_);
    const [rows, err] = await run(user_model.uppermission(userid));
    if (err) {
        return next(err);
    }
    return res.redirect('/admin/list-user')
});

module.exports = router;