const querystring = require('querystring')
const handleUserRoute = require('./src/routes/user')

const serverHandler = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const url = req.url
  req.path = url.split('?')[0]
  req.query = querystring.parse(url.split('?')[1])

  // 解析 cookie
  // username=zhangsan
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  const key = cookieStr.split('=')[0]
  const val = cookieStr.split('=')[1]
  req.cookie[key] = val
  
  const userResult = handleUserRoute(req, res)

  if (userResult) {
    res.end(
      JSON.stringify(userResult)
    )
    return
  }
}

module.exports = serverHandler