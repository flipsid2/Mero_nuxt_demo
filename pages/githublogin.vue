<template>
    <div>
        <h1>GITHUB LOGIN</h1>
    </div>
</template>

<script>
/* eslint-disable no-console */
import axios from 'axios'

export default {
    // methods: {
    //     redirect: function(url) {
    //         window.location.href = url;
    //     }
    // },
    methods: {
        toHome() {
            console.log('toHome ~~~ !!!')
            this.$router.push('/')
        }
    },
    // created() {
    mounted() {
        // const redirect = this.redirect;
        const toHome = this.toHome;

        console.log('GithubLogin!!!', this.$route.query)
        axios.get('https://mero-nuxt-demo.herokuapp.com/api/github/login?code=' + this.$route.query.code + '&state=' + this.$route.query.state)
        .then(function(res) {
            console.log('GithubLogin: ', res.data)
            if(res.data==null) {
                // alert('something went wrong. can\'t get access token.');
                console.log('something went wrong. can\'t get access token.')
                toHome()
            }
            // redirect('/user?token=' + res.data + '&service=github')
            const token = res.data
            axios.get('https://mero-nuxt-demo.herokuapp.com/api/github/user?token=' + token)
            .then(function(resp) {
                console.log(resp.data + '! login success!');
            }).catch(function(err) {
                console.log(err);
                console.log('something goes wrong');
            }).finally( function() {
                console.log('finally 0')
                toHome()
            })
        })
        .catch(function(err) {
            // alert('something went wrong. request failed.');
            console.log('something went wrong. request failed. : ', err)
            toHome()
        })
    }
    // beforeRouteEnter(to, from, next) {
    //     if(to.query) {
    //         if(to.query.code && to.query.state) {
    //             console.log('beforeRouteEnter!!!')
    //             next()
    //         } else {
    //             console.log('there\'s no query data.')
    //             // alert('there\'s no query data.')
    //             next('/')
    //         }
    //     } else {
    //         // alert('there\'s no query data.')
    //         console.log('there\'s no query data.')
    //         next('/')
    //     }
    // }
}
</script>