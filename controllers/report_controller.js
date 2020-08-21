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


router.get('/:majorid/major', async (req, res, next) => {
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
        const majorID = parseInt(req.params.majorid);
        //B1: get all category list
        const [courses, err] = await run(major_model.getCourseByMajorID(majorID));
        if (err) {
            return next(err);
        }
        let [major_info, merr] = await run(major_model.getMajorByMajorID(majorID));
        if (merr) {
            return next(merr);
        }
        const [count_course, cerr] = await run(course_model.getCountCourseByMajorId(majorID));
        if (cerr) {
            return next(cerr);
        }
        const [count_user, ccerr] = await run(user_model.getUserCountByMajorId(majorID));
        if (ccerr) {
            return next(ccerr);
        }
        const [list_user, lerr] = await run(user_model.getUserByMajorId(majorID));
        if (lerr) {
            return next(ccerr);
        }
        let major = [];
        major[0] = {
            id: major_info.id,
            name: major_info.name,
            count_course: count_course.count,
            count_user: count_user.count,
        }
        console.log(major);
        //B2: render to web
        res.render('./layouts/report/major', {
            title: 'Report-Major',
            layout: './report/major',
            courses,
            major,
            list_user,
        });
    }
});

router.get('/:courseid/course', async (req, res, next) => {
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
        const courseID = parseInt(req.params.courseid);
        //B1: get all category list
        const [course_info, merr] = await run(course_model.getCourseByCourseID(courseID));
        if (merr) {
            return next(merr);
        }
        const [major_info, maerr] = await run(course_model.getMajorByCourseID(courseID));
        if (maerr) {
            return next(maerr);
        }
        const [count_user, ccerr] = await run(study_model.getCountUserByCourseid(courseID));
        if (ccerr) {
            return next(ccerr);
        }
        let course = [];
        course[0] = {
            id: course_info.id,
            name: course_info.name,
            major: course_info.major,
            credit: course_info.credit,
            majorname: major_info.majorname,
            count_user: count_user.count,
        }
        console.log(course);
        const [list_user, lerr] = await run(study_model.getUsesInfoByCourseid(courseID));
        if (lerr) {
            return next(ccerr);
        }
        
        //B2: render to web
        res.render('./layouts/report/course', {
            title: 'Report-Course',
            layout: './report/course',
            course,
            list_user,
        });
    }
});

module.exports = router;