const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')
const api = require('./routes/api')


const app = express();



// MIDDLEWARE
app.use(cors({
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    origin: 'http://localhost:3000',
}));


// LOGGING MIDDLEWARE
app.use(morgan('dev'));

// PARSING DATA
app.use(express.json());

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, '..', 'public')));

// ROUTES
app.use("/v1", api)

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});



module.exports = app;