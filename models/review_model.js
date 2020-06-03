const db = require('../utils/db');
const run = db.errorHandle;
const tbName ='review';
const tbUser = 'user_';
const tbProduct = "products";
const tbOrder = "ordersdetails";
module.exports = {
    getAllReviewBySendID: async SendID =>{
        let sql = `SELECT rv.*, u.f_username, p.ProName, od.OrderDate
                FROM ?? as rv, ?? as u, ?? as p, ?? as od
                WHERE rv.SendID = ? and rv.ReciveID = u.f_userID 
                and rv.OrderID = od.OrderID and od.ProID = p.ProID;`;
        const params = [tbName, tbUser, tbProduct, tbOrder, SendID];
        sql = db.mysql.format(sql,params);
        const [rows, error] = await run(db.load(sql));
        if (error)
        {
            throw error;
        } 
        if (rows.length > 0)
        {
            return rows;
        }
        return null;
    },
};