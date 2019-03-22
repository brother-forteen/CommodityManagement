import Express from "express";
import session from "express-session";
// 路由
import { index, product, user, permission } from "./routes";

let app = new Express();
app.use(Express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24
    },
    rolling: true
}));


app.use('/', index);
app.use('/product', product);
app.use('/user', user);


app.use((req, res, next) => {
    console.log(req.url);
    if(req.url === '/login' || req.url === '/doLogin' || req.url === '/register'){
        next();
    }else {
        if(req.session.userInfo && req.session.userInfo.userName !== ''){
            next();
        }else {
            res.redirect('/user/login');
        }
    }
});

// 自定义中间件， 判断登陆状态

app.listen(8000, '127.0.0.1');