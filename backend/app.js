const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');



const { environment } = require('./config');
//checks to see if the environment is in production or not
const isProduction = environment === 'production';

//Initialize the Express application:
const app = express();





//middleware for logging information about requests and responses
app.use(morgan('dev'));
//parses cookies
app.use(cookieParser());
//parsing JSON bodies of requests with Content-Type of "application/json"
app.use(express.json());


// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );


// Connect all the routes
app.use(routes);


module.exports = app;
