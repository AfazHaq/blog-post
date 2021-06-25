<template>
  <div>
    <button class="home-btn" @click="$router.push({ name: 'Home' })">
      Home
    </button>
    <div class="dictionary-box">
      <span class="title">{{ title }}</span>
      <br />
      <div v-if="highlightedWords.length > 0">
        <span v-for="word in highlightedWords" :key="word">
          <span @click="showPreview(word)" class="dictionary-word">{{
            word
          }}</span>
        </span>
      </div>
      <span v-else>No words are Highlighted</span>
    </div>
    <div>
      <span class="title">{{ previewTitle }}</span>
      <br />
      <div v-if="previewCollection.length > 0">
        <div
          class="thumbnail-container"
          v-for="item in previewCollection"
          :key="item.id"
        >
          <router-link
            :to="{ name: 'blogDetails', params: { blogId: item.id } }"
          >
            <blog-thumbnail
              :title="item.title"
              :content="getContent(item.content)"
              :author="item.author"
              :content-limit="contentLimit"
            ></blog-thumbnail>
          </router-link>
        </div>
      </div>
      <span v-else>No Preview Found</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import BlogThumbnail from "./BlogThumbnail";

export default {
  components: {
    BlogThumbnail
  },
  data() {
    return {
      title: "Highlighted words",
      previewTitle: "Preview",
      previewCollection: [],
      selectedWord: "",
      contentLimit: 135
    };
  },
  computed: {
    ...mapGetters(["highlightedWords", "collection"])
  },
  methods: {
    ...mapMutations(["setCurrentWord"]),

    showPreview(word) {
      this.selectedWord = word;
      this.setCurrentWord(word);
      this.previewCollection = this.collection.filter(item => {
        if (item.content.includes(word)) {
          return item;
        }
      });
    },
    getContent(content) {
      const index = content.indexOf(this.selectedWord);
      const startingIndex = index - 67 > 0 ? index - 67 : 0;
      const endIndex = startingIndex + this.contentLimit;
      const shortContent = `${startingIndex > 0 ? "..." : ""}${content.substr(
        startingIndex,
        endIndex
      )}`;

      return shortContent.replace(new RegExp(this.selectedWord), match => {
        return '<span class="highlight-text">' + match + "</span>";
      });
    }
  }
};
</script>

<style scoped>
.thumbnail-container {
  display: inline-block;
}
.dictionary-box {
  height: 200px;
}
.title {
  display: inline-block;
  font-size: 24px;
  font-weight: 800;
  margin: 20px 0;
  text-decoration: underline;
}
.dictionary-word {
  border: 5px solid #bbb6b6;
  display: inline-block;
  margin: 10px;
  padding: 10px;
}
.home-btn {
  background-color: #cdcde8;
  padding: 2px;
  position: absolute;
  left: 50px;
  margin: 10px 40px;
  margin-top: 30px;
  font-size: 18px;
  border-radius: 8px;
}
</style>
