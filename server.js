/*
 * application's server side starting point (main).
 */

/** server config file. */
const config = require('./server/server.json');

/** https://expressjs.com/
  express is a minimal and flexible Node.js web application framework that provides a
  robust set of features for web and mobile applications.
*/
const express = require('express');

/** https://nodejs.org/api/path.html
  the path module provides utilities for working with file and directory paths.
*/
const path = require('path');

/** https://nodejs.org/api/http.html
  the http interfaces in Node.js are designed to support many features of the protocol
  which have been traditionally difficult to use.
*/
const http = require('http');

/** https://www.npmjs.com/package/body-parser
  Node.js body parsing middleware. parse incoming request bodies in a middleware before
  your handlers, available under the req.body property.
*/
const bodyParser = require('body-parser');

/** custom-made logger module. use logger.log(...) */
const logger = require('./server/util/logger');

/** custom-made database connection module. */
const db = require('./server/model/db');

/** custom-made router module. */
const router = require('./server/controller/router');

/** express.js application. */
const app = express();

/** port number for application, retrieved from environment. defaults to 8080. */
const port = process.env.PORT || config.DEFAULT_APPLICATION_PORT;

/* tells the application to use JSON. */
app.use(bodyParser.json());

/* tells the application to use simple algorithm for shallow parsing.
  set to 'extended: true' to enable complex algorithm for deep parsing
  that can deal with nested objects. */
app.use(bodyParser.urlencoded({extended: config.DEEP_PARSING}));

/* point static path to build folder. */
app.use(express.static(path.join(__dirname, 'public')));

/* setup api's routes in application. */
app.use('/api', router);

/* return index file when other routes are requested. */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

/* set application's port. */
app.set('port', port);

/** http server. */
const server = http.createServer(app);

/* listen on provided port, on all network interfaces.
    connect to database. */
server.listen(port, () => {
    logger.log(true, 'server.js:server.listen', `localhost:${port}`);
    db.connect();
});