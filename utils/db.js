const mysql = require('mysql');

//after create database 'qlbh' add 
//ALTER USER '<user>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>'; 

function createConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: '3306',
        password: '123456',
        database: 'qldg'
    });
}

module.exports = {
    //using format function in model
    mysql,
    //get data from database by sql
    load: sql =>
    {
        return new Promise((resole, reject)=>
        {
            const connection = createConnection();
            
            connection.connect(err => {
                if (err)
                {
                    reject(err);
                }
            });
            connection.query(sql, (error,results, fields)=> {
                if (error)
                {
                    reject(error);
                }
                else
                {
                    resole(results);  
                } 
            })
            connection.end();
        });
    },
    //insert data
    add: (tbName, entity) => 
        {
        return new Promise((reject, resole)=>
        {
            //create connection with connectionString
            const connection = createConnection();
            //connect to database
            connection.connect(err =>{
                if (err)
                {
                    reject(err);
                }
            });
            // execute query
            let sql = `INSERT INTO ${tbName} SET ?`; 
            
            connection.query(sql,entity, (err,results,fields)=>{
                if (err)
                {
                    console.log("err " + err);
                    reject(err);
                }
                else{
                    console.log("Success: " + results.insertId);
                    resole(results.insertId);
                }
               
            });
            //close connection
            connection.end();
        });
    },
    //delete row in databse base on table Name, column name, id
    del: (tbName, idFields, id) =>{
        return new Promise((reject, resole) => {
            const connection = createConnection();

            connection.connect(err => {
                if (err) {
                    reject(err);
                }
            });
            //create query
            let sql = `DELETE FROM ?? WHERE ?? = ?`;            
            const params = [tbName, idFields, id];
            sql = mysql.format(sql, params);
            connection.query(sql ,(error, results, fields)=>{
                if (error)
                {
                    reject(error);
                }
                else
                {
                    resole(results.affectedRows);
                }
            });
            connection.end();
        });
    },

    //update data in database base on table Name, id column name, entity to update
    update: (tbName, idFields, entity) =>{
        return new Promise((reject,resole) =>{
            const connection = createConnection();

            connection.connect(err => {
                if (err) {
                    reject(err);
                }
            });
            // get id of entity where you want to update
            const id = entity[idFields];
            
            //update so you have to delete id column
            delete entity[idFields];
            let sql = `UPDATE ${tbName} SET ? WHERE ${idFields} = ${id}`;
            //excute quyery
            connection.query(sql, entity, (error, results, fields)=>{
                if (error)
                {
                    reject(error);
                }
                else
                {
                    //console.log(results);
                    resole(results.changedRows);
                }
            });
            connection.end();
        });
    },
    //error handling
    errorHandle: Promise =>{
        return Promise.then(data => [data, undefined]).catch(err => [undefined, err]);
    },
}   