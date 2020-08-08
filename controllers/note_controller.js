const express = require('express');
const router = express.Router();
const course_model = require('../models/course_model');
const major_model = require('../models/major_model');
const study_model = require('../models/study_model');
const score_model = require('../models/score_model');
const user_model = require('../models/user_model');
const schoolyear_model = require('../models/schoolyear_model');
const e = require('express');
const note_model = require('../models/note_model');



const extensFunc = require('../utils/extensionFunc'),
    run = extensFunc.errorHandle;

//==========================Course
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
        const [user_notes, userr] = await run(note_model.getNoteByUserId(userID));
        if (userr) {
            return next(userr);
        }
        //B2: render to web
        res.render('./layouts/note/list_note', {
            title: 'List Note',
            layout: './note/list_note',
            user_notes,
        });
    }
});

router.get('/:noteid/id', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        const userID = req.user.id;
        const [user, usererr] = await run(user_model.getByUserID(userID));
        if (usererr) {
            return next(usererr);
        }

        const noteID = parseInt(req.params.noteid);

        const [checkNote, cstuerr] = await run(note_model.checkNoteByNoteIdUserId(noteID, userID));
        if (cstuerr) {
            return next(cstuerr);
        }

        if (!checkNote) {
            let messenge = "Note không thuộc user này!";
            console.log(messenge);
            return res.redirect('/note');
        }

        const [note_detail, couerr] = await run(note_model.getNoteById(noteID));
        if (couerr) {
            return next(couerr);
        }

        //B2: render to web
        res.render('./layouts/note/detail_note', {
            title: 'Note-Detail',
            layout: './note/detail_note',
            noteID,
            note_detail,
        });
    }
});

router.post('/edit', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        //B1: get data from form 
        const noteID = parseInt(req.body.noteid);
        const noteTitle = req.body.notetitle;
        //B2:Create new entity by majorID

        const newNote = {
            id: noteID,
            user: req.body.noteuser,
            title: req.body.notetitle,
            tag: req.body.notetag,
            content: req.body.notecontent,
        }
        console.log(newNote);
        //B3: update new Category Name 
        const [newRow, upErr] = await run(note_model.updateNewNote(newNote));

        console.log(newRow);

        //B4: redirect 
        return res.redirect('/note');
    }
});

router.post('/delete', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        //B1: get data from form 
        const noteID = parseInt(req.body.noteid);

        //B2: check if category emty
        const [id, delErr] = await run(note_model.delNote(noteID));
        console.log(id);
        //B : redirect
        return res.redirect('/note');
    }
});

router.get('/add', async (req, res, next) => {
    if (!req.user) {
        console.log("Not sign in!!");
        return res.redirect('/user/signin');
    } else {
        const userID = req.user.id;

        const newNote = {
            user: userID,
            title: '',
            tag: '',
            content: '',
        };


        var redirect_link = '/note';
        const [newRow, addErr] = await run(note_model.addNewNote(newNote));
        return res.redirect(redirect_link);
    }
});

module.exports = router;