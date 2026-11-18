const express  = require("express");
const healthRoute = require("./routes/healthroutes.js")
const errorHandler = require("./middlewares/errorHandler.js")
const app = express();

app.use(express.json()) // for parse json data


//routes
app.use('/api' , healthRoute)



// Handle unknown routes
app.use((req, res, next) => {
  const error = new Error("Route not found");

  error.statusCode = 404;
  error.code = "NOT_FOUND";

  next(error);
});

// error handler middleware
app.use(errorHandler)


module.exports = app