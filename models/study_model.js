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

    getCountUserByCourseid: async courseid =>{
        const sql = `SELECT COUNT(DISTINCT user) as count
                FROM ${tbName}
                WHERE course = ${courseid}`;
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        } 
        if (rows.length > 0)
        {
            return rows[0];
        }
        return null;
    },

    getUsesInfoByCourseid: async courseid =>{
        const sql = `SELECT DISTINCT u.*
                FROM ${tbName} as stu, ${tbUser} as u
                WHERE course = ${courseid} and stu.user = u.id`;
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

    delStudy: async studyID =>{
        const [id,err] = await run(db.del(tbName,'id',studyID));
        if (err)
        {
            throw err;
        }
        else
        {
            return id;
        }
    },
};