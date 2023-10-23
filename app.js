const express = require('express');
const createHttpError = require('http-errors');

const modulesRoute = require('./routes/modules');

const app = express();
app.use(express.json()); // to process JSON in request body

// Q: What is this for?
// A: <Type your answer here>
app.use(express.static('public'));

// Q: What is this for?
// A: <Type your answer here>
app.use('/modules', modulesRoute);

// 404 handler
// Q: What happens if we do not have this middleware?
// A: <Type your answer here>
app.use(function (req, res, next) {
    return next(createHttpError(404, `Unknown Resource ${req.method} ${req.originalUrl}`));
});

// Error handler
// Q: What happens if we do not have this middleware?
// A: <Type your answer here>
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    return res.status(err.status || 500).json({ error: err.message || 'Unknown Server Error!' });
});

// Q: Why must the 404 and error handler be the last middleware?
// A: <Type your answer here>

module.exports = app;
