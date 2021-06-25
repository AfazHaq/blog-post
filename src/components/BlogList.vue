<template>
  <div>
    <span class="list-title">{{ title }}</span>
    <button class="create-blog-btn" @click="goToCreate">
      Create New Blog
    </button>
    <br />
    <div v-if="collection.length > 0">
      <div
        class="thumbnail-container"
        v-for="item in collection"
        :key="item.id"
      >
        <router-link :to="{ name: 'blogDetails', params: { blogId: item.id } }">
          <blog-thumbnail
            :title="item.title"
            :content="item.content"
            :author="item.author"
          ></blog-thumbnail>
        </router-link>
      </div>
    </div>
    <span v-else>Blog list is Empty</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BlogThumbnail from "./BlogThumbnail";

export default {
  components: {
    BlogThumbnail
  },
  data() {
    return {
      title: "List of Blogs",
      isBlockDialogActive: false
    };
  },
  computed: {
    ...mapGetters(["collection"])
  },
  methods: {
    ...mapActions(["getBlogList"]),

    goToCreate() {
      this.$router.push({
        name: "createBlog"
      });
    }
  },
  created() {
    this.getBlogList();
  }
};
</script>

<style scoped>
.thumbnail-container {
  display: inline-block;
}
.list-title {
  display: inline-block;
  font-size: 24px;
  font-weight: 800;
  margin: 20px 0;
}
.create-blog-btn {
  background-color: #cdcde8;
  padding: 2px;
  position: absolute;
  right: 50px;
  margin: 20px 40px;
  font-size: 16px;
  border-radius: 8px;
}
</style>
