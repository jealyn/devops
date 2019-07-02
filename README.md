# 运维平台前端
-------------------

### 项目准备
-------------------
> npm config set registry https://registry.npm.taobao.org （npm更换淘宝源）<br>

### QUICK START
-------------------
> npm install <br>
> npm start（开发环境，如需登录请配host，127.0.0.1，然后url+端口访问）<br>
> npm run build（生产环境打包）<br>
> npm run pre（预发布环境打包）<br>
> npm run test（测试环境打包）<br>
> npm run lint （eslint修正代码）

### 注意事项
-------------------
> 安装新版本包需要指定版本号，例如：npm install element-ui@2.0.3 --save<br>
> 删除包不能直接删除package.json的内容，要使用npm uninstall element-ui --save<br>
> 建议提交代码之前运行npm run lint

### 技术说明
-------------------

##### 技术框架
1. <a href="https://cn.vuejs.org/v2/guide/installation.html" target="_blank">vue.js</a>
2. <a href="https://router.vuejs.org/zh-cn/essentials/getting-started.html" target="_blank">vue-router.js</a>
3. <a href="https://vuex.vuejs.org/zh-cn/" target="_blank">vuex.js</a>
4. <a href="https://webpack.js.org/configuration/" target="_blank">webpack</a>
5. <a href="https://github.com/axios/axios" target="_blank">axios(API请求库)</a>
6. <a href="https://gitlab.xgimi.com/front_end/gimiUtils" target="_blank">gimi-utils(极米工具函数)</a>

##### UI框架
1. <a href="http://element-cn.eleme.io/#/zh-CN/component/changelog" target="_blank">element-ui</a>

### nginx配置
-------------------
``` nginx
server {
    listen 80;
    server_name 域名;
    root dist文件目录地址;
    index index.html index.htm;
    location / {
        try_files $uri /index.html;
    }
    location /apis {
        rewrite  ^/apis/(.*)$ /$1 break;
        proxy_pass  API请求地址;
    }
}
```
注意：所有请求都要以/apis开头，nginx做反向代理。