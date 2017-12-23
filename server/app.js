var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = require('./config/db')
var shortid = require('shortid');
var cors = require('cors');

var app = express();

app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.post('/login', function (req, res) {
  console.log('-----login');
  db.user_model.findOne({username: req.body.username, password: req.body.password}, function(err, data) {
    if (err || data == null) {
      console.log(err);
      res.json({message: "error"})
    }else{
      console.log(data);
      data.guess_count = 3;
      data.save();
      res.json({code : data._id});
    }
  })
});

app.post('/guess', function (req, res) {
  console.log('-----guess');
  console.log(req.body);
  db.user_model.findOne({_id: req.body.code}, function(err, data) {
    if (err || data == null) {
      console.log(err);
      res.json({message: "error"})
    }
      if (data.guess_count <= 0) {
        res.json({message : "max guess limit reached"});
      }else{
        
        console.log(req.body.uniqueId,data.unique_id);
        if (parseInt(req.body.uniqueId) == data.unique_id) {
          data.save();
          res.json({
            status: true, 
            message : "success"
          })
        }else{
          data.guess_count -= 1;
          data.save();
          res.json({ count: data.guess_count})
        } 
      }
  })
});


app.post('/guess/count', function (req, res) {
  console.log('-----guess/count');
  console.log(req.body);
  db.user_model.findOne({_id: req.body.code}, function(err, data) {
    if (err || data == null) {
      console.log(err);
      res.json({message: "error"})
    }
    else {
      if(data.guess_count === 0) {
        res.json({ code : data.guess_count })
      }
      res.json({ code : data.guess_count });
    }
  })
});

app.post('/guess/reset', function (req, res) {
  console.log('-----guess');
  console.log(req.body);
  db.user_model.findOne({_id: req.body.code}, function(err, data) {
    if (err || data == null) {
      console.log(err);
      res.json({message: "error"})
    }else{
      console.log(data);
      data.guess_count = 3;
      data.save();
      res.json({message: "done"})
    }
  })
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
