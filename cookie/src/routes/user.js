const { login } = require('../controller/user')

const handleUserRoute = (req, res) => {
  const method = req.method

  if (req.method === 'GET' && req.path === '/api/user/login') {
    const { username, password } = req.query
    const result = login(username, password)
    if (result) {
      res.setHeader('Set-Cookie', `username=${username}; path=/`)
      return {
        errno: 0
      }
    }
    return {
      errno: -1,
      message: '登录失败'
    }
  }

  if (req.method === 'GET' && req.path === '/api/test') {
    if (req.cookie.username) {
      return {
        username: req.cookie.username
      }
    }
    return {
      errno: -1,
      message: '请登录'
    }
  }
}

module.exports = handleUserRoute