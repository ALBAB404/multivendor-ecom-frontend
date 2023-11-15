import { createRouter, createWebHistory } from "vue-router";
import { Index, Shop, SingleProduct, Checkout } from "@/views/pages";
import { UserLogin, UserRegister } from "@/views/auth";
import { SellerApply, SellerList, SellerStore } from "@/views/pages/seller";
import { MyOrderList, MyProfile, MyWishList } from "@/views/user";
import { useAuth } from "@/stores";
// opore j header a progress bar jai ba loading hoy shetar jonno ei link
import NProgress from "nprogress";

const routes = [
  { path: "/", name: "index.page", meta: { title: "Home" }, component: Index },
  {
    path: "/shop",
    name: "shop.page",
    meta: { title: "Shop" },
    component: Shop,
  },
  {
    path: "/single-product/:slug",
    name: "product.details",
    meta: { title: "Product" },
    component: SingleProduct,
  },
  {
    path: "/checkout",
    name: "checkout.page",
    meta: { title: "Checkout" },
    component: Checkout,
  },
  {
    path: "/seller-list",
    name: "seller.page",
    meta: { title: "Seller-List" },
    component: SellerList,
  },
  {
    path: "/seller-store/:slug",
    name: "seller.store",
    meta: { title: "Seller-Store" },
    component: SellerStore,
  },
  {
    path: "/seller-apply",
    name: "seller.apply",
    meta: { title: "Seller-Apply" },
    component: SellerApply,
  },

  // User Route

  {
    path: "/auth/login",
    name: "user.login",
    meta: { title: "Login", guest: true },
    component: UserLogin,
  },
  {
    path: "/auth/register",
    name: "user.register",
    meta: { title: "Register", guest: true },
    component: UserRegister,
  },
  {
    path: "/my/profile",
    name: "user.profile",
    meta: { title: "Profile", requiresAuth: true },
    component: MyProfile,
  },
  {
    path: "/my/Order",
    name: "user.order",
    meta: { title: "Order", requiresAuth: true },
    component: MyOrderList,
  },
  {
    path: "/my/wishlist",
    name: "user.wishlist",
    meta: { title: "Wishlist", requiresAuth: true },
    component: MyWishList,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0, behavior: "smooth" };
  },
});

const DEFAULT_TITLE = "404";

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || DEFAULT_TITLE;
  NProgress.start();
  const loggedIn = useAuth();

  // authorization er jonno kora hoise. login authorization start
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn.user.meta) {
      next({ name: "user.login" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (loggedIn.user.meta) {
      next({ name: "user.profile" });
    } else {
      next();
    }
  } else {
    next();
  }
  // authorization er jonno kora hoise. login authorization end
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
