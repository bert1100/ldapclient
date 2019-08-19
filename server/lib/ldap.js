const LdapClient = require("ldapjs-client");

const client = new LdapClient({
    url: 'ldaps://168.1.2.15:10636', //改为 ldap sever 的url
    tlsOptions: {
        // 不强制校验ssl证书
        rejectUnauthorized: false
    }
});
const base = 'ou=people,dc=chsi,dc=com,dc=cn';


// 验证登录并修改密码
const loginAndchangePWD = async function (user, pwd, newpwd) {
    let dn = 'uid=' + user + ',' + base;

    // step1.先验证登录： 在async中使用await来确保顺序，try/catch来处理回调，这样可避免『地狱回调』，注：await后面函数返回的可是promise对象。
    try {
        await client.bind(dn, pwd);
    } catch (error) {
        //  console.table(error);
        await closeldap(); // 正确密码为什么会走这个报错呢？
        return Promise.reject(`身份验证失败！LDAP错误代码：${error.code}`)
    }
    
    // step2. 修改密码： 
    try {
        let change = {
            operation: 'replace',
            modification: {
                "userPassword": newpwd
            }
        };
        await client.modify(dn, change);
    } catch (error) {
        let error_msg = error.code === 19 ? `修改密码失败！请设置一个未使用过的新密码` : `修改密码失败！LDAP错误代码：${error.code}`;
         await closeldap();
         return Promise.reject(error_msg);
    } 

    await closeldap();

};

//关闭ldap连接
const closeldap = async () => {
        try {
            await client.unbind();
            // console.log("LDAP连接已关闭");
        } catch (e) {
            // console.log(e);
        }
    }


// 调用测试
// loginAndchangePWD('weij', 'bert789', '007788')
// .then(res =>{
//     console.log('正确执行');
    
// })
// .catch(error =>{
//     console.log('发生了错误:', error);
    
// })
// .finally(()=>{
//     closeldap();
// });

module.exports = {
    changePWD: loginAndchangePWD,
    close: closeldap
}