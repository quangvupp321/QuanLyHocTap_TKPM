const db = require('../utils/db');
const run = db.errorHandle;
const tbName = 'course';
const tbMajor = 'major';

module.exports = {
    //get all category
    allCourse: async () => {
        const sql = `SELECT * FROM ${tbName}`;
        //error handle
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        else
        {
            return rows;
        }
    },
    getCourseByCourseID: async courseID =>{
        let sql = 'SELECT * FROM ?? WHERE ?? = ?';
        const params = [tbName, 'id', courseID];   
        sql = db.mysql.format(sql, params);
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

    updateNewCourseName: async entity =>
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

    delCourse: async courseID =>{
        const [id,err] = await run(db.del(tbName,'id',courseID));
        if (err)
        {
            throw err;
        }
        else
        {
            return id;
        }
    },

    addNewCourse: async entity =>
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
};
