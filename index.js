
/* โหลด Express มาใช้งาน */
var app = require('express')();
 
/* ใช้ port 7777 หรือจะส่งเข้ามาตอนรัน app ก็ได้ */
var port = process.env.PORT || 7777;

 /* สั่งให้ server ทำการรัน Web Server ด้วย port ที่เรากำหนด แบบแสดง console */
app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});

var bodyParser = require('body-parser');

var testService = require('./Services/testService');

var users = require('./users');

var bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//สั่งให้ server ทำการรัน Web Server ด้วย port ที่เรากำหนด
/*app.listen(port);*/
 
/* Routing */
app.get('/', function (req, res) {
    console.log("Run /");
    res.send('<h1>Hello Node.js</h1>');
});

app.get('/index', function (req, res) {
    console.log("Run /index");
    res.send('<h1>This is index page</h1>');
});

app.get('/user', function (req, res) {
    res.json(testService.findAll());
});
 
app.get('/user/:id', function (req, res) {
    var id = req.params.id;
    res.json(testService.findById(id));
});
 
app.post('/newuser', function (req, res) {
    var json = req.body;
    res.send('Add new ' + json.name + ' Completed!');
});

