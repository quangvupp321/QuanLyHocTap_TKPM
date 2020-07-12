const db = require('../utils/db');
const run = db.errorHandle;
const tbName = 'major';

module.exports = {
    //get all category
    allMajor: async () => {
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
    getMajorByMajorID: async majorID =>{
        let sql = 'SELECT * FROM ?? WHERE ?? = ?';
        const params = [tbName, 'id', majorID];   
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

    getCourseByMajorID: async majorID =>{
        let sql = 'SELECT * FROM ?? WHERE ?? = ?';
        const params = [tbName, 'major', majorID];   
        sql = db.mysql.format(sql, params);
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        if (rows.length >0)
        {
            return rows;
        }
        else
        {
            return null;
        }
    },

    updateNewMajorName: async entity =>
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

    delMajor: async majorID =>{
        const [id,err] = await run(db.del(tbName,'id',majorID));
        if (err)
        {
            throw err;
        }
        else
        {
            return id;
        }
    },

    addNewMajor: async entity =>
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
