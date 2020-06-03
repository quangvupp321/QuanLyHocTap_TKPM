const db = require('../utils/db');
const run = db.errorHandle;
const tbName = 'ordersdetails';
const relatetbName1 = 'user_';
const relatetbName2 = 'products';

module.exports = {
    //get name of most price bidder base on proid
   //get name of most price bidder base on proid
   nameofMostPriceBidder: async proid =>{
    let sql = `SELECT max(PriceOrdered) AS ?? , ?? 
                FROM ?? AS od, ?? AS u 
                WHERE proid = ? AND od.BidderID = u.f_userID;`;
    const params = ['maxprice', 'f_fullname', tbName, relatetbName1, proid];
    sql = db.mysql.format(sql,params);
    const [rows,err] = await run(db.load(sql));
    if (err)
    {
        throw err;
    }
    //only get 1 user
    return rows[0];
},
//list of product you hase been bidded
    getMyBiddedList: async userID =>{
        let sql = `SELECT od.ProID, Rating, ProName, OrderID ,max(PriceOrdered) as priceOrder, IsSuccess, end_time 
                    FROM ?? as od, ?? as p where od.ProID = p.ProID and ?? = ? and od.IsSuccess = 0
                    Group by p.ProID;`;
        const params = [tbName, relatetbName2, 'BidderID', userID];
        sql = db.mysql.format(sql,params);
        const [list,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        else if (list.length > 0)
        {
            return list;
        }
        return null;
    },

    getTopBidderByProID: async proID =>{
        let sql = `SELECT u.*, BidderID, OrderID
                    FROM ?? as od, ?? as u
                    where od.ProID = ? and u.f_userID = od.BidderID
                    ORDER BY od.PriceOrdered DESC`;
        const params = [tbName, relatetbName1, proID];
        sql = db.mysql.format(sql,params);
        const [list,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        else if (list.length > 0)
        {
            return list[0];
        }
        return null;
    },

    //get list of bidder in your products
    getListBidedOfProducts: async proID => {
        let sql = `SELECT ProID, BidderID, f_fullname ,f_rating,  PriceOrdered,OrderDate,IsSuccess 
        FROM ??, ?? 
        WHERE ProID = ? AND ?? = BidderID ORDER BY ?? DESC `;
        const params = [tbName,relatetbName1 , proID, 'f_userID','PriceOrdered'];

        sql = db.mysql.format(sql,params);
        const [list,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        else if (list.length > 0)
        {
            return list;
        }
        return null;
    },
    maxprice_numberbidded: async (proid) =>
    {
        let sql = `select  count(pro_.ProID) as number_of_bidded , max(order_.PriceOrdered) as Max_PriceOrdered,order_.bidderID
        from  ?? as pro_, ?? as order_ , ?? as us
        where pro_.ProID= ? and order_.ProID= pro_.ProID and order_.BidderID =  us.f_userID
        group by pro_.ProID
        `
        const params = [relatetbName2, tbName, relatetbName1, parseInt(proid)];
        sql = db.mysql.format(sql,params);
        console.log(sql);
        const [rows,err] = await run(db.load(sql));

        if(err)
        {
            throw err;
        }
        return rows[0];
    },

    getuser_name : async (userID) =>
    {
        console.log(userID)
        let sql = `select us.f_username 
        from  User_ as us
        where us.f_userID = ?`
        const params = [userID];
        sql = db.mysql.format(sql,params);
        console.log(sql);
        const [rows,err] = await run(db.load(sql));
        if(err)
        {
            throw err;
        }
        return rows[0];
    },

    getMyBiddedEndList: async userID =>{
        let sql = `SELECT od.ProID, Rating, ProName, OrderID ,max(PriceOrdered) as priceOrder, IsSuccess, end_time 
                    FROM ?? as od, ?? as p where od.ProID = p.ProID and ?? = ? and od.IsSuccess = 1
                    Group by p.ProID;`;
        const params = [tbName, relatetbName2, 'BidderID', userID];
        sql = db.mysql.format(sql,params);
        const [list,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        else if (list.length > 0)
        {
            return list;
        }
        return null;
    },

    //add new order to order list
    addNewOrder: async entity =>{
        const [id,err] = await run(db.add(tbName, entity));
        if (err)
        {
            throw err;
        }
        return id;
    },

    delOrder: async orderID =>{
        const [id,err] = await run(db.del(tbName,'OrderID',orderID));
        if (err)
        {
            throw err;
        }
        else
        {
            return id;
        }
    },

    getOrderByProID: async proID=>{
        let sql = `SELECT * FROM ?? WHERE ProID = ? ORDER BY ?? DESC`;
        const params = [tbName,proID,'PriceOrdered'];
        sql = db.mysql.format(sql,params);
        const [rows,err] = await run(db.load(sql));
        if (err) {
            throw err;
        } else {
            return rows[0];
        }
    },

    updateOrder: async entity =>{
        const [newRow,err] = await run(db.update(tbName,'OrderID',entity));
        if (err) {
            throw err;
        } else {
            return newRow;
        }
    },updatederip: async (proid,derip)=>
    {
        let sql = `insert into description value (?,"??",NOW());`
        let params = [proid,derip];
        sql = db.mysql.format(sql,params);
        const [list,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return list;
    },
}