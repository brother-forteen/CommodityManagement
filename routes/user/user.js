import express from "express";
import dbConnect from "../../modules/db";
import bodyParser from "body-parser";
const md5 = require("md5-node");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/doLogin', (req, res) => {
    let userName = req.body.userName;
    let password = md5(req.body.password);
    let loginInfo = {
        userName,
        password
    };

    dbConnect.find("user", loginInfo, function (err, data) {
        if(err){
            console.log(err);
        }else {
            if(data.length > 0){
                // 保存用户信息
                req.session.userInfo = data[0];
                req.app.locals['userInfo'] = data[0];
                res.redirect('/product/index');
            }else {
                res.send("<script>alert('登陆失败');location.href='/user/login';</script>")
            }
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err);
        }else {
            res.redirect('/user/login');
        }
    })
});

router.get('/personal', (req, res) => {
    res.render('user/personal');
});

module.exports = router;

