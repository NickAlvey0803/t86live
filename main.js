// This is the main javascript file for the backend database management for team 86

// The header sets up the ports and pulls the correct files for running through Node.js

var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});


app.engine('handlebars', handlebars.engine);
var session = require('express-session');
var bodyParser = require('body-parser');
app.set('view engine', 'handlebars');
app.set('port', 52115);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))


// Users

app.get('/users',function(req,res,next){
  var context = {};
  var params = [];
  mysql.pool.query('SELECT * FROM users', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.parse(JSON.stringify(rows));
    res.render('users-view', context);
  });
});

app.get('/users/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO users (`username`, `password`, `description`, `user_score`) VALUES (?,?,?,?);", 
    [req.query.username, req.query.password, req.query.description, req.query.user_score], function(err, result){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query('SELECT * FROM users', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = JSON.parse(JSON.stringify(rows));
      //res.render('users-view', context);
      res.redirect('/users');
    });
  });
  console.log("Insert user request attempted");
});

app.get('/users/delete',function(req,res,next){
  var context = {};
  console.log("Delete user request attempted");
  console.log(req.query.user_id);
  mysql.pool.query("DELETE FROM users WHERE username = ?", [req.query.user_id], function(err, result){

//DELETE * FROM users JOIN comments ON comments.uid = users.user_id JOIN videos ON videos.uid = users.user_id WHERE username = ?
    if(err){
      next(err);
      return;
    }
    mysql.pool.query('SELECT * FROM users', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = JSON.parse(JSON.stringify(rows));
      // res.render('users-view', context);
      res.redirect('/users');
    });
  });
});

app.get('/users/edit',function(req,res,next){
  var context = {};
  console.log("Edit user request attempted");
  console.log(req.query.user_id_edit);
  mysql.pool.query("UPDATE users SET password=?, description=?, user_score=? WHERE username=?",
    [req.query.password_edit, req.query.description_edit, req.query.user_score_edit, req.query.user_id_edit],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query('SELECT * FROM users', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
	    context.results = JSON.parse(JSON.stringify(rows));
	    res.redirect('/users');
	});
  });
});


// Videos

function query(sqlQuery) {
	return new Promise(function (resolve,reject) {
		mysql.pool.query(sqlQuery, function(err, result) {
			if(err)
			{
				reject(err);
			}
			else
			{
				resolve(result);
			}
		});
	});
}

app.get('/videos',function(req,res,next){
	var context = {};
	var params = [];
	var query_rows;
	var query_rows2;
	mysql.pool.query('SELECT (SELECT username FROM users WHERE users.user_id = videos.uid) AS username,title,video_description,category,weight,uploader_weight,AVG(comments.light_score) AS aveg FROM videos LEFT JOIN comments ON comments.vid = videos.video_id GROUP BY videos.video_id', function(err, rows, fields){
		if(err){
		next(err);
		return;
		}
		context.table = JSON.parse(JSON.stringify(rows));
mysql.pool.query('SELECT user_id, username FROM users', function(err, rows2, fields){
				if(err){
				next(err);
				return;
				}
				context.users = JSON.parse(JSON.stringify(rows2));
				context.not_search = 1;
				res.render('videos-view', context);
		});
	});
});

  /*
	*/

  /*
   *
  var query1 = query('SELECT (SELECT username FROM users WHERE users.user_id = videos.uid) AS username,title,video_description,category,weight,uploader_weight,AVG(comments.light_score) AS aveg FROM videos LEFT JOIN comments ON comments.vid = videos.video_id GROUP BY videos.video_id');
  var query2 = query("SELECT username,user_id FROM users");
  Promise.all(query1,query2).then(function(result) {
	  context.table = query1;
	  context.users = query2;
	  res.render('videos-view',context);
});
   * */
app.get('/videos/search',function(req,res,next){
	var context = {};
	var params = [];
	var query_rows;
	mysql.pool.query('SELECT (SELECT username FROM users WHERE users.user_id = videos.uid) AS username,title,video_description,category,weight,uploader_weight,AVG(comments.light_score) AS aveg FROM videos LEFT JOIN comments ON comments.vid = videos.video_id JOIN users ON users.user_id = videos.uid WHERE users.username = ? GROUP BY videos.video_id', [req.query.search], function(err,rows,fields){
	if(err){
		next(err);
		return;
	}
	query_rows = JSON.parse(JSON.stringify(rows));
	context.table = query_rows;
	res.render('videos-view',context);
	});
});

