<template>
    <button class="btn btn-primary" v-on:click='buttonClick' >
        <!-- <img class='image' :src='require("../assets/" + service + ".png")' /> -->
        {{'Login with ' + service }}
    </button>
</template>

<script>
/* eslint-disable no-console */
import axios from 'axios';
var qs = require('querystring');
var rs = require('randomstring');
// import firebase from 'firebase';
// import config from '../firebase_config.js';

// firebase.initializeApp(config.config);
// const provider = new firebase.auth.GoogleAuthProvider();

export default {
    props: [ 'service', 'index' ],
    methods: {
        redirect: function(url) {
            window.location.href = url;
        },
        buttonClick: function() {
            const redirect = this.redirect;
            // if(this.service === 'google') {
            //     firebase.auth().signInWithPopup(provider).then(function(result) {
            //         const token = result.credential.accessToken;
            //         const userName = result.user.displayName;
            //         const email = result.user.email;
            //         redirect('/googlelogin?token=' + token + '&username=' + userName + '&email=' + email)
            //     })
            //     .catch(function(error) {
            //         const errorCode = error.code;
            //         const errorMessage = error.message;
            //         const email = error.email;
            //         const credential = error.credential;
            //         const errorData = {
            //             errorCode,
            //             errorMessage,
            //             email,
            //             credential,
            //         }
            //         console.log(errorData);
            //         alert('something goes wrong');
            //         redirect('/')
            //     });
            // }
            if(this.service === 'buyma1') {
                
                const state = rs.generate();
                console.log('login with buyma~~')
                // try {
                //     //https://mero-nuxt-demo.herokuapp.com
                //     const { data } = await axios.get(`/${this.service}`);
                //     if (data.Error) {
                //         redirect('/')
                //     }
                //     redirect(data)
                // } catch (error) {
                //     redirect('/')
                // }
                const CLIENT_URL        = 'https://mero-nuxt-demo.herokuapp.com'
                const redirect_uri      = CLIENT_URL + '/callback'
                const DEV_MODE          = true
                const OAUTH_CLIENT_ID   = (DEV_MODE) ? 'KFrdKSgbn4vwojkLtxW41SpSg8PtrJSmooRu6Ql8raw' : 'Ie8TK8ftZYLt0UrP-Qf3bDdJeV5Zndzf660jWVALI34';
                const default_url       = (DEV_MODE) ? 'https://sandbox.personal-shopper-api.buyma.com' : 'https://personal-shopper-api.buyma.com';
                const query = qs.stringify({
                    response_type: 'code',
                    client_id: OAUTH_CLIENT_ID,
                    redirect_uri: redirect_uri,
                    state: state,
                });
                const url = default_url + '/oauth/authorize?';
                const buymaAuthUrl = url + query;
                console.log(buymaAuthUrl)

                axios.get(buymaAuthUrl)
                .then(function(res) {
                    console.log('LoginButton:', res.data);
                    redirect(res.data);
                })
                .catch(function(err) {
                    console.log(err)
                });
            } else if(this.service === 'buyma2') {
                const state = rs.generate();
                const DEV_MODE          = true  // SandBox용
                const OAUTH_CLIENT_ID   = (DEV_MODE) ? 'KFrdKSgbn4vwojkLtxW41SpSg8PtrJSmooRu6Ql8raw' : 'Ie8TK8ftZYLt0UrP-Qf3bDdJeV5Zndzf660jWVALI34';
                const default_url       = (DEV_MODE) ? 'https://sandbox.personal-shopper-api.buyma.com' : 'https://personal-shopper-api.buyma.com';
                const url=`${default_url}/oauth/authorize?response_type=code&client_id=${OAUTH_CLIENT_ID}&redirect_uri=https://mero-nuxt-demo.herokuapp.com/callback&state=${state}`
                console.log(url)
                redirect(url)
            } else if(this.service === 'buyma3') {
                const state = rs.generate();
                const DEV_MODE          = false // Real용
                const OAUTH_CLIENT_ID   = (DEV_MODE) ? 'KFrdKSgbn4vwojkLtxW41SpSg8PtrJSmooRu6Ql8raw' : 'Ie8TK8ftZYLt0UrP-Qf3bDdJeV5Zndzf660jWVALI34';
                const default_url       = (DEV_MODE) ? 'https://sandbox.personal-shopper-api.buyma.com' : 'https://personal-shopper-api.buyma.com';
                const url=`${default_url}/oauth/authorize?response_type=code&client_id=${OAUTH_CLIENT_ID}&redirect_uri=https://mero-nuxt-demo.herokuapp.com/callback&state=${state}`
                console.log(url)
                redirect(url)
            } else if(this.service === 'database/1') {
                axios.get(`/api/${this.service}`)
                .then(function(res) {
                    console.log('database1:', res.data);
                })
                .catch(function(err) {
                    console.log(err)
                });
            } else if(this.service === 'database/2') {
                axios.get(`/api/${this.service}`)
                .then(function(res) {
                    console.log('database2:', res.data);
                })
                .catch(function(err) {
                    console.log(err)
                });
            } else if(this.service === 'database/3') {
                axios.get(`/api/${this.service}`)
                .then(function(res) {
                    console.log('database3:', res.data);
                })
                .catch(function(err) {
                    console.log(err)
                });
            } else {
                axios.get(`/api/${this.service}`)
                .then(function(res) {
                    console.log('LoginButton:', res.data);
                    redirect(res.data);
                })
                .catch(function(err) {
                    console.log(err)
                });
            }  
        }
    },
}
</script>

<style lang="scss" scoped>
.btn {
    width: 120px;
    height: 50px;
    flex-shrink: 0;
    font-weight: 700;
}
</style>