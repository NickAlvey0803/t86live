var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_zimmerml',
  password        : '9549',
  database        : 'cs340_zimmerml'
});

module.exports.pool = pool;
