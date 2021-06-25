<template>
  <div id="app">
    <header class="application-header">{{ message }}</header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      message: "Welcome to Blogs viewer application"
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

.application-header {
  font-size: 32px;
  font-weight: 800;
  text-decoration: underline;
  background-color: #cdcde8;
  margin: auto;
  border: 3px solid #2c3e50;
  padding: 20px;
}
.highlight-text {
  background: yellow;
}
</style>
