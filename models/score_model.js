const db = require('../utils/db');
const run = db.errorHandle;
const tbName = 'score';
const tbStudy = 'study';
const tbCourse = 'course';
const tbMajor = 'major';
const tbUser = 'user';

const relativeTb = 'ordersdetails';
const NameFields = 'number_of_bidded';
const subcatetable = 'subcategory';
const usertable = 'user_';
const idField = 'id';

module.exports = {
    allScore: async () => {
        const sql = `SELECT * FROM ${tbName}`;
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return rows;
    },

    getScoreById: async id => {
        const sql = `SELECT * FROM ${tbName} WHERE id=${id}`;
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

    getScoreByStudyId: async StudyId =>{
        const sql = `SELECT *
                FROM ${tbName}
                WHERE study = ${StudyId}`;
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        } 
        if (rows.length > 0)
        {
            return rows;
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