const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('bodyParser');
const methodOverride = require('method-override');
const redis = require('redis');

// port
const port = 3000;

// initialized app
const app = express();

// view engine
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// method-override
app.user(methodOverride('_method'));

app.get('/', function(req, res, next){
	res.render('searchusers');
});

app.listen(port, function(){
	console.log('Server started on port: '+port);
});