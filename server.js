const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./configs/db");

// env config
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use('/api/v1/user',require("./routes/userRoutes"));

const port = process.env.PORT || 8080;
// listen port
app.listen(port, () => {
    console.log(`Server running on port ${port} Mode is ${process.env.NODE_MODE}`.yellow.bold);
})