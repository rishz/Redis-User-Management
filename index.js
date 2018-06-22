const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

// create redis client
const client = redis.createClient();
client.on('connect', function () {
  console.log('Connected to Redis')
});

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
app.use(methodOverride('_method'));

// search page
app.get('/', (req, res, next) => {
  res.render('searchusers');
});

// search processing
app.post('/user/search', (req, res, next) => {
  let id = req.body.id;

  client.hgetall(id, function (err, obj) {
    if(!obj){
      res.render('searchusers', {
        error: 'User does not exist'
      });
    }else{
      obj.id = id;
      res.render('details', {
        user: obj
      });
    }
  });
});

app.listen(port, function () {
  console.log('Server started on port: ' + port);
});