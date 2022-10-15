const http = require('http')
const serverHandler = require('../app')
const PORT = 8000

const server = http.createServer(serverHandler)
server.listen(PORT)
console.log('8000')