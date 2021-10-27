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
  console.log('Request URL:', req.originalUrl);
  const payload = req.body;
  // const { order_id } = payload;
  // const tmpHost = Host ? Host : 'localhost'
  // const tmpPriv = Priv ? Priv : '1'
  // const tmpPhone = Phone ? Phone : ''
  // console.log(`login !!! ${User}, ${Password}, ${tmpHost}, ${tmpPriv}, ${Phone}`)

  console.log(req.params.type)
  var ret=[];
  let setQuery = '' 
  if (req.params.type === 'C' || req.params.type === 'I') {
    // Check
    const { b_order_id } = payload;
    console.log('type C : ', payload)
    if( isNull(b_order_id) == true ) {
      res.status(404).send('error');
    }
    setQuery = `SELECT t1.*, t2.brand, t3.* FROM orders AS t1 LEFT JOIN products AS t2 ON t1.product_id = t2.product_id LEFT JOIN buylist AS t3 ON t1.order_id = t3.order_id_f WHERE t1.order_id = ${b_order_id};`;
    // setQuery = `SELECT t1.*, t2.brand, t3.* FROM orders AS t1 LEFT JOIN products AS t2 ON t1.product_id = t2.product_id LEFT JOIN buylist AS t3 ON t1.order_id = t3.order_id_f;`;
  } else if (req.params.type === 'U' ) {
    // Update
    const { b_order_id, b_date, b_enquiry, b_supplier, b_sup_price_won, b_remarks, b_waybill, b_waybill_date, b_memo } = payload;
    if( isNull(b_order_id) == true ) {
      res.status(404).send('error');
    }
    const enquiry       = b_enquiry ? b_enquiry : ''
    const supplier      = b_supplier ? b_supplier : ''
    const remarks       = b_remarks ? b_remarks : ''
    const waybill       = b_waybill ? b_waybill : ''
    const waybill_date  = b_waybill_date ? b_waybill_date : ''
    const memo          = b_memo ? b_memo : ''

    setQuery = `REPLACE INTO buylist VALUES (${b_order_id}, '${b_date}', '${enquiry}', '${supplier}', ${b_sup_price_won}, '${remarks}', '${waybill}', '${waybill_date}', '${memo}');`;
    // setQuery = `UPDATE buylist SET ${updatefield} = ${updatevalue} WHERE order_id_f = ${b_order_id};`;
  } else if (req.params.type === 'R' ) {
    // Read
    setQuery = `SELECT t1.*, t2.brand, t3.* FROM orders AS t1 LEFT JOIN products AS t2 ON t1.product_id = t2.product_id LEFT JOIN buylist AS t3 ON t1.order_id = t3.order_id_f;`;
  } else if (req.params.type === 'D' ) {
    // Delete
    // setQuery = `DELETE FROM orders WHERE User = '${User}';`;
  } else {
    res.status(404).send('error');
  };
  
  // console.log(`setQuery !!! ${setQuery}`)
  let insertListQeury = '';
  try {
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      connection.query(setQuery, function (error, row, fields) {
        if (error) {
          console.log(error);
          res.status(500).send('fail ')
        }
        
        if (req.params.type === 'R' || req.params.type === 'C' || req.params.type === 'I') {
          // const tmpHost = Host ? Host : 'localhost'
          // const tmpPriv = Priv ? Priv : '1'
          // const tmpPhone = Phone ? Phone : ''
          // console.log(`login !!! ${User}, ${Password}, ${tmpHost}, ${tmpPriv}, ${Phone}`)
            
          var dat = [];          
          for (var i = 0;i < row.length; i++) {
            if ( isNull(row[i].order_id_f) == true && req.params.type === 'R' ) {
              // DB Table 'buylist', add Item

              // row[i].product_id
              // row[i].product_name
              // row[i].price
              // row[i].amount
              // row[i].order_id
              // row[i].name
              // row[i].recv_name
              // row[i].recv_zip_code
              // row[i].recv_addr
              // row[i].recv_phone
              // row[i].delivery_type
              // row[i].color_size
              // row[i].message 
              // row[i].en_name 
              // row[i].en_addr 
              // row[i].order_memo 
              // row[i].status
              // row[i].brand

              
              // (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
              const current = new Date();
              const YYYY = current.getFullYear();
              const MM  = (current.getMonth()+1) > 9 ? (current.getMonth()+1) : `0${current.getMonth()+1}`;
              const DD  = current.getDate() > 9 ? current.getDate() : `0${current.getDate()}`;
              const date = `${YYYY}-${MM}-${DD}`;
              // console.log('buylist server-middleware date : ', date);

              row[i].order_id_f     = row[i].order_id;
              row[i].date           = date;
              // row[i].enquiry        = row[i].enquiry ? row[i].enquiry : "";
              // row[i].supplier       = row[i].supplier ? row[i].supplier : "";
              // row[i].sup_price_won  = row[i].sup_price_won ? row[i].sup_price_won : "";
              // row[i].remarks        = row[i].remarks ? row[i].remarks : "";
              // row[i].waybill        = row[i].waybill ? row[i].waybill : "";
              // row[i].waybill_date   = row[i].waybill_date ? row[i].waybill_date : "";
              row[i].memo           = row[i].memo ? row[i].memo : "";
              
              if (insertListQeury === '') {
                insertListQeury = `(${row[i].order_id_f}, '${row[i].date}')`
              }
              else {
                insertListQeury = `${insertListQeury}, (${row[i].order_id_f}, '${row[i].date}')`
              }
            }
            

            dat.push({                           
              o_product_id:   row[i].product_id, 
              o_product_name: row[i].product_name, 
              o_price:        row[i].price, 
              o_amount:       row[i].amount,
              o_order_id:     row[i].order_id, 
              o_name:         row[i].name, 
              o_recv_name:    row[i].recv_name, 
              o_recv_zip_code:row[i].recv_zip_code, 
              o_recv_addr:    row[i].recv_addr,
              o_recv_phone:   row[i].recv_phone, 
              o_delivery_type:row[i].delivery_type, 
              o_color_size:   row[i].color_size, 
              o_message:      row[i].message, 
              o_en_name:      row[i].en_name, 
              o_en_addr:      row[i].en_addr, 
              o_order_memo:   row[i].order_memo, 
              o_status:       row[i].status,
              p_brand:        row[i].brand,
              b_order_id:     row[i].order_id_f, 
              b_date:         row[i].date, 
              b_enquiry:      row[i].enquiry, 
              b_supplier:     row[i].supplier, 
              b_sup_price_won:row[i].sup_price_won, 
              b_remarks:      row[i].remarks, 
              b_waybill:      row[i].waybill,
              b_waybill_date: row[i].waybill_date, 
              b_memo:         row[i].memo, 
              b_qrcode:       process.env.CLIENT_URL+'/buyitem/'+row[i].order_id, 
            })
          }
          var header = [
            {
              text: '일자',
              align: 'start',
              // sortable: false,
              value: 'b_date',
              width: '100px'
            },
            { text: '주문ID', value: 'o_order_id'},
            { text: '상품ID', value: 'o_product_id'},
            { text: '상품명', value: 'o_product_name'},
            { text: '브랜드', value: 'p_brand'},
            { text: '수량', value: 'o_amount'},
            { text: '옵션', value: 'o_color_size'},
            { text: '連絡事項', value: 'b_enquiry'},
            { text: '성명（本名）', value: 'o_recv_name' },
            { text: '우편번호', value: 'o_recv_zip_code' },
            { text: '주소', value: 'o_recv_addr'},
            { text: '전화번호', value: 'o_recv_phone' },
            { text: '운송방법', value: 'o_delivery_type' },
            { text: '구매자ID', value: 'o_name' },
            { text: '매입처', value: 'b_supplier'},
            { text: '매입가', value: 'b_sup_price_won'},
            { text: '판매가', value: 'o_price' },
            { text: '상태', value: 'o_status' },
            { text: '특이사항', value: 'b_remarks'},
            { text: '주문번호', value: 'b_waybill'},
            { text: '매입일', value: 'b_waybill_date'},
            { text: 'memo', value: 'b_memo'},
          ]
          ret = JSON.stringify({Header: header, Search: dat});
        }
        res.header('Content-Type', 'application/json; charset=utf-8')
        res.status(200).send(ret)

        if (insertListQeury.length > 0 && req.params.type === 'R') {
          // order_id_f is null -> insert into buylist

          // console.log('insertListQeury length : ', insertListQeury.length);
          // console.log('insertListQeury : ', insertListQeury)
          let secondQuery = `REPLACE INTO buylist(order_id_f, date) VALUES ${insertListQeury};`
          // console.log('secondQeury : ', secondQuery)

          connection.query(secondQuery, function (error, row, fields) {
            if (error) {
              console.log('secondQeury error : ', error);
              // res.status(500).send('fail ')
            }
            console.log('secondQeury OK');
          });
        }
      });
      connection.release()
    });
  } catch (err) {
    console.log(err);
  } finally {
    
  }
});


module.exports = app;