const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

//Tehty 4.5
const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})