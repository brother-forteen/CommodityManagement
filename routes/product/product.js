import express from "express";
const router = express.Router();
import dbConnect from "../../modules/db";
import bodyParser from "body-parser";
const ObjectId = require('mongodb').ObjectId;
import multiparty from "multiparty";

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/index', (req, res) => {
    dbConnect.find("product", {}, (err, data) => {
        if(err){
            console.log(data);
        }else {
            res.render('product/index', {title: "商品列表", data});
        }
    });
});

router.get('/add', (req, res) => {
    res.render('product/add');
});

router.post('/doAdd', (req, res) => {
    console.log(req.body);
    let params = {
        "title": req.body.title,
        "price": req.body.price,
        "fee": req.body.fee,
        "picUrl": req.body.picUrl || '',
        "description": req.body.description
    };
    dbConnect.insert('product', params, (err, data) => {
        if(err){
            console.log(err);
        }else {
            res.redirect('/product/index');
        }
    })
});

router.get('/detail/:id', (req, res) => {
    console.log(req.params);

    dbConnect.find('product', {_id: ObjectId(req.params.id)}, (err, data) => {
        if(err){
            console.log(err);
        }else {
            res.render('product/detail', {title: "商品列表", data});
        }
    });
});

router.get('/edit/:id', (req, res) => {
    dbConnect.find('product', {_id: ObjectId(req.params.id)}, (err, data) => {
        if(err){
            console.log(err);
        }else {
            console.log(data);
            res.render('product/edit', {title: "商品列表", data});
        }
    });
});

router.post('/doEdit', (req, res) => {
    console.log(req.params);
    let params = {
        "title": req.body.title,
        "price": req.body.price,
        "fee": req.body.fee,
        "picUrl": req.body.picUrl || '',
        "description": req.body.description
    };
    dbConnect.update('product', {_id: ObjectId(req.body.id)}, params,(err, data) => {
        if(err){
            console.log(err);
        }else {
            res.render('product/edit', {title: "商品列表", data});
        }
    });
});

router.post('/doDelete/:id', (req, res) => {
    dbConnect.delete('product', {_id: ObjectId(req.params.id)}, (req, res) => {
        if(err){
            console.log(err);
        }else {
            res.redirect('product/index', {title: "商品列表", data});
        }
    })
});

module.exports = router;