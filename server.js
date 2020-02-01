const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
/*
 * Add middleware. Because we defined the first parameter ( '/api' ), it will run
 * only for urls that starts with '/api/*'
 */
app.use('/api', require('./middlewares/auth.js'));
/*
 * Add the protected route '/hello-world' after '/api'
 * So now it is available on /api/hello-world
 */
app.use('/api', require('./controllers/helloWorld.js')(router));
/*
 * Add the '/login' route handler
 */
app.use('/', require('./controllers/user.js')(router));

module.exports = app;