const db = require('../utils/db');
const run = db.errorHandle;
const tbName = 'study';
const tbCourse = 'course';
const tbMajor = 'major';
const tbUser = 'user';
const tbSchoolyear = 'schoolyear';

const relativeTb = 'ordersdetails';
const NameFields = 'number_of_bidded';
const subcatetable = 'subcategory';
const usertable = 'user_';
const idField = 'id';

module.exports = {
    allStudy: async () => {
        const sql = `SELECT * FROM ${tbName}`;
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return rows;
    },

    getStudyById: async id => {
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

    getStudyByCourseId: async CourseID =>{
        const sql = `SELECT *
                FROM ${tbName}
                WHERE course = ${CourseID}`;
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

    getStudyByUserid: async userid =>{
        const sql = `SELECT *
                FROM ${tbName}
                WHERE user = ${userid}`;
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

    checkStudyByStudyIdUserId: async (StudyId, UserId) => {
        const sql = `SELECT *
                    FROM ${tbName} as stu
                    WHERE stu.id = ${StudyId} and stu.user = ${UserId}`;
        const [rows, err] = await run(db.load(sql));
        if (err) {
            throw err;
        }
        if (rows.length > 0) {
            return rows;
        }
        return null;
    },

    getCourseStudyMajorByStudyId: async StudyId => {
        const sql = `SELECT cou.id as courseid, cou.name as coursename, cou.credit as coursecredit, maj.name as majorname, stu.semester, stu.schoolyear as schoolyearid, scho.name as schoolyearname, stu.qualify
                    FROM ${tbName} as stu, ${tbCourse} as cou, ${tbMajor} as maj, ${tbSchoolyear} as scho
                    WHERE stu.id = ${StudyId} and stu.course = cou.id and cou.major = maj.id and scho.id = stu.schoolyear`;
        const [rows, err] = await run(db.load(sql));
        if (err) {
            throw err;
        }
        if (rows.length > 0) {
            return rows;
        }
        return null;
    },

    getCountStudyByCourseIdUserId: async (CourseId, UserId) => {
        const sql = `SELECT COUNT(*) as count
                    FROM ${tbName}
                    WHERE course = ${CourseId} and user = ${UserId}`;
        const [rows, err] = await run(db.load(sql));
        if (err) {
            throw err;
        }
        if (rows.length > 0) {
            return rows;
        }
        return null;
    },

    getCourseByUserid: async userid =>{
        const sql = `SELECT cou.*, m.name as majorname, stu.id as studyid, stu.qualify as qualify
                FROM ${tbName} as stu, ${tbCourse} as cou, ${tbMajor} as m
                WHERE stu.user = ${userid} and stu.course = cou.id and cou.major = m.id`;
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

    getCourseByUseridQualify: async (userid, qualify) =>{
        const sql = `SELECT cou.*, m.name as majorname, stu.id as studyid
                FROM ${tbName} as stu, ${tbCourse} as cou, ${tbMajor} as m
                WHERE stu.user = ${userid} and stu.course = cou.id and cou.major = m.id and stu.qualify = ${qualify}`;
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

    getCourseByUseridNotQualify: async (userid, qualify) =>{
        const sql = `SELECT cou.*, m.name as majorname, stu.id as studyid
                FROM ${tbName} as stu, ${tbCourse} as cou, ${tbMajor} as m
                WHERE stu.user = ${userid} and stu.course = cou.id and cou.major = m.id and stu.qualify <> ${qualify}`;
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

    getCourseByUseridNotIn: async userid =>{
        const sql = `
        SELECT DISTINCT cou.*, m.name as majorname
        FROM study as stu, course as cou, major as m
        WHERE stu.user = ${userid} and cou.major = m.id and cou.id not in (
        SELECT course
        FROM study
        WHERE user = ${userid}
        ORDER BY cou.major
        )`;
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

    getCourseByUseridSemesterSchoolyear: async (userid, semester, schoolyear) =>{
        const sql = `SELECT cou.*, m.name as majorname, stu.id as studyid
                FROM ${tbName} as stu, ${tbCourse} as cou, ${tbMajor} as m
                WHERE stu.user = ${userid} and stu.course = cou.id and stu.semester = ${semester} and stu.schoolyear = ${schoolyear} and cou.major = m.id`;
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

    getCourseByUseridSchoolyear: async (userid, schoolyear) =>{
        const sql = `SELECT cou.*, m.name as majorname, stu.id as studyid
                FROM ${tbName} as stu, ${tbCourse} as cou, ${tbMajor} as m
                WHERE stu.user = ${userid} and stu.course = cou.id and stu.schoolyear = ${schoolyear} and cou.major = m.id`;
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

    getAllUserByCourseId: async CourseID =>{
        let sql = `SELECT u.*
                FROM ?? as u, ?? as stu 
                WHERE u.id = stu.user and stu.?? = ?`;
        const params = [tbUser, tbName,'course', CourseID];
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

    getStudyByUseridSemesterSchoolyear: async (userid, semester, schoolyear) =>{
        const sql = `SELECT *
                FROM ${tbName}
                WHERE user = ${userid} and semester = ${semester} and schoolyear = ${schoolyear}`;
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

    getAllUserByCourseIdSemesterSchoolyear: async (CourseID, semester, schoolyear) =>{
        let sql = `SELECT u.*
                FROM ?? as u, ?? as stu 
                WHERE u.id = stu.user and stu.?? = ? and stu.semester = ? and stu.schoolyear = ?`;
        const params = [tbUser, tbName,'course', CourseID, semester, schoolyear];
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

    addNewStudy: async entity =>
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