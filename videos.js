var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});


app.engine('handlebars', handlebars.engine);
var session = require('express-session');
var bodyParser = require('body-parser');
app.set('view engine', 'handlebars');
app.set('port', 52111);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

app.get('/videos',function(req,res,next){
  var context = {};
  var params = [];
  mysql.pool.query('SELECT * FROM videos', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.parse(JSON.stringify(rows));
    res.render('videos-view', context);
  });
});

app.get('/videos/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO videos (`category`, `weight`, `uploader_weight`, `light_score`, `uid`) VALUES (?,?,?,?,?)", 
    [req.query.category, req.query.weight, req.query.uploader_weight, req.query.light_score, req.query.uid], function(err, result){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query('SELECT * FROM videos', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = JSON.parse(JSON.stringify(rows));
      res.render('videos-view', context);
    });
  });
});

app.get('/videos/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM videos WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query('SELECT * FROM videos', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = JSON.parse(JSON.stringify(rows));
      res.render('videos-view', context);
    });
  });
});


///simple-update?id=2&name=The+Task&done=false&due=2015-12-5
app.get('/simple-update',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE workouts SET name=?, done=?, due=? WHERE id=? ",
    [req.query.name, req.query.done, req.query.due, req.query.id],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.parse(JSON.stringify(rows));
    res.render('users-view',context);
  });
});

///safe-update?id=1&name=The+Task&done=false
app.get('/safe-update',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE workouts SET name=?, done=?, due=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.done || curVals.done, req.query.due || curVals.due, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = JSON.parse(JSON.stringify(rows));
        res.render('users-view',context);
      });
    }
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
