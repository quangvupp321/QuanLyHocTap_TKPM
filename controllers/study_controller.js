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
        var list_empty = true;
        if (courses != null) {
            list_empty = false;
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
        } else {
            courses = [];
            courses[0] = {
                id: '',
                name: '',
                major: '',
                credit: '',
                qualify: '',
                majorname: '',
                studyid: '',
                dtb: '',
            }
        }
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
            list_empty,
        });
    }
});

router.post('/delete', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        //B1: get data from form 
        const studyId = parseInt(req.body.studyid);

        //B2: check if category emty
        const [check, chErr] = await run(score_model.getScoreByStudyId(studyId));
        if (check != null) {
            console.log("Môn học có các cột điểm!!!");
        } else {
            const [id, delErr] = await run(study_model.delStudy(studyId));
            console.log("Deleted!");
        }
        let redirect_link = '/study/course';
        res.redirect(redirect_link);
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

module.exports = router;