const db = require('../utils/db');
const run = db.errorHandle;
const tbName ='user_';

const idField = 'f_userID';
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
    //get data of user by userName
    getByUserName: async userName =>{
        let sql = 'SELECT * FROM ?? WHERE ?? = ?';
        const params = [tbName, 'f_Username', userName];   
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
        const params = [tbName, 'f_userID', userID];   
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

    //check email exists
    checkEmmailExists: async email =>{
        let sql = `SELECT * FROM ?? WHERE ?? =  ?;`;
        const params = [tbName,'f_email', email];
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
        let sql = 'update ?? set f_permission=0 where f_userID=?'
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
        let sql = 'update ?? set f_permission=1 where f_userID=?'
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