app.get('/videos/insert',function(req,res,next){
  var context = {};

  console.log("Insert video request attempted:");
  console.log(req.query.uid);

  mysql.pool.query("INSERT INTO videos (`uid`, `title`, `video_description`, `category`, `weight`, `uploader_weight`, `light_score`) VALUES (?,?,?,?,?,?,?);", 
    [req.query.uid, req.query.title, req.query.video_description, req.query.category, req.query.weight, req.query.uploader_weight, req.query.light_score], function(err, result){
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
      //res.render('videos-view', context);
      res.redirect('/videos');
    });
  });
});

app.get('/videos/delete',function(req,res,next){
  var context = {};
  console.log("Delete video request attempted");
  console.log(req.query.video_id);
  mysql.pool.query("DELETE FROM videos WHERE title=?", [req.query.video_id], function(err, result){
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
      // res.render('videos-view', context);
      res.redirect('/videos');
    });
  });
});

app.get('/videos/edit',function(req,res,next){
  var context = {};
  console.log("Edit video request attempted");
  console.log(req.query.video_id_edit);
  mysql.pool.query("UPDATE videos SET video_description=?, category=?, weight=?, uploader_weight=?, light_score=? WHERE title=?",
    [req.query.video_description_edit, req.query.category_edit, req.query.weight_edit, req.query.uploader_weight_edit, req.query.light_score_edit, req.query.video_id_edit],
    function(err, result){
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
	    res.redirect('/videos');
	});
  });
});


// Competitions



app.get('/competitions',function(req,res,next){
  var context = {};
  var params = [];
  mysql.pool.query('SELECT * FROM competitions', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.parse(JSON.stringify(rows));
    res.render('competitions-view', context);
  });
});

app.get('/competitions/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO competitions (`competition_name`, `lift_type`, `weight_class`, `lift_reps`) VALUES (?,?,?,?);", 
    [req.query.competition_name, req.query.lift_type, req.query.weight_class, req.query.lift_reps], function(err, result){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query('SELECT * FROM competitions', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = JSON.parse(JSON.stringify(rows));
      //res.render('competitions-view', context);
      res.redirect("/competitions");

    });

  });
  console.log("Insert competitions request attempted");
});

app.get('/competitions/delete',function(req,res,next){
  var context = {};
  console.log("Delete competitions request attempted");
  console.log(req.query.competition_id);
  mysql.pool.query("DELETE FROM competitions WHERE competition_name=?", [req.query.competition_id], function(err, result){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query('SELECT * FROM competitions', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = JSON.parse(JSON.stringify(rows));
      // res.render('competitions-view', context);
      res.redirect('/competitions');
    });
  });
});

app.get('/competitions/edit',function(req,res,next){
  var context = {};
  console.log("Edit competition request attempted");
  console.log(req.query.competition_id_edit);
  mysql.pool.query("UPDATE competitions SET lift_type=?, weight_class=?, lift_reps=? WHERE competition_name=?",
    [req.query.lift_type_edit, req.query.weight_class_edit, req.query.lift_reps_edit, req.query.competition_id_edit],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query('SELECT * FROM competitions', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
	    context.results = JSON.parse(JSON.stringify(rows));
	    res.redirect('/competitions');
	});
  });
});


// Comments



app.get('/comments',function(req,res,next){
  var context = {};
  var params = [];
  mysql.pool.query('SELECT comments.light_score, comments.description, users.username, videos.title FROM comments INNER JOIN users ON users.user_id = comments.uid INNER JOIN videos ON videos.video_id = comments.vid', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.parse(JSON.stringify(rows));
    mysql.pool.query('SELECT title FROM videos', function(err,rows,fields){
	    if(err){
		next(err);
		return;
	    }
	    context.vids = JSON.parse(JSON.stringify(rows));
	    mysql.pool.query('SELECT username FROM users', function(err,rows,fields){
		    if(err){
			    next(err);
			    return;
		    }
		    context.users = JSON.parse(JSON.stringify(rows));
		    res.render('comments-view', context);
	    });
    });
  });
});

app.get('/comments/insert',function(req,res,next){
  var context = {};
  console.log("Insert comments request attempted");
  console.log(req.query.light_score);
  mysql.pool.query("INSERT INTO comments (`uid`, `vid`, `description`, `light_score`) VALUES ((SELECT user_id AS uid FROM users WHERE username = ?),(SELECT video_id AS vid FROM videos WHERE title = ?),?,?);", 
    [req.query.uid, req.query.vid, req.query.description, req.query.light_score], function(err, result){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query('SELECT * FROM comments', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = JSON.parse(JSON.stringify(rows));
      //res.render('comments-view', context);
      res.redirect('/comments');
    });
  });
});

