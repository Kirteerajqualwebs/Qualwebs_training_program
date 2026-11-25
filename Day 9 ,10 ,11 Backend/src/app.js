const express  = require("express");
const healthRoute = require("./routes/healthroutes.js")
const errorHandler = require("./middlewares/errorHandler.js")
const authRoute = require("./routes/authRoutes.js")
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();
app.use(express.static("public"))
app.use(express.json()) // for parse json data


//routes
app.use('/api' , healthRoute)
app.use('/api/auth',authRoute )
app.use("/api", protectedRoutes);

// Handle unknown routes
// app.use((req, res, next) => {
//   const error = new Error("Route not found");

//   error.statusCode = 404;
//   error.code = "NOT_FOUND";

//   next(error);
// });

// error handler middleware
app.use(errorHandler)


module.exports = app