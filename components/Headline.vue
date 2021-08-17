<template>
  <div class="container">
    <h1>
      <span>MAERo API</span><br />
    </h1>
    <div
      v-if="access_token"
      class="message">
      {{ access_token }}
    </div>
    <div
      v-if="code"
      class="message">
      {{ code }}
    </div>
    <div
      v-if="state"
      class="message">
      {{ state }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('oauth', [
      'access_token',
      'code',
      'state'
    ])
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 40px;
  .message {
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
