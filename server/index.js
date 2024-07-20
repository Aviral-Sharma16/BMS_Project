const express = require('express');
const cors = require("cors");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

require("./config/dbConfig");

const userRoute = require("./routes/userRoutes");

app.use(cors());

app.use(bodyParser.json());

app.use(express.json());
app.use("/", userRoute);

app.listen(3000,() =>{
    console.log('Server is running on port 3000')
});