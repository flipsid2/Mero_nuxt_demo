const express = require('express')
const axios = require('axios');

const app = express()
const { OAUTH_URL, OAUTH_CLIENT_ID, CLIENT_URL, OAUTH_STATE } = process.env;

app.use(express.json())
app.post('/', async (req, res) => {
  // const payload = req.body
  // const { title, type, year, page, id } = payload;

  console.log('OAUTH_URL: ', OAUTH_URL);
  console.log('OAUTH_CLIENT_ID: ', OAUTH_CLIENT_ID);
  console.log('CLIENT_URL: ', 'https://mero-nuxt-demo.herokuapp.com' + '/callback');
  console.log('OAUTH_STATE: ', OAUTH_STATE);
  // console.log('params: ', payload);

  const url = `${OAUTH_URL}&client_id=${OAUTH_CLIENT_ID}&redirect_url=https://mero-nuxt-demo.herokuapp.com/callback&state=${OAUTH_STATE}`;
  // const url = 'https://personal-shopper-api.buyma.com/oauth/authorize?response_type=code&client_id=0d64819f15fe09aa2c2e7504bcb62492604dad3b617393a8e4658d0d358ded44&redirect_uri=https://example.org/callback&state=aab522846f222faf6764ded129927b8d'
  console.log('url: ', url);
  try {
    const response = await axios.get(url);
    const {data, request} = response;
    if (data.Error) {
      res.status(400)
        .json(data.Error)
    }
    res.status(200)
      .json(data)
    
    console.log(request._redirectable._options.href);
    redirect
    // response.redirect(response.url)
    // console.log('fetch get():', response);
  } catch (error) {
    res.status(error.response.status)
      .json(error.message)
  }
})

module.exports = app