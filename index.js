//Package
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');

//biến hằng
const app = express();
const PORT = process.env.PORT || 3000;
const HOST_NAME = '127.0.0.1';

// create application/json parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

//config cho express handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    helpers: require("./helpers/handlebars.js").helpers,
});

//config cho session
app.use(session({
    secret: 'tkpm',
    resave: false,
    saveUninitialized: true,
}));

//set view engine 
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//configure for passport
app.use(passport.initialize());
app.use(passport.session());
require('./middleWare/passport')(passport);
app.use((req, res, next) => {
    //console.log('FAill');
    res.locals.user = req.user;
    next();
});


//static diection for resource
app.use('/', express.static(__dirname + '/public'));
app.use('/user', express.static(__dirname + '/public'));
app.use('/account', express.static(__dirname + '/public'));
app.use('/search', express.static(__dirname + '/public'));
app.use('/product', express.static(__dirname + '/public'));
app.use('/admin', express.static(__dirname + '/public'));
app.use('/admin/up-level', express.static(__dirname + '/public'));
app.use('/admin/up-level', express.static(__dirname + '/public'));
app.use('/study', express.static(__dirname + '/public'));
app.use('/graduate', express.static(__dirname + '/public'));
app.use('/score', express.static(__dirname + '/public'));
app.use('/note', express.static(__dirname + '/public'));
app.use('/deadline', express.static(__dirname + '/public'));
app.use('/report', express.static(__dirname + '/public'));

//Điều hướng về controller
app.use('/', require('./controllers/index_controller'));
//Điều hướng về user_controller xử lí các chức năng liên quan tới đăng nhập 
app.use('/user', require('./controllers/user_controller'));
//điều hướng về account_controller xử lí các chức năng liên quan tới thao tác người dùng
app.use('/account', require('./controllers/account_controller'));
//điều hướng về search_controller để xử lí các chức năng liên quan tới tìm kiếm và sắp xếp theo thông tin 
app.use('/search', require('./controllers/search_controller'));
//Điều hướng về admin_controller các chức năng phân quyền của admin
app.use('/admin', require('./controllers/admin_controller'));
//Điều hướng về study_controller các chức năng thêm/xóa/sửa của sinh viên
app.use('/study', require('./controllers/study_controller'));
//Điều hướng về graduate_controller các chức năng của chương trình đào tạo
app.use('/graduate', require('./controllers/graduate_controller'));
//Điều hướng về score_controller các chức năng của quản lý điểm học tập
app.use('/score', require('./controllers/score_controller'));
//Điều hướng về note_controller các chức năng của quản lý note
app.use('/note', require('./controllers/note_controller'));
//Điều hướng về deadline_controller các chức năng của quản lý deadline
app.use('/deadline', require('./controllers/deadline_controller'));
//Điều hướng về report_controller các chức năng của quản lý report
app.use('/report', require('./controllers/report_controller'));


require('./middleWare/error')(app);


//app.listen(PORT, HOST_NAME, () => console.log(`Server IP: ${HOST_NAME} start on ${PORT}`));
app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});