# LDAP client 修改密码
使用 vue版的 Material Design 风格 `muse-ui`  和 `ldapjs-client` 来搭建一个用户自助修改LDAP
密码的APP。

> 注：此项目为临时项目，后续将把配置信息单独提取到 xx.config.js 中。

## 前提条件
1. 已搭建好一台 LDAP server `ldaps://168.1.2.15:10636`；
2. LDAP server 接口策略开启 `modify`。


## 开始使用

### client
用户修改LDAP密码的前台界面

- 开发预览： `npm run serve`
- 构建部署： `npm run build`
- 启动部署： `npm run production`

启动部署后访问：http://localhost:8000

### server
提供API服务的后端接口（http://localhost:3000）

启动： `npm run start`
