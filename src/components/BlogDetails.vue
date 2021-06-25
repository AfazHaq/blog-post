<template>
  <div>
    <div class="blog-details">
      <button class="home-btn" @click="goToHome">Home</button>
      <button class="highlighted-page-btn" @click="goToDictionary">
        Dictionary
      </button>
      <span class="blog-title">{{ blog.title }}</span>
      <button class="edit-blog-btn" @click="editBlog">Edit Blog</button>
      <button class="delete-blog-btn" @click="deleteBlogPost">
        Delete Blog
      </button>
      <br />
      <span class="blog-author">— {{ blog.author }}</span>
      <p class="blog-content" @click.stop="highlighter">
        <span v-html="content"></span>
      </p>
      <button v-if="showHighlightIcon" @click="highlightText">
        <b-icon class="icon-style" icon="star-fill"></b-icon>
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { BIcon } from "bootstrap-vue";

export default {
  components: {
    BIcon
  },
  data() {
    return {
      showHighlightIcon: false,
      highlightedText: "",
      content: ""
    };
  },
  computed: {
    ...mapGetters(["blog", "currentWord"])
  },
  methods: {
    ...mapActions(["getBlog", "deleteBlog", "saveHighlightedWord"]),

    goToHome() {
      this.$router.push({ name: "Home" });
    },

    goToDictionary() {
      this.$router.push({ name: "highlightedWords" });
    },

    editBlog() {
      this.$router.push({
        name: "editBlog",
        params: {
          id: this.$route.params.id
        }
      });
    },

    deleteBlogPost() {
      this.deleteBlog({ id: this.blog.id });
      this.$router.push({
        name: "Home"
      });
    },

    highlighter() {
      const word = window.getSelection().toString();
      if (word.length > 0) {
        this.highlightedText = word;
        this.showHighlightIcon = true;
      }
    },

    highlightText() {
      const isWordValidated = /^[a-zA-Z0-9]+$/.test(this.highlightedText);

      if (isWordValidated) {
        this.content = this.blog.content.replace(
          new RegExp(this.highlightedText),
          match => {
            return '<span class="highlight-text">' + match + "</span>";
          }
        );
        this.saveHighlightedWord({ word: this.highlightedText });
      } else {
        this.content = this.blog.content;
        alert("Words containing only alphabets and numbers can be highlighted");
      }

      this.showHighlightIcon = false;
    }
  },
  created() {
    const id = this.$route.params.blogId;
    this.getBlog({
      id
    });
    this.content = this.blog.content;
    if (this.currentWord) {
      this.highlightedText = this.currentWord;
      this.highlightText();
    }
  }
};
</script>

<style scoped>
.blog-details {
  border: 5px solid #bbb6b6;
  width: 60%;
  margin: auto;
  margin-top: 30px;
  min-height: 400px;
}
.blog-title {
  display: inline-block;
  font-size: 24px;
  font-weight: 800;
  margin: 20px 0;
}
.blog-author {
  font-size: 16px;
  font-weight: 800;
}
.blog-content {
  text-align: center;
  margin-top: 30px;
  word-wrap: break-word;
}
.edit-blog-btn {
  background-color: #cdcde8;
  padding: 2px;
  position: absolute;
  right: 50px;
  margin: 10px 40px;
  font-size: 18px;
  border-radius: 8px;
}
.home-btn {
  background-color: #cdcde8;
  padding: 2px;
  position: absolute;
  left: 50px;
  margin: 10px 40px;
  font-size: 18px;
  border-radius: 8px;
}
.highlighted-page-btn {
  background-color: #cdcde8;
  padding: 2px;
  position: absolute;
  left: 50px;
  margin: 60px 40px;
  font-size: 18px;
  border-radius: 8px;
}
.delete-blog-btn {
  background-color: #cdcde8;
  padding: 2px;
  position: absolute;
  right: 50px;
  margin: 60px 40px;
  font-size: 18px;
  border-radius: 8px;
}
.icon-style {
  z-index: 1;
}
</style>
