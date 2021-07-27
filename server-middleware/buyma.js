var express = require('express');
var qs = require('querystring');
var rs = require('randomstring');
const cors = require('cors');
const axios = require('axios');

const app = express()
const { CLIENT_URL } = process.env;

const corsOptions = {
    origin: 'http://localhost:3000',
    Credentials: true,
};

// app.use(cors(corsOptions));

let state;
// const default_url        = 'https://personal-shopper-api.buyma.com';
const DEV_MODE              = true
const OAUTH_CLIENT_ID       = (DEV_MODE) ? 'KFrdKSgbn4vwojkLtxW41SpSg8PtrJSmooRu6Ql8raw' : 'Ie8TK8ftZYLt0UrP-Qf3bDdJeV5Zndzf660jWVALI34';
const OAUTH_CLIENT_SECRET   = (DEV_MODE) ? 'HLmc7EGT4g2MZ8aSYY5LUq8vCmTbspYUEQANGSFKDf0' : 'TKTmzRRAwhwdoWUdVq82V0_BsSFtwqbU8L-omRrdaVA';
const default_url           = (DEV_MODE) ? 'https://sandbox.personal-shopper-api.buyma.com' : 'https://personal-shopper-api.buyma.com';
const redirect_uri          = CLIENT_URL + '/callback'


axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.timeout = 100000;
axios.defaults.baseURL = default_url

// 캐싱 방지
axios.defaults.headers.get['Cache-Control'] = 'no-cache';
axios.defaults.headers.get['Pragma'] = 'no-cache';


app.use(express.json())
app.get('/', cors(corsOptions), async (req, res, next) => {
    state = rs.generate();
    
    const query = qs.stringify({
        response_type: 'code',
        client_id: OAUTH_CLIENT_ID,
        redirect_uri: redirect_uri,
        state: state,
    });
    const url = default_url + '/oauth/authorize?';
    const buymaAuthUrl = url + query;
    console.log('buyma 00 / : ', buymaAuthUrl);

    try {
        // window.location.href = githubAuthUrl
        res.status(200).json(buymaAuthUrl)
    } catch (err) {
        res.status(400).json(err)
    }
});

app.post('/login', cors(corsOptions), async (req, res, next) => {
    const payload = req.body
    const { returncode, returnstate } = payload;
    // const returncode = req.query.code;
    // const returnstate = req.query.state;
    console.log(`Buyma /login !!! ${returncode}, ${returnstate}`)

    // if(state !== returnstate) {
    //     res.send(false);
    // }

    const host = default_url + '/oauth/token?'
    const queryString = qs.stringify({
        code: returncode,
        client_id: OAUTH_CLIENT_ID,
        client_secret: OAUTH_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: redirect_uri,
    })
    const authurl = host + queryString;

    console.log('Buyma /login post : ', authurl);

    try {
        const { data } = await axios.post(authurl);
        if (data.Error) {
            res.status(400)
            .json(data.Error)
        }
        res.status(200)
            .json(data)
    } catch (error) {
        res.status(error.response.status)
            .json(error.message)
    }

    // axios.post(authurl)
    // .then(function(resp) {
    //     // const token = qs.parse(resp.data).access_token;
    //     // console.log('Buyma /login token : ', token);
    //     res.send(resp)
    // })
    // .catch(function(err) {
    //     console.log(err);
    // })
});

