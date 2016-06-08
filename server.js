var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/Views'));
app.use(express.static(__dirname + '/'));

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var userService = require('./Services/userservice');
app.get('/index', function (req, res) {
    console.log("Run /index");
    res.send('<h1>This is index page</h1>');
});

app.get('/users', function (req, res) {
    res.json(userService.findAll());
});

app.post('/userserver', function (req, res) {
    var data = userService.gets(req.query);
    res.json(data);
});

app.get('/userserver', function (req, res) {
    console.log(req);
    var data = userService.gets(req.query);
    res.json(data);
});

app.get('/user/:id', function (req, res) {
    var id = req.params.id;
    res.json(userService.findById(id));
});

app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
});

app.delete('/users/:id', function (req, res) {
    res.send('Got a DELETE request at /user');
});

app.post('/create', function (req, res) {
    var data = userService.create(req.body);
    res.json(data);
});

app.post('/edit', function (req, res) {
    var data = userService.edit(req.body);
    res.json(data);
});

var server = app.listen(7777, function () {
    var port = server.address().port;
    console.log('Example app listening at port %s', port);
});

module.exports = server;