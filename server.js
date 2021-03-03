const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.method, req.url)
  res.end('Hello world')
})

server.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
