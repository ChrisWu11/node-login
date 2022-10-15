var express = require("express");
var app = express();

var session = require("express-session");

let bodyParser = require("body-parser")
// 是否进行url解码
app.use(bodyParser.urlencoded({extended:true})) 
 // 将数据转换为json格式
app.use(bodyParser.json())


//配置中间件
app.use(
  session({
    secret: "this is string key", // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
    name: "session_id" /*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/,
    resave: false /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/,
    saveUninitialized: true, //强制将未初始化的 session 存储。  默认值是true  建议设置成true
    cookie: {
      maxAge: 1000 * 30 * 60 /*过期时间*/,
    } /*secure https这样的情况才可以访问cookie*/,

    //设置过期时间比如是30分钟，只要游览页面，30分钟没有操作的话在过期

    rolling: true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
  })
);

app.get("/check", function (req, res) {
  //获取sesssion

  if (req.session.userinfo) {
    /*获取*/
    res.send("你好" + req.session.userinfo + "欢迎回来");
  } else {
    res.send({
      errCode: 10001,
      msg:"未登录"});
  }
});

app.post("/login", function (req, res) {
  console.log(req.body)
  req.session.userinfo = req.body.username;
  res.send("登录成功");
});

app.get("/loginOut", function (req, res) {
  //req.session.cookie.maxAge=0;  /*改变cookie的过期时间*/

  //销毁
  req.session.destroy(function (err) {
    console.log(err);
  });
  res.send("退出登录成功");
});
app.listen(5000);
console.log('服务器已启动')