// router.get('/user', function(req, res, next) {
app.post('/create', cors(corsOptions), async (req, res, next) => {
    // const payload = req.body
    // const { token } = payload;

    const data = {
        "product": {
            "reference_number": "ABC123",
            "control": "publish",
            "name": "キルティングジャケット",
            "comments": "この度は、商品をご覧いただきありがとうございます。",
            "brand_id": 203,
            "model_id": null,
            "category_id": 3064,
            "season_id": null,
            "theme_id": null,
            "price": 22500,
            "reference_price": 25500,
            "regular_price": null,
            "available_until": "2021/08/01",
            "buying_area_id": "2001001000",
            "buying_shop_name": "正規取扱店",
            "shipping_area_id": "2001001000",
            "duty": "included",
            "tags": [
                { "tag_id": 419 },
                { "tag_id": 710 }
            ],
            "shipping_methods": [
                { "shipping_method_id": 888 },
                { "shipping_method_id": 891 }
            ],
            "images": [
                { "path": "https://example.org/images/1.jpg", "position": 1 },
                { "path": "https://example.org/images/2.jpg", "position": 2 }
            ],
            "style_numbers": [
                { "number": "CATALOG-001-WHITE", "memo": "White" },
                { "number": "CATALOG-001-BLACK", "memo": "Black" }
            ],
            "options": [
                {
                    "type": "size", "value": "S", "position": 1, "master_id": 1,
                    "details": [
                        { "key": "着丈", "value": "67.0", "optional_value": "67.5" },
                        { "key": "肩幅", "value": "46.0" },
                        { "key": "胸囲", "value": "53.0" },
                        { "key": "袖丈", "value": "63.0", "optional_value": "63.5" }
                    ]
                },
                {
                    "type": "size", "value": "M", "position": 2, "master_id": 2,
                    "details": [
                        { "key": "着丈", "value": "68.0", "optional_value": "68.5" },
                        { "key": "肩幅", "value": "48.0" },
                        { "key": "胸囲", "value": "55.0" },
                        { "key": "袖丈", "value": "65.0", "optional_value": "65.5" }
                    ]
                },
                { "type": "color", "value": "White", "position": 1, "master_id": 1 },
                { "type": "color", "value": "Black", "position": 2, "master_id": 2 }
            ],
            "size_unit": "cm",
            "variants": [
                {
                    "options": [
                        { "type": "size", "value": "S" },
                        { "type": "color", "value": "White" }
                    ],
                    "stock_type": "stock_in_hand",
                    "stocks": 1
                },
                {
                    "options": [
                        { "type": "size", "value": "M" },
                        { "type": "color", "value": "White" }
                    ],
                    "stock_type": "stock_in_hand",
                    "stocks": 1
                },
                {
                    "options": [
                        { "type": "size", "value": "S" },
                        { "type": "color", "value": "Black" }
                    ],
                    "stock_type": "out_of_stock",
                    "stocks": null
                },
                {
                    "options": [
                        { "type": "size", "value": "M" },
                        { "type": "color", "value": "Black" }
                    ],
                    "stock_type": "purchase_for_order",
                    "stocks": null
                }
            ],
            "order_quantity": 3,
            "shop_urls": [
                {
                    "label": "ラベル１",
                    "url": "http://example.com/url/1",
                    "description": "説明１"
                },
                {
                    "label": "ラベル２",
                    "url": "http://example.com/url/2",
                    "description": "説明２"
                }
            ]
        }
    }
    // const options = {
    //     headers: {
    //         // Authorization: 'Bearer ' + token,
    //         // 'Authorization': 'Bearer ' + req.query.token,
    //         'X-Buyma-Personal-Shopper-Api-Access-Token': token,
    //         // 'Content-Type': 'application/X-Buyma-Personal-Shopper-Api-Access-Token'
    //         // 'Content-Type': 'application/json;charset=UTF-8'
    //     },
    //     data
    // }
    const config = {
        headers: {
            // Authorization: 'X-Buyma-Personal-Shopper-Api-Access-Token',
            'X-Buyma-Personal-Shopper-Api-Access-Token': req.query.token
            // 'User-Agent': 'Login-App'
        }
    }
    
    console.log('Buyma /create post : ', req.query.token);
    // const url = default_url + '/api/v1/products/variants.json';
    // const url = default_url + '/api/v1/products.json';
    // axios.post('/api/v1/products.json', null, config)
    axios.post('/api/v1/products.json?', data, config)
    .then(function(resp) {
        console.log('Buyma /create : ', resp.data);
        res.send(resp.data);
    })
    .catch(function(err) {
        console.log(err)
    })
});

app.post('/orders', cors(corsOptions), async (req, res, next) => {
    // const payload = req.body
    // const { token } = payload;

    // const options = {
    //     headers: {
    //         // 'Accept': 'application/json',
    //         // Authorization: 'Bearer ' + token,
    //         // 'Authorization': 'Bearer ' + req.query.token,
    //         'X-Buyma-Personal-Shopper-Api-Access-Token': token,
    //         // 'Content-Type': 'application/X-Buyma-Personal-Shopper-Api-Access-Token'
    //         // 'Content-Type': 'application/json;charset=UTF-8'
    //     }
    // }
    const config = {
        headers: {
            // Authorization: 'X-Buyma-Personal-Shopper-Api-Access-Token',
            Authorization: 'token ' + req.query.token,
            'X-Buyma-Personal-Shopper-Api-Access-Token': req.query.token
            // 'User-Agent': 'Login-App'
        }
    }

    console.log('Buyma /orders post : ', req.query.token);
    //GET /api/v1/orders.json?page=2&per_page=1
    // const url = default_url + '/api/v1/orders.json?page=2&per_page=1';
    axios.get('https://sandbox.personal-shopper-api.buyma.com/api/v1/orders.json?page=2&per_page=1', config)
        .then(function (resp) {
            console.log('Buyma /orders : ', resp.data);
            res.send(resp.data);
        })
        .catch(function (err) {
            console.log(err)
        })
});

module.exports = app;