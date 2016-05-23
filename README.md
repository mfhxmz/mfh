## 产品部署

1. 切换到项目根目录：cd [projectRoot]
1. 安装依赖：npm install
1. 启动数据库连接：mongod --dbpath data --auth
1. 开始：grunt prod
1. 重启：grunt forever:server:restart
1. 关闭：grunt forever:server:stop

## 开发服务器安装

请参考 [MEANJS安装部署教程](https://github.com/mfhxmz/mfh/blob/master/MEANJS-README.md)

注意：

1. MongoDB 请安装 3.x 版本
1. Node.js 请安装 4.x 版本
1. Python 请安装 2.7
1. NPM 或者 GEM 源被墙或者太慢的状况，请更换国内镜像源（淘宝镜像等）

## 关于 MongoDB

具体方法：

1. 在项目根目录新建一个`data`文件夹
1. 在项目根目录运行指令`mongod --dbpath data`
1. 保持该终端的运行状态，开始部署项目吧


