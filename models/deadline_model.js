const db = require('../utils/db');
const run = db.errorHandle;
const tbName = 'deadline';
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
    allDeadline: async () => {
        const sql = `SELECT * FROM ${tbName}`;
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return rows;
    },

    getDeadlineById: async id => {
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

    getDeadlineCustomDateById: async id => {
        const sql = `SELECT *, DATE_FORMAT(duedate, '%Y-%m-%dT%H:%i') AS custom_date 
                FROM ${tbName} WHERE id=${id}`;
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

    getDeadlineByUserId: async UserID =>{
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

    checkDeadlineByDeadlineIdUserId: async (DeadlineID, UserId) => {
        const sql = `SELECT *
                    FROM ${tbName} as dl
                    WHERE dl.id = ${DeadlineID} and dl.user = ${UserId}`;
        const [rows, err] = await run(db.load(sql));
        if (err) {
            throw err;
        }
        if (rows.length > 0) {
            return rows;
        }
        return null;
    },

    addNewDeadline: async entity =>
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

    addNewDeadlineWithUserID: async (userID) =>
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
    
    updateNewDeadline: async entity =>
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

    delDeadline: async deadlineID =>{
        const [id,err] = await run(db.del(tbName,'id',deadlineID));
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