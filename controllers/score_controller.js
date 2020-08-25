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

        if (checkStudy == null) {
            let messenge = "Môn học không thuộc user này";
            console.log(messenge);
            return res.redirect('/score/course');
        }

        const [course_info, couerr] = await run(study_model.getCourseStudyMajorByStudyId(studyID));
        if (couerr) {
            return next(couerr);
        }
        console.log(course_info);

        const [scores_all, scoerr] = await run(score_model.getScoreByStudyId(studyID));
        if (scoerr) {
            return next(scoerr);
        }
        console.log(scores);

        var count = 1;
        if (course_info != null) {
            const [count_study, counterr] = await run(study_model.getCountStudyByCourseIdUserId(course_info[0].courseid, userID));
            if (counterr) {
                return next(counterr);
            }
            count = count_study[0].count;
        } else {
            console.log("course_info: null");
            /*
            const newEmptyScore = {
                study: studyID,
                name: '',
                percent: 0,
                score_num: 0,
            };
            const [newRow, addErr] = await run(score_model.addNewScore(newEmptyScore));
            if (addErr) {
                console.log(addErr);
            } else {
                console.log(newRow);
            }
            */
        }
        var dtb = 0;
        var scores = [];
        if (scores_all != null) {
            for (let i = 0; i < scores_all.length; i++) {
                scores[i] = {
                    id: scores_all[i].id,
                    study: scores_all[i].study,
                    name: scores_all[i].name,
                    score_num: scores_all[i].score_num,
                    percent: scores_all[i].percent,
                }
                dtb = dtb + scores_all[i].score_num * scores_all[i].percent / 100;
            }
        }
        dtb = Math.round(dtb * 1000) / 1000;

        //B2: render to web
        res.render('./layouts/score/detail', {
            title: 'Score-Detail',
            layout: './score/detail',
            studyID,
            course_info,
            scores,
            count,
            dtb,
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

        //B4: redirect 
        let redirect_link = '/score/' + studyId;
        res.redirect(redirect_link);
    }
});

module.exports = router;