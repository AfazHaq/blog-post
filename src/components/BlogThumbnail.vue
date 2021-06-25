<template>
  <div class="blog-thumbnail">
    <h3 class="blog-title">{{ shortTitle }}</h3>
    <div class="blog-content"><span v-html="shortContent"></span></div>
    <span class="author">- {{ author }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: String,
    content: String,
    author: String,
    contentLimit: {
      default: 100,
      type: Number
    }
  },
  computed: {
    shortTitle: vm =>
      vm.title.length > 50 ? `${vm.title.substr(0, 50)}...` : vm.title,
    shortContent: vm =>
      vm.content.length > vm.contentLimit
        ? `${vm.content.substr(0, vm.contentLimit)}...`
        : vm.content
  }
};
</script>

<style scoped>
.blog-thumbnail {
  width: 300px;
  height: 250px;
  border: 5px solid #bbb6b6;
  display: inline-block;
  margin: 10px;
  padding: 10px;
}
.author {
  display: block;
  text-align: end;
  padding-top: 15px;
}
.blog-content {
  word-wrap: break-word;
  min-height: 100px;
}
.blog-title {
  min-height: 44px;
}
</style>
