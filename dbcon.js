var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_alveyn',
  password        : '8904',
  database        : 'cs290_alveyn'
});

module.exports.pool = pool;