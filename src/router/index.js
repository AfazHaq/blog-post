import Vue from "vue";
import Router from "vue-router";
import BlogList from "../components/BlogList";
import BlogDetails from "../components/BlogDetails";
import CreateBlog from "../components/CreateBlog";
import HighLightedWordsList from "../components/HighLightedWordsList";

Vue.use(Router);

export default new Router({
  base: "/blog",
  hashbang: false,
  mode: "history", //HTML5 mode
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "Home",
      component: BlogList
    },
    {
      path: "/blogDetails/:blogId",
      name: "blogDetails",
      component: BlogDetails
    },
    {
      path: "/createBlog",
      name: "createBlog",
      component: CreateBlog
    },
    {
      path: "/editBlog/:blogId",
      name: "editBlog",
      component: CreateBlog
    },
    {
      path: "/highlightedWords",
      name: "highlightedWords",
      component: HighLightedWordsList
    },
    {
      path: "*",
      redirect: "/home"
    }
  ]
});
