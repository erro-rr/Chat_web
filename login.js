const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static('assets'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat_application'
});

connection.connect(function (err) {
    if (err) throw err
    else console.log('Connected! to the database')
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/',encoder,function (req, res) {
    var password = req.body.password;
    connection.query("select * from logininfo where PASSWORD=?",[password],function(err,rows,fields){
        if(rows.length>0){
            res.redirect('/chatpage');
        }
        else{
            res.write('<script>alert("Invalid Password"); window.location.href = "/";</script>');
        }
        res.end();
    });
});

app.get('/chatpage', function (req, res) {
    res.sendFile(__dirname + '/chatpage.html');
});

app.listen(4500);