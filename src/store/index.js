import Vue from "vue";
import Vuex from "vuex";
import blogList from "../resources/blogList";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collection: [],
    blog: {},
    highlightedWords: [],
    currentWord: ""
  },
  getters: {
    collection: state => state.collection,
    blog: state => state.blog,
    highlightedWords: state => state.highlightedWords,
    currentWord: state => state.currentWord
  },
  mutations: {
    setCollection(state, value) {
      state.collection = value;
    },
    setBlog(state, data) {
      state.blog = data;
    },
    setHighlightedWords(state, data) {
      const index = state.highlightedWords.indexOf(data);
      if (!~index) {
        state.highlightedWords.push(data);
      }
    },
    setCurrentWord(state, data) {
      state.currentWord = data;
    }
  },
  actions: {
    getBlogList({ commit }) {
      const collection = [...blogList];

      commit("setCollection", collection);
    },
    getBlog({ commit }, { id }) {
      const data = blogList.find(item => {
        if (item.id === id) return item;
      });

      commit("setBlog", data);
    },
    createBlog({ commit, state }, { data }) {
      data.id = state.collection.length + 1;

      blogList.push(data);
      commit("setCollection", [...blogList]);
      commit("setBlog", data);
    },
    updateBlog({ commit }, { id, data }) {
      const index = blogList.findIndex(item => {
        if (item.id === id) return id;
      });

      blogList[index].title = data.title;
      blogList[index].content = data.content;

      commit("setCollection", [...blogList]);
      commit("setBlog", blogList[index]);
    },
    deleteBlog({ commit }, { id }) {
      const index = blogList.findIndex(item => {
        if (item.id === id) return id;
      });

      blogList.splice(index, 1);
      commit("setCollection", [...blogList]);
    },
    saveHighlightedWord({ commit }, { word }) {
      commit("setHighlightedWords", word);
    }
  }
});
