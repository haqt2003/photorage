import { createRouter, createWebHistory } from "vue-router";
import { useUser } from "@/composables/useUser";

const requireAuth = (to, from, next) => {
  const { getUser } = useUser();
  const { user } = getUser();
  if (!user) next({ name: "SignIn", params: {} });
  else next();
};

const routes = [
  {
    path: "/",
    name: "UploadView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UploadView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignIn.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignUp.vue"),
  },
  {
    path: "/storage",
    name: "StorageView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/StorageView.vue"),
  },
  {
    path: "/details/:id",
    name: "DetailsView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DetailsView.vue"),
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
