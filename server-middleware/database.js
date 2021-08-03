const express = require('express');

const app = express()
const mysql = require('mysql');

// CLEARDB_DATABASE_URL:  mysql://b86554bc823349:4ab687a5@us-cdbr-east-04.cleardb.com/heroku_fea393667c1f844?reconnect=true
// > mysql -u b86554bc823349 -h us-cdbr-east-04.cleardb.com -p heroku_fea393667c1f844
// mysql password> 4ab687a5
const connection = mysql.createConnection({
  host: 'us-cdbr-east-04.cleardb.com',
  port: 3306,
  user: 'b86554bc823349',
  password: '4ab687a5',
  database: 'heroku_fea393667c1f844'
});

connection.connect(function (err) {
  if (err) {
    console.error('mysql connection error');
    console.error(err);
    throw err;
  }
});

app.get('/:type', function (req, res) {
  const payload = req.body
  const { type } = payload;
  let setQuery = '';
  switch (type) {
    case '1':
      setQuery = 'select * from test_table';
      break;
    // case '2':
    //   setQuery = 'select * from test_table group by timestamp';
    //   break;
    // case '3':
    //   setQuery = 'select * from test_table group by timestamp';
    //   break;
    default:
      res.status(404).send('error');
      break;
  }
  const query = connection.query(
    setQuery,
    function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send('fail ')
      }
      res.status(200).send(result);
    }
  )
});

module.exports = app;