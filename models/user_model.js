const db = require('../utils/db');
const run = db.errorHandle;
const tbName ='user';

const idField = 'id';
module.exports = {
    // add new account to user table of databsae 
    addNewAccount: async newUser =>{
        const [id,error] = await run(db.add(tbName, newUser));
        if (error)
        {
            throw error;
        }
        return id;
    },
    //get data of user by mssv
    getByMssv: async mssv =>{
        let sql = 'SELECT * FROM ?? WHERE ?? = ?';
        const params = [tbName, 'mssv', mssv];   
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
    //get user by user id
    getByUserID: async userID =>{
        let sql = 'SELECT * FROM ?? WHERE ?? = ?';
        const params = [tbName, 'id', userID];   
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

    //Check MSSV Exists
    checkMssvExists: async mssv =>{
        let sql = `SELECT * FROM ?? WHERE ?? =  ?;`;
        const params = [tbName,'mssv', mssv];
        sql = db.mysql.format(sql,params); 
        const [isExists, error] = await run(db.load(sql));
        if (error)
        {
            throw error;
        }
        if (isExists.length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    },

    // update user infor 
    updateUserInfor: async entity =>{
        // identity  by user id
        const [newUpdate,err] = await run(db.update(tbName, idField,entity));
        console.log(err);
        return newUpdate;
    },
    getlistAccount: async () => {
        let sql  = `SELECT * FROM ${tbName};`
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return rows;
    },

    getlistAccount: async () =>{
        let sql  = `SELECT * FROM ${tbName}`;
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return rows;
    },
    downpermission: async (userid)=>
    {
        let sql = 'update ?? set permission=0 where id=?'
        const params = [tbName,userid];
        sql = db.mysql.format(sql,params); 
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return rows;
    },
    uppermission: async (userid)=>
    {
        let sql = 'update ?? set permission=1 where id=?'
        const params = [tbName,userid];
        sql = db.mysql.format(sql,params); 
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return rows;
    }

};