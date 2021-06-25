<template>
  <div>
    <h2>{{ isEditMode ? "Edit Blog" : "Create Blog" }}</h2>
    <div class="create-blog">
      <label>Title:</label><br />
      <textarea v-model="title" class="blog-title"></textarea><br /><br />
      <label>Author:</label><br />
      <input
        class="blog-author"
        type="text"
        v-model="author"
        :disabled="isEditMode"
      /><br /><br />
      <label>Content:</label><br />
      <textarea class="blog-content" v-model="content"></textarea><br /><br />
      <button class="submit-blog-btn" @click="saveBlog">Submit</button>
      <button class="submit-blog-btn" @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "",
      author: "",
      content: "",
      isEditMode: false
    };
  },
  computed: {
    ...mapGetters(["blog"])
  },
  methods: {
    ...mapActions(["createBlog", "getBlog", "updateBlog"]),

    cancel() {
      this.$router.push({
        name: "Home"
      });
    },

    saveBlog() {
      if (this.isEditMode) {
        this.updateBlog({
          id: this.blog.id,
          data: {
            title: this.title,
            author: this.author,
            content: this.content
          }
        });
      } else {
        this.createBlog({
          data: {
            title: this.title,
            author: this.author,
            content: this.content
          }
        });
      }

      this.$router.push({
        name: "blogDetails",
        params: { blogId: this.blog.id }
      });
    }
  },
  created() {
    const id = this.$route.params.blogId;

    if (id) {
      this.isEditMode = true;
      this.getBlog({ id });
      this.title = this.blog.title;
      this.author = this.blog.author;
      this.content = this.blog.content;
    } else {
      this.title = "";
      this.author = "";
      this.content = "";
    }
  }
};
</script>

<style scoped>
.create-blog {
  min-width: 500px;
}
.blog-title {
  width: 500px;
  height: 100px;
}
.blog-author {
  width: 500px;
}
.blog-content {
  width: 500px;
  height: 200px;
}
.submit-blog-btn {
  background-color: #cdcde8;
  padding: 2px;
  font-size: 18px;
  border-radius: 8px;
  margin: 5px;
}
</style>
