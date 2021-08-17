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

app.use(express.json())
app.post('/:type', (req, res, next) => {
  // console.log('Request URL:', req.originalUrl);
  const payload = req.body;
  const { User, Password, Host, Priv, Phone } = payload;
  // console.log(`login !!! ${User}, ${Password}, ${Host}, ${Priv}, ${Phone}`)

  console.log(req.params.type)
  var ret=[];
  let setQuery = '' 
  if (req.params.type === 'C' || req.params.type === 'U' ) {
    // Create
    setQuery = `INSERT INTO login (User, Password, Host, Priv, Phone) VALUES ('${User}', '${Password}', '${Host}', ${Priv}, '${Phone}') ON DUPLICATE KEY UPDATE Password = ${Password}, Host = ${Host}, Priv = ${Priv}, Phone = ${Phone}`;
  } else if (req.params.type === 'R' ) {
    // Read
    setQuery = `SELECT count(*) AS isPass FROM login WHERE User = '${User}' AND Password = '${Password}'`;
  } else if (req.params.type === 'D' ) {
    // Delete
    setQuery = `DELETE FROM login WHERE User = '${User}'`;
  } else {
    res.status(404).send('error');
  };
  
  // console.log(`setQuery !!! ${setQuery}`)
  try {
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      connection.query(setQuery, function (error, row, fields) {
        if (error) {
          console.log(error);
          res.status(500).send('fail ')
        }
        var dat = [];
        console.log(row[0].isPass)
        // for (var i = 0;i < row.length; i++) {
        //   dat.push({name: row[i].name, amount: row[i].amount, price: row[i].price})
        // }
        ret = JSON.stringify({result: row[0].isPass});
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