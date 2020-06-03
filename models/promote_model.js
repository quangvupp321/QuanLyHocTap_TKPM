const db = require('../utils/db');
const run = db.errorHandle;
const tbName = 'promotion';
const tbUser = 'user_';

module.exports = {
    //add promote request
    promoteReQuest: async entity =>{
        const [id,err] = await run(db.add(tbName, entity));
        if (err)
        {
            throw err;
        }
        return id;
    },

    //check if user has request to become seller
    checkPromote: async userID =>{
        let sql = `SELECT * FROM ?? Where UserID = ?`;
        const parms = [tbName,userID];
        sql = db.mysql.format(sql, parms);
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        if (rows.length>0)
        {
            return false;
        }
        return true;
    },

    //get promote list 
    getPromoteList: async () =>{
        let sql = `SELECT * FROM ${tbName}`;
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        if (rows.length>0)
        {
            return rows;
        }
        return null;
    },

    deletePromoteRequest: async PromoteID =>{
        const [effextRow,err] = await run(db.del(tbName,'PromoteID',PromoteID));
        if (err)
        {
            throw err;
        }
        return effextRow;
    },
}