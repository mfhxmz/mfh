1. 爆品推荐的接口： 标题 介绍 图片地址 点击数量
/api/product/hot/?limitTo=10?startFrom=0
orderByCreateDate(desc)
id title intro imgUrl likeNum
200 + Array
500

2. 新品推荐的接口：同上
/api/product/new/?limitTo=10?startFrom=0
id title intro imgUrl likeNum
200 + Array
500

3. 活动咨询接口：标题 介绍 图片地址 折扣
/api/activity/?limitTo=10?startFrom=0
id title intro imgUrl discount
200 + Array
500

3. banner的接口（含有每个页面的单独列表）：图片链接
/api/banner/
{
home: [{imgUrl,link}],
hot:[],
new:[],
activity:[]
}

4. 登录接口
POST /api/user/login
GET /api/user/logout
{
username:
password:
}
success: 200 + {coin, username, nickname}
failed: 401
error: 500

4. 短信验证码接口（注册、重置密码）
POST /api/sms/
{username:}
200
500

5. 注册接口
POST /api/user/register
{
username:
password:
smsCode:
}
200
500

6. 点击接口
PUT /api/product/like
{
pid:
}
200
500

7. app下载地址的接口：android app 二维码地址
GET /api/app-download/url
{
ios:
android:
}


GET /api/app-download/qrcode
{
imgUrl:
}



8. footer二维码地址
GET /api/app/qrcode
{
imgUrl:
}

8. 分享按钮链接
GET /api/share-link
{
wechat:
weibo:
}


8. 品牌列表接口：图片地址，网站（可能存在）
GET /api/brand/
[{
imgUrl:
link
}]
