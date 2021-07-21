<template>
  <div class="container">
    <h1>webhook!!!</h1>
  </div>
</template>

<script>
export default {
  asyncData({ query}) {
    console.log(query);
  }
}
</script>

<style lang="scss" scoped>
.webhook {
  text-align: center;
  font-size: 40px;
  font-family: "Oswald", sans-serif;
  margin: 40px auto 20px;
}
</style>