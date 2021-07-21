var express = require('express');
// var router = express.Router();
var qs = require('querystring');
var rs = require('randomstring');
// const cors = require('cors');
const axios = require('axios');
const app = express()


let state;
let github_token;
const { CLIENT_GITHUB_ID, CLIENT_GITHUB_SECRET } = process.env;
// const redirect_uri = process.client
// ? 'http://localhost:3000/githublogin'
// : `${process.env.CLIENT_URL}/githublogin`
const redirect_uri = 'https://mero-nuxt-demo.herokuapp.com/githublogin'

// app.use(cors({origin:"http://localhost:3000"}));
// app.use(express.json())
// app.post('/', async (req, res) => {
// router.get('/', function(req, res, next) {
app.get('/', function(req, res, next) {
    state = rs.generate();

    const url = 'https://github.com/login/oauth/authorize?';
    const query = qs.stringify({
        client_id: CLIENT_GITHUB_ID,
        redirect_uri: redirect_uri,
        login: 'flipsid2',
        state: state,
        scope: 'user:email',
    });

    const githubAuthUrl = url + query;
    console.log('github 00 / : ', githubAuthUrl);
    // res.json(githubAuthUrl)
    // res.contentType('json');
    // res.send(redirect_uri)
    res.send(githubAuthUrl)
});

// router.get('/login', function(req, res, next) {
app.get('/login', function(req, res, next) {
    const returncode = req.query.code;
    const returnstate = req.query.state;
    console.log(`github /login !!! ${returncode}, ${returnstate}`)

    if(state !== returnstate) {
        res.send(false);
    }

    const host = 'https://github.com/login/oauth/access_token?'
    const queryString = qs.stringify({
        client_id: CLIENT_GITHUB_ID,
        client_secret: CLIENT_GITHUB_SECRET,
        code: returncode,
        redirect_uri: redirect_uri,
        state: state,
    })
    const authurl = host + queryString;

    console.log('github /login post : ', authurl);
    axios.post(authurl)
    .then(function(resp) {
        const token = qs.parse(resp.data).access_token;
        console.log('github /login token : ', token);
        res.send(token)
    })
    .catch(function(err) {
        console.log(err);
    })
});

// router.get('/user', function(req, res, next) {
app.get('/user', function(req, res, next) {
    const config = {
        headers: {
            Authorization: 'token ' + req.query.token,
            'User-Agent': 'Login-App'
        }
    }
    
    console.log('github /user get : ', req.query.token);
    axios.get('https://api.github.com/user/public_emails', config)
    .then(function(resp) {
        console.log('github /user : ', resp.data[0].email);
        res.send(resp.data[0].email);
    })
    .catch(function(err) {
        console.log(err)
    })
});

module.exports = app;