const express = require('express');

const tipsRouter = require('./tips');
const feedbackRouter = require('./feedback');

const app = express();

app.use('/tips', tipsRouter);
app.use('/feedback', feedbackRouter);

module.exports = app;
