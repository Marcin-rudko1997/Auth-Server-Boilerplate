//Main application
const express = require('express');
const morgan = require('morgan');
//const http = require('http');
const bodyParser = require('body-parser');
const router = require('./router.js');
const mongoose = require('mongoose');

//DB Setup
mongoose.connect('mongodb://localhost:27017/auth', {useNewUrlParser: true});

const app = express();

//App Setup

app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);


//Server Setup
const port = process.env.PORT || 3090;
//const server = http.createServer(app);
app.listen(port);
console.log('Server listening on port:', port);

