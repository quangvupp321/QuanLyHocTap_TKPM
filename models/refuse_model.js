const db = require('../utils/db');
const run = db.errorHandle;
const tbName = 'refuselist';
const relativetbName = 'products';
module.exports = { 
    getRefuseLIst: async (ProID, BidderID) =>{
        let sql = `SELECT * FROM ?? WHERE ProID = ? AND BidderID = ? ;`;
        const params = [tbName,ProID,BidderID];
        sql = db.mysql.format(sql,params);
        const [list,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        if (list.length >0)
        {
            return list;
        }
        return null;
    },

    addNewUSerToRefuseList: async entity =>{
        const [newid,err] = await run(db.add(tbName,entity));
        if (err)
        {
            throw err;
        }
        else{
            return newid;
        }
    },
}