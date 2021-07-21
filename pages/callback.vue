

<template>
  <div class="container">
    <h1>
      <span>BUYMA LOGIN</span><br />
    </h1>
    <div
      v-if="access_token"
      class="accesstoken">
      {{ access_token }}
    </div>
    <div
      v-if="refresh_token"
      class="refreshtoken">
      {{ refresh_token }}
    </div>
    <div
      v-if="code"
      class="code">
      {{ code }}
    </div>
    <div
      v-if="state"
      class="state">
      {{ state }}
    </div>
    <button
      class="btn btn-primary"
      @click="setItem">
      setItem
    </button>
    <button
      class="btn btn-primary"
      @click="getItem">
      getItem
    </button>
  </div>  
</template>

<script>
/* eslint-disable no-console */
import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:3000'; //서버주소
axios.defaults.baseURL = 'https://mero-nuxt-demo.herokuapp.com';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// var qs = require('querystring');
// var rs = require('randomstring');

import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState('oauth', [
        'access_token',
        'refresh_token',
        'code',
        'state'
        ])
    },
    // methods: {
    //     redirect: function(url) {
    //         window.location.href = url;
    //     }
    // },
    methods: {
        // redirect: function(url) {
        //     window.location.href = url;
        // },
        toHome() {
            console.log('toHome ~~~ !!!')
            this.$router.push('/')
        }
    },
    // created() {
    mounted() {
        // const redirect = this.redirect;
        
        const toHome = this.toHome;
        // console.log('BuymaLogin!!!', this.$route.query)
        const returncode = this.$route.query.code;
        const returnstate = this.$route.query.state;
        console.log(`Buyma /login callback!!! code= ${returncode}, state=${returnstate}`)

        this.$store.dispatch('oauth/getToken', {
            returncode: this.$route.query.code,
            returnstate: this.$route.query.state
        })

        // if(state !== returnstate) {
        //     toHome()
        // }

        // if(returncode || returncode !== null) {
        //     const CLIENT_URL = 'https://mero-nuxt-demo.herokuapp.com'
        //     const OAUTH_CLIENT_ID = 'KFrdKSgbn4vwojkLtxW41SpSg8PtrJSmooRu6Ql8raw'
        //     const OAUTH_CLIENT_SECRET = 'HLmc7EGT4g2MZ8aSYY5LUq8vCmTbspYUEQANGSFKDf0'
        //     const default_dev_url = 'https://sandbox.personal-shopper-api.buyma.com';
        //     const redirect_uri    = `${CLIENT_URL}/callback`    
        //     const host = `${default_dev_url}/oauth/token?`
        //     // const queryString = qs.stringify({
        //     //     code: returncode,
        //     //     client_id: OAUTH_CLIENT_ID,
        //     //     client_secret: OAUTH_CLIENT_SECRET,
        //     //     grant_type: 'authorization_code',
        //     //     redirect_uri: redirect_uri,
        //     // })
        //     const authurl = `${host}grant_type=authorization_code&client_id=${OAUTH_CLIENT_ID}&client_secret=${OAUTH_CLIENT_SECRET}&code=${returncode}&redirect_uri=${redirect_uri}`;
        //     // const authurl = host + queryString;

        //     console.log('Buyma /login post : ', authurl);
        //     // redirect(authurl)
        //     axios.post(authurl)
        //     .then(function(resp) {
        //         console.log('Buyma /login access_token : ', resp);
        //         // const accesstoken = qs.parse(resp.data).access_token;
        //         // const refreshtoken = qs.parse(resp.data).refresh_token;
        //         // console.log('Buyma /login access_token : ', resp);
        //         toHome()
        //     })
        //     .catch(function(err) {
        //         console.log('something went wrong. request(token) failed. : ', err)
        //         toHome()
        //     })
        // } else {
        //     const accesstoken = this.$route.query.access_token;
        //     const refreshtoken = this.$route.query.refresh_token;
        //     console.log(`Buyma /login access_token : ${accesstoken} ${refreshtoken}`);
        //     toHome()
        // }
        
        

        // axios.get('https://mero-nuxt-demo.herokuapp.com/api/buyma/login?code=' + this.$route.query.code + '&state=' + this.$route.query.state)
        // // axios.get(`https://mero-nuxt-demo.herokuapp.com/buyma/login?code=${returncode}&state=${returnstate}`)
        // // axios.get('/buyma/login?code=' + this.$route.query.code + '&state=' + this.$route.query.state)
        // .then(function(res) {
        //     console.log('BuymaLogin: ', res.data)
        //     if(res.data==null) {
        //         // alert('something went wrong. can\'t get access token.');
        //         console.log('something went wrong. can\'t get access token.')
        //         toHome()
        //     }
        //     // redirect('/user?token=' + res.data + '&service=github')
        //     // const token = res.data
        //     toHome()
        //     // axios.get('https://mero-nuxt-demo.herokuapp.com/buyma/user?token=' + token)
        //     // .then(function(resp) {
        //     //     console.log(resp.data + '! login success!');
        //     // }).catch(function(err) {
        //     //     console.log(err);
        //     //     console.log('something goes wrong');
        //     // }).finally( function() {
        //     //     console.log('finally 0')
        //     //     toHome()
        //     // })
        // })
        // .catch(function(err) {
        //     // alert('something went wrong. request failed.');
        //     console.log('something went wrong. request failed. : ', err)
        //     toHome()
        // })
    },
    methods: {
      setItem() {
        this.$store.dispatch('oauth/setItem', {
          token: this.aaccess_token
        })
      },
      getItem() {
        this.$store.dispatch('oauth/getItem', {
          token: this.aaccess_token
        })
      },
    }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 40px;
  .accesstoken {
    color: $gray-400;
    font-size: 20px;
  }
  .refreshtoken {
    color: $gray-400;
    font-size: 20px;
  }
  .code {
    color: $gray-400;
    font-size: 20px;
  }
  .state {
    color: $gray-400;
    font-size: 20px;
  }
}
h1 {
  line-height: 1;
  font-family: "Oswald", sans-serif;
  font-size: 80px;
  margin: 0 30px;
  span {
    color: $primary;
  }
}
</style>