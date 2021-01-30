const express = require('express');
const bodyParser=require('body-parser');
const path=require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const loginUser = require('./server/models/loginSchema');
const api = require('./server/routes/api');

const port = 4000;

const app=express();
 
app.listen(port,function(){
    console.log("Server is listening at port:" + port);
}); 


app.use(bodyParser.urlencoded({extended: true})); //parses the text as url encoded data
app.use(bodyParser.json()); //parses the text as json

app.set('view engine', 'ejs'); //setup to make express find .ejs files

app.use(express.static(__dirname + '/public'));
// app.use(express.static('./public'));

app.use(require('express-session')({
	secret: 'E-Comm Project',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(loginUser.authenticate()));
// passport.use(loginUser.createStrategy());
passport.serializeUser(loginUser.serializeUser());
passport.deserializeUser(loginUser.deserializeUser());

app.use((req, res, next) => {
	// console.log(req.user);
	res.locals.currentUser = req.user;
	next();
});

app.get('/',(req,res) => {
	res.render('index');
});

app.get('/user', (req, res) => {
	res.render('user');
})

app.use('/api',api);

app.get('/login',(req,res) => {
	res.render('login');
});

app.get('/signup',(req,res) => {
	res.render('reg');
});

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

// app.get('/user', (req, res) => {
// 	res.render('user', {username: req.user});
// });

app.get('*',(req,res) => {
	res.send("You're in unchartered territory!");
}); 