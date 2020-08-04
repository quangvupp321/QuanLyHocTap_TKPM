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
        var course_count = 0;
        var qualify_credit = 0;
        if (courses) {
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
                if (courses[i].qualify == 1) {
                    courses_dtb = courses_dtb + dtb * courses[i].credit;
                    qualify_credit = qualify_credit + courses[i].credit;
                }
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
            courses_dtb = courses_dtb / qualify_credit;
            courses_dtb = Math.round(courses_dtb * 1000) / 1000;
            course_count = courses.length;
        }
        //B2: render to web
        res.render('./layouts/score/course', {
            title: 'Score-Course',
            layout: './score/course',
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

router.get('/:studyid', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        const userID = req.user.id;
        const [user, usererr] = await run(user_model.getByUserID(userID));
        if (usererr) {
            return next(usererr);
        }

        const studyID = parseInt(req.params.studyid);

        const [checkStudy, cstuerr] = await run(study_model.checkStudyByStudyIdUserId(studyID, userID));
        if (cstuerr) {
            return next(cstuerr);
        }

        if (!checkStudy) {
            let messenge = "Môn học không thuộc user này";
            console.log(messenge);
            return res.redirect('/score/course');
        }

        const [course_info, couerr] = await run(study_model.getCourseStudyMajorByStudyId(studyID));
        if (couerr) {
            return next(couerr);
        }
        console.log(course_info);

        const [scores, scoerr] = await run(score_model.getScoreByStudyId(studyID));
        if (scoerr) {
            return next(scoerr);
        }
        console.log(scores);

        const [count_study, counterr] = await run(study_model.getCountStudyByCourseIdUserId(course_info[0].courseid, userID));
        if (counterr) {
            return next(counterr);
        }
        const count = count_study[0].count;
        console.log(count);

        //B2: render to web
        res.render('./layouts/score/detail', {
            title: 'Score-Detail',
            layout: './score/detail',
            studyID,
            course_info,
            scores,
            count,
        });
    }
});

router.post('/add', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        const studyId = req.body.studyid;
        const scoreName = req.body.scorename;
        const scorePercent = req.body.scorepercent;
        const scoreNum = req.body.scorenum;

        //B3 : Check if catname is exists in in list category
        const newScore = {
            study: studyId,
            name: scoreName,
            percent: scorePercent,
            score_num: scoreNum,
        };

        const [newRow, addErr] = await run(score_model.addNewScore(newScore));
        if (addErr) {
            console.log(addErr);
        } else {
            console.log(newRow);
        }

        //B5: redirect 
        let redirect_link = '/score/' + studyId;
        res.redirect(redirect_link);
    }
});


router.post('/delete', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        //B1: get data from form 
        const scoreId = parseInt(req.body.scoreid);
        const studyId = parseInt(req.body.studyid);

        //B2: check if category emty
        const [id, delErr] = await run(score_model.delScore(scoreId));
        // if (delErr)
        // {
        //     console.log("err");
        // }
        // else
        // {
        console.log(id);
        //}
        //B : redirect
        let redirect_link = '/score/' + studyId;
        res.redirect(redirect_link);
    }
});
router.post('/edit', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        const studyId = parseInt(req.body.studyid);
        const scoreId = parseInt(req.body.scoreid);
        const newScore = {
            id: scoreId,
            study: studyId,
            name: req.body.scorename,
            score_num: parseInt(req.body.scorenum),
            percent: parseInt(req.body.scorepercent),
        };
        //B3: update new Category Name 
        const [newRow, upErr] = await run(score_model.updateNewScore(newScore));
        if (upErr) {
            return next(upErr);
        }
        console.log(newRow);


        //B4: redirect 
        let redirect_link = '/score/' + studyId;
        res.redirect(redirect_link);
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