const db = require('../utils/db');
const run = db.errorHandle;
const tbName = 'note';
const tbCourse = 'course';
const tbMajor = 'major';
const tbUser = 'user';
const tbSchoolyear = 'schoolyear';
const tbStudy = 'study';

const relativeTb = 'ordersdetails';
const NameFields = 'number_of_bidded';
const subcatetable = 'subcategory';
const usertable = 'user_';
const idField = 'id';

module.exports = {
    allNote: async () => {
        const sql = `SELECT * FROM ${tbName}`;
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return rows;
    },

    getNoteById: async id => {
        const sql = `SELECT * FROM ${tbName} WHERE id=${id}`;
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        if (rows.length >0)
        {
            return rows[0];
        }
        else
        {
            return null;
        }
    },

    getNoteByUserId: async UserID =>{
        const sql = `SELECT *
                FROM ${tbName}
                WHERE user = ${UserID}`;
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        } 
        if (rows.length > 0)
        {
            return rows;
        }
        return null;
    },

    checkNoteByNoteIdUserId: async (NoteId, UserId) => {
        const sql = `SELECT *
                    FROM ${tbName} as note
                    WHERE note.id = ${NoteId} and note.user = ${UserId}`;
        const [rows, err] = await run(db.load(sql));
        if (err) {
            throw err;
        }
        if (rows.length > 0) {
            return rows;
        }
        return null;
    },

    addNewNote: async entity =>
    {
        const [newRow,err] = await run(db.add(tbName,entity));
        if (err)
        {
            throw err;
        }
        else{
            return newRow;
        }
    },

    addNewNoteWithUserID: async (userID) =>
    {
        const sql = `INSERT INTO ${tbName} (user)
                    VALUES (${userID})`;
        const [newRow, err] = await run(db.load(sql));
        if (err) {
            throw err;
        } else {
            return newRow;
        }
    },
    
    updateNewNote: async entity =>
    {
        const [nR,err] = await run(db.update(tbName,'id',entity));
        if (err)
        {
            throw err;
        }
        else
        {
            return nR;
        }
    },     

    delNote: async noteId =>{
        const [id,err] = await run(db.del(tbName,'id',noteId));
        if (err)
        {
            throw err;
        }
        else
        {
            return id;
        }
    },

};