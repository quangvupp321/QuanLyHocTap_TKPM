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
app.use('/account',express.static(__dirname + '/public'));
app.use('/search', express.static(__dirname + '/public'));
app.use('/product',express.static(__dirname + '/public'));
app.use('/category', express.static(__dirname + '/public'));
app.use('/seller', express.static(__dirname + '/public'));
app.use('/seller/add-descript', express.static(__dirname + '/public'));
app.use('/category/:catid/cat/', express.static(__dirname + '/public'));
app.use('/admin', express.static(__dirname + '/public'));
app.use('/admin/up-level', express.static(__dirname + '/public'));
app.use('/admin/up-level', express.static(__dirname + '/public'));
app.use('/seller/add-descript/', express.static(__dirname + '/public'));
app.use('/study', express.static(__dirname + '/public'));

//Điều hướng về controller
app.use('/', require('./controllers/index_controller'));
//Điều hướng về user_controller xử lí các chức năng liên quan tới đăng nhập 
app.use('/user', require('./controllers/user_controller'));
//điều hướng về account_controller xử lí các chức năng liên quan tới thao tác người dùng
app.use('/account', require('./controllers/account_controller'));
//điều hướng về search_controller để xử lí các chức năng liên quan tới tìm kiếm và sắp xếp theo thông tin 
app.use('/search', require('./controllers/search_controller'));
//điều hướng về product_controller để xử lí các chức năng liên quan tới chi tiết tường sản phẩm
app.use('/product', require('./controllers/product_controller'));
//điều hướng về category_controller xử lí các chức năng theo danh mục sản phẩm
app.use('/category', require('./controllers/category_controller'));
//Điều hướng về seller_controller các chức năng phân quyền của seller
app.use('/seller', require('./controllers/seller_controller'));
//Điều hướng về admin_controller các chức năng phân quyền của admin
app.use('/admin', require('./controllers/admin_controller'));
//Điều hướng về study_controller các chức năng thêm/xóa/sửa của sinh viên
app.use('/study', require('./controllers/study_controller'));





require('./middleWare/error')(app); 


app.listen(PORT,HOST_NAME, () => console.log(`Server IP: ${HOST_NAME} start on ${PORT}`));
