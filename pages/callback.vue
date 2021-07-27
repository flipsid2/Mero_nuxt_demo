

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
    <div
      v-if="res_id"
      class="res_id">
      {{ res_id }}
    </div>
    <div
      v-if="res_data"
      class="res_data">
      {{ res_data }}
    </div>
    <div
      v-if="res_err"
      class="res_err">
      {{ res_err }}
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
        'state',
        'res_data',
        'res_err',
        'res_id'
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
    },
    methods: {
      setItem() {
        this.$store.dispatch('oauth/setItem', {
          token: this.access_token
        })
      },
      getItem() {
        this.$store.dispatch('oauth/getItem', {
          token: this.access_token,
          uid: this.res_id
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