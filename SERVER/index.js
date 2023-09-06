require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('../SERVER/middlewares/logger.js');
const authenticationRoutes = require('./routes/AuthenticationRoutes.js')

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(logger);

mongoose.connect("mongodb://127.0.0.1:27017/employee");

// Use the authenticationRoutes middleware
app.use('/', authenticationRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
