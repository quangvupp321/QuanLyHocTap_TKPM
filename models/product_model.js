const db = require('../utils/db');
const run = db.errorHandle;
const tbName = 'products';
const relativeTb = 'ordersdetails';
const NameFields = 'number_of_bidded';
const subcatetable = 'subcategory';
const usertable = 'user_';
const idField = 'ProID';

module.exports = {
    allProducts: async () => {
        const sql = `SELECT * FROM ${tbName}`;
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return rows;
    },
    allProductslimit: async (page,order) => {
        let sql = `SELECT * 
        FROM ??  
        GROUP BY ProID 
        ORDER BY ?? DESC
        limit ?,6;`;
        console.log("tututu")
        console.log(page)
        const params = [tbName,order,(page-1)*6];
        sql = db.mysql.format(sql,params);
        // console.log(sql)
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return rows;
    },
    productByProId: async id => {
        const sql = `SELECT * FROM ${tbName} WHERE ProID=${id}`;
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

    getProductByCatId: async CatID =>{
        let sql = `SELECT p.*
                FROM ?? as subcate, ?? as p 
                WHERE subcate.SubCatID = p.SubCatID and ?? = ?`;
        const params = [subcatetable, tbName,'categoryID', CatID];
        sql = db.mysql.format(sql,params);
        const [wList, error] = await run(db.load(sql));
        if (error)
        {
            throw error;
        } 
        if (wList.length > 0)
        {
            return wList;
        }
        return null;
    },
    getAllProductBySubCatId: async SubCatID =>{
        let sql = `SELECT p.*
                FROM ?? as subcate, ?? as p 
                WHERE subcate.SubCatID = p.SubCatID and p.?? = ?`;
        const params = [subcatetable, tbName,'SubCatID', SubCatID];
        sql = db.mysql.format(sql,params);
        const [wList, error] = await run(db.load(sql));
        if (error)
        {
            throw error;
        } 
        if (wList.length > 0)
        {
            return wList;
        }
        return null;
    },
    getProductByCatIdlimit: async (CatID,page,order) =>{
        let sql = `SELECT p.*
                FROM ?? as subcate, ?? as p 
                WHERE subcate.SubCatID = p.SubCatID and ?? = ?
                GROUP BY ProID 
                ORDER BY ?? DESC
                limit ?,6;`;
        const params = [subcatetable, tbName,'categoryID', CatID,order,(page-1)*6];
        sql = db.mysql.format(sql,params);
        const [wList, error] = await run(db.load(sql));
        if (error)
        {
            throw error;
        } 
        if (wList.length > 0)
        {
            return wList;
        }
        return null;
    },
    productBySubCatID: async (limit,SubCatID) => {
        let sql = `SELECT COUNT(*) as ??, p.ProID, p.ProName, p.Price, p.CeilPrice, p.create_time, p.end_time
        FROM ?? as p, ?? as od
        WHERE p.ProID = od.ProID and p.SubCatId = ?
        GROUP BY p.ProID 
        LIMIT ?;`;
        const params = [NameFields,  tbName, relativeTb, SubCatID, limit];
        sql = db.mysql.format(sql,params);
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        else if (rows.length > 0)
        {
            return rows;
        }
        return null;
    },
    productBySubCatIDlimit: async (SubCatID,page,order) => {
        let sql = `select pro_.*
        from	?? as pro_, ?? as sub
        where pro_.SubCatID = sub.SubCatID and sub.SubCatID=?
        GROUP by pro_.ProID
        ORDER BY ?? DESC
        limit ?,6;
        `;
        console.log(sql)
        const params = [tbName,subcatetable, SubCatID,order,(page-1)*6];
        sql = db.mysql.format(sql,params);
        console.log(sql)
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return rows;
    },
    getNumberofProducts: async (limit, orderby) =>{
        let sql = `SELECT COUNT(*) as ??, p.ProID, p.ProName, p.Price, p.CeilPrice, p.create_time, p.end_time, p.SellerID
                    FROM ?? as p, ?? as od
                    WHERE p.ProID = od.ProID AND timestampdiff(minute,NOW(),end_time) > 0
                    GROUP BY p.ProID 
                    ORDER BY ?? DESC 
                    LIMIT ?`;
        const params = [NameFields,  tbName, relativeTb, orderby, limit];
        sql = db.mysql.format(sql,params);
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return rows;
    },

    //get list of products has been posted by user 
    getListProductOwned: async userID =>{
        let sql =`SELECT * FROM ?? Where ?? = ?;`;
        const params = [tbName, 'SellerID', userID];
        sql = db.mysql.format(sql, params);
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
    getListProductOwnedAndBidded: async userID =>{
        let sql =`SELECT p.*, od.OrderID, od.PriceOrdered, u.f_username as TopBidder
        FROM ?? as p, ?? as od, ?? as u
        Where p.?? = ? and p.ProID=od.ProID and od.IsSuccess=1 and od.BidderID=u.f_userID
        group by p.ProID;`;
        const params = [tbName, relativeTb, usertable, 'SellerID', userID];
        sql = db.mysql.format(sql, params);
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

    updateProduct: async entity =>{
        const [newrow,err] = await run(db.update(tbName,idField,entity));
        if (err)
        {
            throw err;
        }
        return newrow;
    },

    getproductbysearch: async (search,page,order) =>
    {
        let sql = `SELECT * FROM ?? WHERE MATCH (ProName) AGAINST ('??' IN NATURAL LANGUAGE MODE)
        GROUP by ProID
        ORDER BY ?? DESC
        limit ?,6;`
        const params = [tbName,search,order,(page-1)*6];
        sql = db.mysql.format(sql, params);
        console.log(sql)
        const[row,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return row;
    },

    addNewProduct: async entity =>{
        const [id,err] = await run(db.add(tbName,entity));
        if (err)
        {
            console.log("But still get error");
           
        }
        return id;
    },
    updateProduct_derip: async (proid,derip)=>
    {
        console.log(proid)
        console.log(derip)
        let sql = `update products set Description="??" where ProID=? `
        let params = [derip,proid];
        sql = db.mysql.format(sql,params);
        console.log(sql)
        const [list,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return list;
    },
    delete: async(proid)=>
    {
        let sql = `delete from products where ProID = ? ;`
        let params = [proid];
        sql = db.mysql.format(sql,params);
        const [list,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return list;
    }
};