const db = require('../utils/db');
const run = db.errorHandle;
const tbName = 'schoolyear';
const tbCourse = 'course';
const tbMajor = 'major';
const tbUser = 'user';

module.exports = {
    allSchoolyear: async () => {
        const sql = `SELECT * FROM ${tbName}`;
        const [rows,err] = await run(db.load(sql));
        if (err)
        {
            throw err;
        }
        return rows;
    },

    getSchoolyearById: async id => {
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
    }
};