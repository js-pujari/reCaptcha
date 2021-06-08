const express = require('express');
const mongoose = require('mongoose');
const vegRouter = require('./routers/Vegitables');
const defRouter = require('./routers/Default');
const loginRouter = require('./routers/Login');
const app = express();

const dbUrl = 'mongodb://localhost/JstpDB';

mongoose.connect(dbUrl, { useNewUrlParser: true });
const conn = mongoose.connection;


conn.on('open', () => {
    console.log('MongoDB open');
})


app.listen(9000, 'localhost', () => {
    console.log('Server started');
})
app.use(express.json())
app.use('/', defRouter);
app.use('/login', loginRouter);
app.use('/vegitables', vegRouter);