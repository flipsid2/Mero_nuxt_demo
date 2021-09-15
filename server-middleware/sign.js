const express = require('express');
const { isNull } = require('lodash');
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
  const tmpHost = Host ? Host : 'localhost'
  const tmpPriv = Priv ? Priv : '1'
  const tmpPhone = Phone ? Phone : ''
  // console.log(`login !!! ${User}, ${Password}, ${tmpHost}, ${tmpPriv}, ${Phone}`)

  console.log(req.params.type)
  var ret=[];
  let setQuery = '' 
  if (req.params.type === 'C' ) {
    // Check
    setQuery = `SELECT count(*) AS isPass FROM login WHERE User = '${User}' AND Password = '${Password}';`;
  } else if (req.params.type === 'U' ) {
    // Update
    setQuery = `REPLACE INTO login (User, Password, Host, Priv, Phone) VALUES ('${User}', '${Password}', '${tmpHost}', ${tmpPriv}, '${tmpPhone}');`;
  } else if (req.params.type === 'R' ) {
    // Read
    setQuery = `SELECT * FROM login;`;
  } else if (req.params.type === 'D' ) {
    // Delete
    setQuery = `DELETE FROM login WHERE User = '${User}';`;
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
        
        if (req.params.type === 'C' ) {
          console.log(row[0].isPass)
          ret = JSON.stringify({result: row[0].isPass});
        } else if (req.params.type === 'R' ) {
          var dat = [];
          for (var i = 0;i < row.length; i++) {
            dat.push({User: row[i].User, Password: row[i].Password, Level: row[i].Priv, Phone: row[i].Phone})
          }
          var header = [
            {
              text: 'User',
              align: 'start',
              sortable: false,
              value: 'User',
            },
            { text: 'Password', value: 'Password' },
            { text: 'Level', value: 'Level' },
            { text: 'Phone', value: 'Phone' },
            { text: 'Actions', value: 'actions', sortable: false },
          ]
          ret = JSON.stringify({Header: header, Search: dat});
        }
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