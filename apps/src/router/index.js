import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path:"/",
    name:"login",
    component:()=>import("../views/login.vue"),
  },
  {
    path: "/home",
    name: "home",
    redirect:"/1",
    component: ()=>import("../views/HomeView.vue"),
    children:[
      {path:"/1",component:()=>import("../components/one.vue")},
      {path:"/2",component:()=>import("../components/two.vue")},
      {path:"/3",component:()=>import("../components/three.vue")},
      {path:"/4",component:()=>import("../components/fore.vue")},
      {path:"/addPage",component:()=>import("../components/addPage.vue")},
      {path:"/pageCon",component:()=>import("../components/pageCon.vue")},
      {path:"/editPage",component:()=>import("../components/edit.vue")},
      {path:"/pageCount",component:()=>import("../components/pageCount.vue")},
    ]
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to,from,next)=>{
  if(to.name=="login"){
    next()
  }else{
    let token = localStorage.getItem("token")
    if (!token) next({
      name: "login"
    })
    if (token) {
      next()
      if(to.name!="login"){
        next()
      }
    }
  }
})
export default router;