app.get('/comments/delete',function(req,res,next){
  var context = {};
  console.log("Delete comments request attempted");
  console.log(req.query.comment_uid);
  console.log(req.query.comment_vid);
  mysql.pool.query("DELETE FROM comments WHERE uid=? AND vid=?", [req.query.comment_uid, req.query.comment_vid], function(err, result){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query('SELECT * FROM comments', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = JSON.parse(JSON.stringify(rows));
      // res.render('comments-view', context);
      res.redirect('/comments');
    });
  });
});

app.get('/comments/edit',function(req,res,next){
  var context = {};
  console.log("Edit comments request attempted");
  console.log(req.query.comment_uid_edit);
  console.log(req.query.comment_vid_edit);
  mysql.pool.query("UPDATE competitions SET description=?, light_score=?, WHERE uid=? AND vid=?",
    [req.query.description_edit, req.query.light_score_edit, req.query.comment_uid_edit, req.query.comment_vid_edit],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query('SELECT * FROM comments', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
	    context.results = JSON.parse(JSON.stringify(rows));
	    res.redirect('/comments');
	});
  });
});


// Videos_Competitions



app.get('/videos_competitions',function(req,res,next){
  var context = {};
  var params = [];
  mysql.pool.query('SELECT * FROM videos_competitions', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.parse(JSON.stringify(rows));
    mysql.pool.query('SELECT * FROM videos',function(err,rows,fields)
    {
	    if(err){
		next(err);
		return;
	    }
	    context.videos = JSON.parse(JSON.stringify(rows));
	    mysql.pool.query('SELECT * FROM competitions',function(err,rows,fields)
	    {
		    if(err){
			    next(err);
			    return;
		    }
		    context.competitions = JSON.parse(JSON.stringify(rows));
		    res.render('videos_competitions-view', context);
	    });
    });
  });
});

app.get('/videos_competitions/insert',function(req,res,next){
  var context = {};
  console.log('---');
  console.log(req.query.cid);
  console.log(req.query.vid);
  console.log('---');
  mysql.pool.query("INSERT INTO videos_competitions (`vid`, `cid`) VALUES (?,?)", 
    [req.query.vid, req.query.cid], function(err, result){
    if(err){
      next(err);
      return;
    }
	res.redirect("/videos_competitions");
  });
});

app.get('/videos_competitions/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM videos_competitions WHERE vid=? AND cid=?", [req.query.videos_competitions_vid, req.query.videos_competitions_cid], function(err, result){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query('SELECT * FROM videos_competitions', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = JSON.parse(JSON.stringify(rows));
      // res.render('videos_competitions-view', context);
      res.redirect('/videos_competitions');
    });
  });
});



///simple-update?id=2&name=The+Task&done=false&due=2015-12-5
// app.get('/simple-update',function(req,res,next){
//   var context = {};
//   mysql.pool.query("UPDATE workouts SET name=?, done=?, due=? WHERE id=? ",
//     [req.query.name, req.query.done, req.query.due, req.query.id],
//     function(err, result){
//     if(err){
//       next(err);
//       return;
//     }
//     context.results = JSON.parse(JSON.stringify(rows));
//     res.render('users-view',context);
//   });
// });

///safe-update?id=1&name=The+Task&done=false
app.get('/safe-update',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM users WHERE id=?", [req.query.id], function(err, result){
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

// app.get('/users/reset-table',function(req,res,next){
//   var context = {};
//   mysql.pool.query("DROP TABLE IF EXISTS users", function(err){ //replace your connection pool with the your variable containing the connection pool
//     var createString = "CREATE TABLE users ("+
//     "user_id int(11) NOT NULL AUTO_INCREMENT,"+
//     "username varchar(255) NOT NULL,"+
//     "password varchar(255) NOT NULL,"+
//     "description varchar(255) DEFAULT NULL,"+
//     "user_score int(11) DEFAULT NULL,"+
//     "PRIMARY KEY (user_id),"+
//     "UNIQUE KEY username (username)";
//     mysql.pool.query(createString, function(err){
//       context.results = "Table Reset"
//       res.render('home',context);
//     })
//   });
// });

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
