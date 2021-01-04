const express = require('express');
const bodyParser=require('body-parser');
const path=require('path');

const api = require('./server/routes/api');

const port = 4000;

const app=express();
 
app.listen(port,function(){
    console.log("Server is listening at port:" + port);
}); 


app.use(bodyParser.urlencoded({extended: true})); //parses the text as url encoded data
app.use(bodyParser.json()); //parses the text as json

app.use(express.static('./public'));

app.use('/api',api);


app.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

app.get('/signup',(req,res) => {
    res.sendFile(path.join(__dirname, '../views/reg.html'));
});

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
}); 