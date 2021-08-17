<template>
  <v-container style="position: relative; top:20%; margin-left: 20%" fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="mdi-account" v-model="form.User" label="ID" type="text"></v-text-field>
              <v-text-field prepend-icon="mdi-lock" v-model="form.Password" label="PASSWORD" type="password"></v-text-field>
            </v-form>
            <v-btn>{{token}}</v-btn>
          </v-card-text>
          <v-card-actions>
            <!-- <v-spacer></v-spacer> -->
            <v-btn dark color="primary" block @click="loginSubmit">Login</v-btn>

          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

import { mapState } from 'vuex';
export default {
  computed: {
      ...mapState('sign', [
      'token'
      ])
  },
  data () {
    return {
      form: {
        User: '',
        Password: ''
      }
    }
  },
  methods: {
    loginSubmit() {
      
      const payload = this.form;
      const {User, Password} = payload;
      console.log(`loginSubmit : ${User}, ${Password}`)
      axios.post('/api/maero/login/R', payload)
      .then((res) => {
        if (res.status === 200) {
          // 로그인 성공시
          console.log('loginSubmit :' + res.data.result)
          this.$store.commit("sign/signin", {
            token: res.data.result
          });
          console.log('mapState token : ', this.token );
          // this.$router.push("/");
        }
        else {
          console.log('loginSubmit error' + res.data)
        }
      })
      .catch((error) => {
        console.error(error);
      })
    }
  }
}
</script>