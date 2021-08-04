const express = require('express');

const app = express()
// CLEARDB_DATABASE_URL:  mysql://b86554bc823349:4ab687a5@us-cdbr-east-04.cleardb.com/heroku_fea393667c1f844?reconnect=true
// > mysql -u b86554bc823349 -h us-cdbr-east-04.cleardb.com -p heroku_fea393667c1f844
// mysql password> 4ab687a5

app.get('/:type', function (req, res) {
  const mysql = require('mysql');
  const connection = mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com',
    port: 3306,
    user: 'b86554bc823349',
    password: '4ab687a5',
    database: 'heroku_fea393667c1f844'
  });

  var ret=[];
  connection.connect();
  let setQuery = '' 
  switch (req.params.type) {
    case '1':
      setQuery = 'select * from test_table order by name'
      break;
    case '2':
      setQuery = 'select * from test_table order by amount'
      break;
    case '3':
      setQuery = 'select * from test_table order by price'
      break;
    default:
      res.status(404).send('error');
      break;
  };
  
  connection.query(setQuery, function (error, row, fields) {
    if (error) {
      console.log(error);
      res.status(500).send('fail ')
    }
    var dat = [];
    for (var i = 0;i < row.length; i++) {
      dat.push({name: row[i].name, amount: row[i].amount, price: row[i].price})
    }
    ret = JSON.stringify(dat);
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.status(200).send(ret)
    // res.status(200).send(row);
  });
  connection.end();
});


module.exports = app;