const db = require('../utils/db');
const run = db.errorHandle;
const tbName = 'category';
const subtbName = 'subcategory'

module.exports = {
    //get all category
    allCategories: async () => {
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
    //get all subcategory
    allSubCategories: async ()=>{
        const sql = ` SELECT * FROM ${subtbName}`;
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
    getCategoryByCategoryID: async categoryID =>{
        let sql = 'SELECT * FROM ?? WHERE ?? = ?';
        const params = [tbName, 'categoryID', categoryID];   
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
    getSubCategoryBySubCatID: async SubCatID =>{
        let sql = 'SELECT * FROM ?? WHERE ?? = ?';
        const params = [subtbName, 'SubCatID', SubCatID];   
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
    getSubCategoryByCategoryID: async categoryID =>{
        let sql = 'SELECT * FROM ?? WHERE ?? = ?';
        const params = [subtbName, 'categoryID', categoryID];   
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

    updateNewCateName: async entity =>
    {
        const [nR,err] = await run(db.update(tbName,'CategoryID',entity));
        if (err)
        {
            throw err;
        }
        else
        {
            return nR;
        }
    },     

    delCategory: async catID =>{
        const [id,err] = await run(db.del(tbName,'CategoryID',catID));
        if (err)
        {
            throw err;
        }
        else
        {
            return id;
        }
    },

    addNewCategory: async entity =>
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

    updateNewSubCateName: async entity =>
    {
        const [nR,err] = await run(db.update(subtbName,'SubCatID',entity));
        if (err)
        {
            throw err;
        }
        else
        {
            return nR;
        }
    },     

    delSubCategory: async subcatID =>{
        const [id,err] = await run(db.del(subtbName,'SubCatID',subcatID));
        if (err)
        {
            throw err;
        }
        else
        {
            return id;
        }
    },

    addNewSubCategory: async entity =>
    {
        const [newRow,err] = await run(db.add(subtbName,entity));
        if (err)
        {
            throw err;
        }
        else{
            return newRow;
        }
    },  
};
