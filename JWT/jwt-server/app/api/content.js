const Router = require('@koa/router')
const Auth = require('../../middlewares/auth')

const contentRouter = new Router({
  // 设置路由前缀 /content
  prefix: '/content'
})

// 获取文章内容接口
contentRouter.get('/', async ctx => {
  ctx.body = '获取文章内容成功'
})

// 新增文章内容接口
contentRouter.post('/', new Auth(1).middleware, async ctx => {
  ctx.body = '新增文章内容成功'
})

module.exports = contentRouter