const express = require('express');
const router = express.Router();
const course_model = require('../models/course_model');
const major_model = require('../models/major_model');
const study_model = require('../models/study_model');
const score_model = require('../models/score_model');
const user_model = require('../models/user_model');
const deadline_model = require('../models/deadline_model');
const schoolyear_model = require('../models/schoolyear_model');
const e = require('express');
const extendsFunc = require('../utils/extensionFunc'),
    run = extendsFunc.errorHandle,
    //function to convert milisecconds to date
    convertTime = extendsFunc.convertTime;

//==========================Deadline
router.get('/', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {

        const userID = req.user.id;
        const [user, usererr] = await run(user_model.getByUserID(userID));
        if (usererr) {
            return next(usererr);
        }
        const [user_deadlines, userr] = await run(deadline_model.getDeadlineByUserId(userID));
        if (userr) {
            return next(userr);
        }
        let deadlines = [];
        if (user_deadlines != null) {
            for (let i = 0; i < user_deadlines.length; i++) {
                var endtime = new Date(user_deadlines[i].duedate);
                var remainTime = endtime.getTime() - Date.now();
                var missed = false;
                if (endtime.getTime() - Date.now() < 0 && user_deadlines[i].iscomplete != 1) {
                    missed = true;
                }
                if (missed) {
                    remainTime = -remainTime;
                }
                deadlines[i] = {
                    id: user_deadlines[i].id,
                    user: user_deadlines[i].user,
                    title: user_deadlines[i].title,
                    tag: user_deadlines[i].tag,
                    duedate: user_deadlines[i].duedate,
                    note: user_deadlines[i].note,
                    iscomplete: user_deadlines[i].iscomplete,
                    remaintime: convertTime(remainTime),
                    missed: missed,
                }
            }
        }


        //B2: render to web
        res.render('./layouts/deadline/list_deadline', {
            title: 'List Deadline',
            layout: './deadline/list_deadline',
            deadlines,
        });
    }
});

router.get('/:deadlineid/id', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        const userID = req.user.id;
        const [user, usererr] = await run(user_model.getByUserID(userID));
        if (usererr) {
            return next(usererr);
        }

        const deadlineID = parseInt(req.params.deadlineid);

        const [checkDL, cstuerr] = await run(deadline_model.checkDeadlineByDeadlineIdUserId(deadlineID, userID));
        if (cstuerr) {
            return next(cstuerr);
        }

        if (!checkDL) {
            let messenge = "Note không thuộc user này!";
            console.log(messenge);
            return res.redirect('/note');
        }
        const [deadline_detail, couerr] = await run(deadline_model.getDeadlineCustomDateById(deadlineID));
        if (couerr) {
            return next(couerr);
        }
        var endtime = new Date(deadline_detail.duedate);
        var remainTime = endtime.getTime() - Date.now();
        var missed = false;
        if (endtime.getTime() - Date.now() < 0 && deadline_detail.iscomplete != 1) {
            missed = true;
        }
        if (missed) {
            remainTime = -remainTime;
        }
        const deadline = {
            id: deadline_detail.id,
            user: deadline_detail.user,
            title: deadline_detail.title,
            tag: deadline_detail.tag,
            duedate: deadline_detail.duedate,
            note: deadline_detail.note,
            iscomplete: deadline_detail.iscomplete,
            remaintime: convertTime(remainTime),
            missed: missed,
            custom_date: deadline_detail.custom_date,
        }
        console.log(deadline);

        //B2: render to web
        res.render('./layouts/deadline/detail_deadline', {
            title: 'Deadline-Detail',
            layout: './deadline/detail_deadline',
            deadlineID,
            deadline,
        });
    }
});

router.post('/edit', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        //B1: get data from form 
        const deadlineID = parseInt(req.body.deadlineid);
        var oldDateTime = new Date(req.body.deadlineduedate);
        var newDateTime = oldDateTime.toISOString().slice(0, 19).replace('T', ' '); 

        const newDeadline = {
            id: deadlineID,
            user: req.body.deadlineuser,
            title: req.body.deadlinetitle,
            tag: req.body.deadlinetag,
            duedate: newDateTime,
            note: req.body.deadlinenote,
            iscomplete: req.body.deadlineiscomplete,
        }
        //B3: update new Category Name 
        const [newRow, upErr] = await run(deadline_model.updateNewDeadline(newDeadline));

        //B4: redirect 
        return res.redirect('/deadline');
    }
});

router.post('/delete', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        //B1: get data from form 
        const deadlineID = parseInt(req.body.deadlineid);

        //B2: check if category emty
        const [id, delErr] = await run(deadline_model.delDeadline(deadlineID));
        //B : redirect
        return res.redirect('/deadline');
    }
});

router.get('/add', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        const userID = req.user.id;

        const newDeadline = {
            user: userID,
            title: '',
            tag: '',
            note: '',
            iscomplete: 0,
        }


        var redirect_link = '/deadline';
        const [newRow, addErr] = await run(deadline_model.addNewDeadline(newDeadline));
        return res.redirect(redirect_link);
    }
});

router.post('/check', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        //B1: get data from form 
        const deadlineID = parseInt(req.body.deadlineid);
        var iscomplete = req.body.deadlineiscomplete;
        if (iscomplete == 0) {
            iscomplete = 1;
        } else if (iscomplete == 1) {
            iscomplete = 0;
        }
        var d = new Date(req.body.deadlineduedate);
        newDate = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
        const newDeadline = {
            id: deadlineID,
            user: req.body.deadlineuser,
            title: req.body.deadlinetitle,
            tag: req.body.deadlinetag,
            duedate: newDate,
            note: req.body.deadlinenote,
            iscomplete: iscomplete,
        }
        //B3: update new Category Name 
        const [newRow, upErr] = await run(deadline_model.updateNewDeadline(newDeadline));
        //B : redirect
        return res.redirect('/deadline');
    }
});

module.exports = router;