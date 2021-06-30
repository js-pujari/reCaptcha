const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const utilityRouter = require('./routers/utility');
const defRouter = require('./routers/Default');
const loginRouter = require('./routers/Login');
const app = express();

const dbUrl = 'mongodb://localhost/JstpDB';

mongoose.connect(dbUrl, { useNewUrlParser: true });
const conn = mongoose.connection;

conn.on('open', () => {
    console.log('MongoDB open');
})


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@aiw.jmngl.mongodb.net/gig?retryWrites=true&w=majority`;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Successfully connetced to DB');
//     })
//     .catch(error => {
//         console.log(error);
//     })
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization");
    next();
});



app.listen(9000, 'localhost', () => {
    console.log('Server started');
})
app.use(express.json())
app.use('/', defRouter);
app.use('/login', loginRouter);
app.use('/utility', utilityRouter);