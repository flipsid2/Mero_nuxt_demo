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
  const { order_id } = payload;
  // const tmpHost = Host ? Host : 'localhost'
  // const tmpPriv = Priv ? Priv : '1'
  // const tmpPhone = Phone ? Phone : ''
  // console.log(`login !!! ${User}, ${Password}, ${tmpHost}, ${tmpPriv}, ${Phone}`)

  console.log(req.params.type)
  var ret=[];
  let setQuery = '' 
  if (req.params.type === 'C' ) {
    // Check
    // setQuery = `SELECT count(*) AS isPass FROM orders WHERE User = '${User}' AND Password = '${Password}';`;
  } else if (req.params.type === 'U' ) {
    // Update
    // setQuery = `REPLACE INTO orders VALUES ('${User}', '${Password}', '${tmpHost}', ${tmpPriv}, '${tmpPhone}');`;
  } else if (req.params.type === 'R' ) {
    // Read
    setQuery = `SELECT * FROM orders;`;
  } else if (req.params.type === 'D' ) {
    // Delete
    // setQuery = `DELETE FROM orders WHERE User = '${User}';`;
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
        
        // if (req.params.type === 'C' ) {
        //   console.log(row[0].isPass)
        //   ret = JSON.stringify({result: row[0].isPass});
        // } else 
        if (req.params.type === 'R' ) {
          var dat = [];
          for (var i = 0;i < row.length; i++) {
            dat.push({
              product_id:   row[i].product_id, 
              product_name: row[i].product_name, 
              price:        row[i].price, 
              amount:       row[i].amount, 
              order_id:     row[i].order_id, 
              name:         row[i].name, 
              recv_name:    row[i].recv_name, 
              recv_zip_code:row[i].recv_zip_code, 
              recv_addr:    row[i].recv_addr,
              recv_phone:   row[i].recv_phone, 
              delivery_type:row[i].delivery_type, 
              color_size:   row[i].color_size, 
              message:      row[i].message, 
              en_name:      row[i].en_name, 
              en_addr:      row[i].en_addr, 
              order_memo:   row[i].order_memo, 
              status:       row[i].status
            })
          }
          var header = [
            {
              text: '商品ID',
              align: 'start',
              sortable: false,
              value: 'product_id',
            },
            { text: '商品名', value: 'product_name' },
            { text: '価格', value: 'price' },
            { text: '受注数', value: 'amount' },
            { text: '取引ID', value: 'order_id' },
            { text: 'ニックネーム', value: 'name' },
            { text: '名前（本名）', value: 'recv_name' },
            { text: '郵便番号', value: 'recv_zip_code' },
            { text: '住所', value: 'recv_addr' },
            { text: '電話番号', value: 'recv_phone' },
            { text: '배송', value: 'delivery_type' },
            { text: '色・サイズ', value: 'color_size' },
            { text: '連絡事項', value: 'message' },
            { text: '名前（ローマ字）', value: 'en_name' },
            { text: '住所(ローマ字)', value: 'en_addr' },
            { text: '受注メモ', value: 'order_memo' },
            { text: '상태', value: 'status' },
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