const db = require('../utils/db');
const run = db.errorHandle;
const tbName = 'score';
const tbStudy = 'study';
const tbCourse = 'course';
const tbMajor = 'major';
const tbUser = 'user';

const relativeTb = 'ordersdetails';
const NameFields = 'number_of_bidded';
const subcatetable = 'subcategory';
const usertable = 'user_';
const idField = 'id';

module.exports = {
    allScore: async () => {
        const sql = `SELECT * FROM ${tbName}`;
        const [rows, err] = await run(db.load(sql));
        if (err) {
            throw err;
        }
        return rows;
    },

    getScoreById: async id => {
        const sql = `SELECT * FROM ${tbName} WHERE id=${id}`;
        const [rows, err] = await run(db.load(sql));
        if (err) {
            throw err;
        }
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    },

    getScoreByStudyId: async StudyId => {
        const sql = `SELECT *
                FROM ${tbName}
                WHERE study = ${StudyId}`;
        const [rows, err] = await run(db.load(sql));
        if (err) {
            throw err;
        }
        if (rows.length > 0) {
            return rows;
        }
        return null;
    },
    addNewScore: async entity => {
        const [newRow,err] = await run(db.add(tbName,entity));
        if (err)
        {
            throw err;
        }
        else{
            return newRow;
        }
    },
    delScore: async scoreId =>{
        const [id,err] = await run(db.del(tbName,'id',scoreId));
        if (err)
        {
            throw err;
        }
        else
        {
            return id;
        }
    },

    updateNewScore: async entity =>
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
};