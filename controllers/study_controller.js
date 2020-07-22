const express = require('express');
const router = express.Router();
const course_model = require('../models/course_model');
const major_model = require('../models/major_model');
const study_model = require('../models/study_model');
const score_model = require('../models/score_model');
const user_model = require('../models/user_model');
const schoolyear_model = require('../models/schoolyear_model');
const e = require('express');



const extensFunc = require('../utils/extensionFunc'),
    run = extensFunc.errorHandle;

//==========================Course
router.get('/course', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {

        const userID = req.user.id;
        const [user, usererr] = await run(user_model.getByUserID(userID));
        if (usererr) {
            return next(usererr);
        }

        let schoolyear_ = parseInt(req.query.schoolyear) || 0;
        let semester_ = parseInt(req.query.semester) || 0;

        //B1: get all category list
        const [schoolyears, syerr] = await run(schoolyear_model.allSchoolyear());
        if (syerr) {
            return next(syerr);
        }
        let total_schoolyears = [];
        total_schoolyears[0] = {
            id: 0,
            schoolyear: "Tất cả",
        }
        for (i = 16; i <= 19; i++) {
            total_schoolyears[i - 15] = {
                id: i,
                schoolyear: schoolyears[i - 16].name,
            }
        }


        let total_semesters = [];
        total_semesters[0] = {
            id: 0,
            semester: "Tất cả",
        }
        for (i = 1; i <= 3; i++) {
            total_semesters[i] = {
                id: i,
                semester: i,
            }
        }

        let [courses, courseerr] = await run(study_model.getCourseByUserid(userID));
        if (schoolyear_ == 0) {
            [courses, courseerr] = await run(study_model.getCourseByUserid(userID));
            if (courseerr) {
                return next(courseerr);
            }
            semester_ = 0;
        } else {
            if (semester_ == 0) {
                [courses, courseerr] = await run(study_model.getCourseByUseridSchoolyear(userID, schoolyear_));
                if (courseerr) {
                    return next(courseerr);
                }
            } else {
                [courses, courseerr] = await run(study_model.getCourseByUseridSemesterSchoolyear(userID, semester_, schoolyear_));
                if (courseerr) {
                    return next(courseerr);
                }
            }
        }
        var dtb = 0;
        var courses_dtb = 0;
        var courses_credit = 0;
        var qualify_count = 0;
        var scores, score_err;
        for (i = 0; i < courses.length; i++) {
            [scores, score_err] = await run(score_model.getScoreByStudyId(courses[i].studyid));
            if (score_err) {
                return next(score_err);
            }
            dtb = 0;
            if (scores) {
                for (j = 0; j < scores.length; j++) {
                    dtb = dtb + scores[j].score_num * scores[j].percent / 100;
                }
            }
            courses_dtb = courses_dtb + dtb * courses[i].credit;
            courses_credit = courses_credit + courses[i].credit;
            dtb = Math.round(dtb * 1000) / 1000;
            var qualify_txt = "";
            if (courses[i].qualify == 0) {
                qualify_txt = "---";
            } else if (courses[i].qualify == 1) {
                qualify_txt = "Đạt";
                qualify_count++;
            } else if (courses[i].qualify == -1) {
                qualify_txt = "Rớt";
            }
            courses[i] = {
                id: courses[i].id,
                name: courses[i].name,
                major: courses[i].major,
                credit: courses[i].credit,
                qualify: qualify_txt,
                majorname: courses[i].majorname,
                studyid: courses[i].studyid,
                dtb: dtb,
            }
        }
        courses_dtb = courses_dtb / courses_credit;
        courses_dtb = Math.round(courses_dtb * 1000) / 1000;
        let course_count = courses.length;
        //B2: render to web
        res.render('./layouts/study/course', {
            title: 'Study-Course',
            layout: './study/course',
            courses,
            total_schoolyears,
            total_semesters,
            schoolyear_,
            semester_,
            courses_dtb,
            courses_credit,
            course_count,
            qualify_count,
        });
    }
});

router.get('/add', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        const userID = req.user.id;
        const [user, usererr] = await run(user_model.getByUserID(userID));
        if (usererr) {
            return next(usererr);
        }

        //B1: get all category list
        const [schoolyears, syerr] = await run(schoolyear_model.allSchoolyear());
        if (syerr) {
            return next(syerr);
        }
        let total_schoolyears = [];
        for (i = 16; i <= 19; i++) {
            total_schoolyears[i - 16] = {
                id: i,
                schoolyear: schoolyears[i - 16].name,
            }
        }
        let total_semesters = [];
        for (i = 1; i <= 3; i++) {
            total_semesters[i - 1] = {
                id: i,
                semester: i,
            }
        }

        const [courses_rot, course_rot_err] = await run(study_model.getCourseByUseridQualify(userID, -1));
        if (course_rot_err) {
            return next(course_rot_err);
        }
        const [courses_chuahoc, course_chuahoc_err] = await run(study_model.getCourseByUseridNotIn(userID));
        if (course_chuahoc_err) {
            return next(course_chuahoc_err);
        }
        const [all_majors, merr] = await run(major_model.allMajor());
        if (merr) {
            return next(merr);
        }
        var total_cous = [];
        var courses_of_major, comerr;
        for (i = 0; i < all_majors.length; i++) {
            let [courses_of_major, comerr] = await run(major_model.getCourseByMajorID(all_majors[i].id));
            if (comerr) {
                return next(mecomerrrr);
            }
            let cous = [];
            if (!courses_of_major) {
                all_majors[i] = {
                    id: all_majors[i].id,
                    name: all_majors[i].name,
                    courses: null,
                }
            } else {
                for (j = 0; j < courses_of_major.length; j++) {
                    cous[j] = {
                        course_id: courses_of_major[j].id,
                        course_name: courses_of_major[j].name,
                        course_credit: courses_of_major[j].credit,
                    }
                }
                total_cous[i] = cous;
                all_majors[i] = {
                    id: all_majors[i].id,
                    name: all_majors[i].name,
                    courses: cous,
                }
            }
        }
        console.log(courses_chuahoc);

        //B2: render to web
        res.render('./layouts/study/add', {
            title: 'Study-Add',
            layout: './study/add',
            total_schoolyears,
            total_semesters,
            all_majors,
            total_cous,
            courses_rot,
            courses_chuahoc,
        });
    }
});

router.post('/add', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        const userID = req.user.id;
        const [user, usererr] = await run(user_model.getByUserID(userID));
        if (usererr) {
            return next(usererr);
        }
        //B1: get new category name from form
        const courseID = req.body.courseid;
        const semesterID = req.body.semesterid;
        const schoolyearID = req.body.schoolyearid;
        //B2: get list category

        //B3 : Check if catname is exists in in list category

        //B4: create new entity to add to database 
        const newStudy = {
            user: userID,
            course: courseID,
            semester: semesterID,
            schoolyear: schoolyearID,
            qualify: 0,
        };

        const [newRow, addErr] = await run(study_model.addNewStudy(newStudy));
        if (addErr) {
            console.log(addErr);
        } else {
            console.log(newRow);
        }

        //B5: redirect 
        res.redirect('/study/course');
    }
});






















router.post('/course/edit', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        const userID = req.user.id;
        const [user, usererr] = await run(user_model.getByUserID(userID));
        if (usererr) {
            return next(usererr);
        }

        let schoolyear_ = parseInt(req.query.schoolyear) || 0;
        let semester_ = parseInt(req.query.semester) || 0;
        console.log(schoolyear_);
        console.log(semester_);

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