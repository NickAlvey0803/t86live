var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});


app.engine('handlebars', handlebars.engine);
var session = require('express-session');
var bodyParser = require('body-parser');
app.set('view engine', 'handlebars');
app.set('port', 34901);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

app.get('/',function(req,res,next){
  var context = {};
  var params = [];
  mysql.pool.query('SELECT * FROM users', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('users', context);
  });
});

app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO users (`username`, `password`, `description`, `user_score`) VALUES (?,?,?,?)", 
    [req.query.username, req.query.password, req.query.description, req.query.user_score], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('users-view',context);
  });
});

app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.render('users-view',context);
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
    context.results = "Updated " + result.changedRows + " rows.";
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
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('users-view',context);
      });
    }
  });
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS `users`", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE `users` ("+
    "user_id int(11) NOT NULL AUTO_INCREMENT,"+
    "username varchar(255) NOT NULL,"+
    "password varchar(255) NOT NULL,"+
    "description varchar(255) DEFAULT NULL,"+
    "user_score int(11) DEFAULT NULL,"+
    "PRIMARY KEY (user_id),"+
    "UNIQUE KEY username (username)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('users-view',context);
    })
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
