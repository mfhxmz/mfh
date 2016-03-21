## 部署准备

请参考 [MEANJS安装部署教程](https://github.com/mfhxmz/mfh/blob/master/MEANJS-README.md)

注意：

1. MongoDB 请安装 3.x 版本
1. Node.js 请安装 4.x 版本
1. Python 请安装 2.7
1. NPM 或者 GEM 源被墙或者太慢的状况，请更换国内镜像源（淘宝镜像等）

## 关于MongoDB

根据讨论结果，虽然本次项目无需本地数据库，但是，为了将来可能会出现的需求变更或发展着想，保留数据持久层和数据库连接是有必要的。

项目部署准备工作结束后，需要开启一个闲置的MongoDB连接，才能正式开始部署。

具体方法：

1. 在项目根目录新建一个`data`文件夹
1. 在项目根目录运行指令`mongod --dbpath data`
1. 保持该终端的运行状态，开始部署项目吧
