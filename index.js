var app = require('./server.js')
var config = require('./config.js')

/*
 * Start server
 */
app.listen(config.PORT, () => {
  console.log(`Server up! on ${config.PORT}`)
})
