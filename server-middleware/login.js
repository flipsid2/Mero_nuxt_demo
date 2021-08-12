const express = require('express');
const app     = express()
const mysql   = require('mysql');

let pool = mysql.createPool({
  connectionLimit: 50,  // 접속자수 50
  host: 'us-cdbr-east-04.cleardb.com',
  port: 3306,
  user: 'b86554bc823349',
  password: '4ab687a5',
  database: 'heroku_fea393667c1f844',
  multipleStatements: true
});


app.get('/:type', function (req, res) {
  const payload = req.query
  const { User, Password, Host, Priv, Phone } = payload;
  console.log(`login !!! ${User}, ${Password}, ${Host} ${Priv}, ${Phone}`)

  var ret=[];
  let setQuery = '' 
  switch (req.params.type) {
    case 'C':
    case 'U':
      // Create
      setQuery = `INSERT INTO login (User, Password, Host, Priv, Phone) VALUES (${User}, ${Password}, ${Host}, ${Priv}, ${Phone}) ON DUPLICATE KEY UPDATE Password = ${Password}, Host = ${Host}, Priv = ${Priv}, Phone = ${Phone}`
      break;
    case 'R':
      // Read
      setQuery = `SELECT count(*) FROM login WHERE User = ${User} AND Password = ${Password}`
      break;
    case 'D':
      // Delete
      setQuery = `DELETE FROM login WHERE User = ${User}`
      break;
    default:
      res.status(404).send('error');
      break;
  };
  
  try {
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
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
      });
      connection.release()
    });
  } catch (err) {
    console.log(err);
  }
});


module.exports = app;