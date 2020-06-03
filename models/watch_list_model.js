const db = require('../utils/db');
const run = db.errorHandle;
const tbName = 'watchlist';
const relativetbName = 'products';
module.exports = {
    addProductToWatchList: async entity =>{
        const [id,err] = await run(db.add(tbName, entity));
       
        return id;
    },

    getWatchList: async (userID) =>{
        let sql = `SELECT p.ProID, p.ProName,p.Price, p.end_time 
                FROM ?? as wl, ?? as p 
                WHERE p.ProID = wl.ProID and ?? = ?`;
        const params = [tbName, relativetbName,'UserID', userID];
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
    checkWatchList: async (userID, proID) =>{
        let sql = `SELECT p.ProID, p.ProName,p.Price, p.end_time 
                FROM ?? as wl, ?? as p 
                WHERE p.ProID = wl.ProID and ?? = ? and wl.?? = ?`;
        const params = [tbName, relativetbName,'UserID', userID, 'ProID', proID];
        sql = db.mysql.format(sql,params);
        const [wList, error] = await run(db.load(sql));
        if (error)
        {
            throw error;
        } 
        if (wList.length > 0)
        {
            return true;
        }
        return false;
    },
    getWatchListID: async(userID,proID)=>
    {
        let sql = `select WatchListID from watchlist WHERE ProID=? and UserID=?;
        `;
        const params = [proID,userID];
        
        sql = db.mysql.format(sql, params);
        const [wList, error] = await run(db.load(sql));
        if (error)
        {

            throw error;
        } 
        return wList[0];
    },

    delete: async (watchlistID) =>
    {
       
        let sql = `DELETE FROM ?? WHERE WatchListID=?`;
        const params = [tbName,watchlistID];
        sql = db.mysql.format(sql, params);
       
        const [row,error] = await run(db.load(sql));
        if (error)
        {
            throw error;
        }  
        return row;
    }
}