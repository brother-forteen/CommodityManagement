import express from "express";
const router = express.Router();

const product = require('./product/product');
const user = require('./user/user');
const index = require('./index/index');

// 权限判断

export {index, product, user};