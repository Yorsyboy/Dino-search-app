const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static(__dirname + '/images'));

const routes = require('./routes/routes.js')(app, fs);

const server = app.listen(4000, () => {
    console.log('listening on port %s...', server.address().port);
});