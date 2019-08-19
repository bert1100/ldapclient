'use strict';
// 后台api，建议使用pm2守护进程

const express = require('express');
const server = express();

const ldap = require('./lib/ldap');

// 不再使用 中间件body-parser 
server.use(express.urlencoded({extended: true}));



server.post('/changepwd', (req, res) => {
    let user = req.body.username;
    let pwd = req.body.password;
    let newpwd = req.body.newpassword;
    let repwd = req.body.repassword;

    res.setHeader('Access-Control-Allow-Origin', '*');

    if (newpwd && newpwd === repwd) {
        // console.log(user, pwd, newpwd)
        ldap.changePWD(user, pwd, newpwd)
            .then(function (params) {
                res.json({
                    "code": 0,
                    "msg": '密码修改成功！'
                })
            })
            .catch(function (err) {
                res.json({
                    "code": 1000,
                    "msg": err
                })
            })
            .finally(()=>{
                ldap.close();
            })
    }else{
        res.json({
            "code":1000,
            "msg": '两次设置的新密码不一致'
        })
    }


});

server.listen(3000,()=>{
    console.log('running on port 3000...')
});