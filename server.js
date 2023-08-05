require('dotenv').config() // this will allow us to use env var throughout the package

const express = require("express");
const app = express();
const {logger} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const path = require("path")
const connectDb = require('./config/dbConn')
const mongoose = require('mongoose')
const {logEvents} = require('./middleware/logger')
const port = process.env.PORT || 8000;

connectDb()

//1. our own created middleware
app.use(logger);

app.use(cors(corsOptions))

console.log(process.env.NODE_ENV)
// 2.express.json() is a method inbuilt in express to receive and parse the JSON data in the request body. This method is called as a middleware in your application using the code:
// inbuilt middleware
app.use(express.json());

// 3.3rd party middleware
app.use(cookieParser())

// no need to use / with folders in path.join
// express.static() is a built-in middleware function in Express. It serves static files and is based on serve-static.
app.use("/", express.static(path.join(__dirname, "public")));
// app.use can be used without '/' as well, it takes the directory address wrt to server file by default
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/users", require("./routes/userRoutes"));

app.all("*", (req, res) => {
    res.status(404);
    // accepts(): accepts is a method of the req object used to determine the best response type the client can accept based on the HTTP "Accept" header. The "Accept" header specifies the media types (content types) the client can handle.
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ error: "404 Not found" });
    } else {
        res.type("txt").send("404 Not found");
    }
});

app.use(errorHandler)



mongoose.connection.once('open',()=>{
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})  // this will run the server only when the connection is open

mongoose.connection.on('error',(err)=>{
    console.log(err);
}) // shouldn't we place this code bloack at th top of the file before the the routes and middlewares are used?