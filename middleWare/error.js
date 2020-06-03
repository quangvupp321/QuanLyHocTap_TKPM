const createError = require('http-errors');

module.exports = app =>{
    app.use((req,res,next) => {
        next(createError(404));
    });
    app.use((err,req,res,next) =>{
        //console.log(err.messenger);
        let status = err.status || 500;
        let errcode = 'error';
        if (status === 404)
        {
            errcode = '404';
        }
        else if (status === 500)
        {
            errcode = '500';
        }
        
        let errMess = err.message;
        //render error layout here
        res.render('error/errorPage',{
            layout: false,
            errcode,
            errMess,
            title: status,
            //error: err,
        }); 
    });
};
