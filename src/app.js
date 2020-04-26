const path = require('path')
const http = require('http')
const express = require('express')

const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')

console.log(publicDirectoryPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

server.listen(port, () => {
	console.log('Server is up on port ' + port + '.')
})
