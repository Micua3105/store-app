const express = require('express');
const cookieParser = require('cookie-parser'); //truy cập và quản lý cookie
const cors = require('cors'); //yêu cầu từ nhiều(domains) khác nhau
require("dotenv").config();


//import in project
const connectDB = require('./config/db');
const router = require('./routes');  //./router/index




const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true // Allow sending cookies from the client
}));
app.use(express.json());
app.use(cookieParser());


app.use('/api', router);


//connect DB
const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Sever app listening at http://localhost:${PORT}`);
  });
})

