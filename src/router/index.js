import { createRouter, createWebHistory } from 'vue-router';
import {Index, Shop, SingleProduct, Checkout} from '@/views/pages';
import {UserLogin, UserRegister} from '@/views/auth';
import {SellerApply, SellerList, SellerStore} from '@/views/pages/seller';
import {MyOrderList, MyProfile, MyWishList} from '@/views/user';

const routes = [

    { path: '/', name: 'index.page', meta: { title: 'Home' }, component: Index },
    { path: '/shop', name: 'shop.page', meta: { title: 'Shop' }, component: Shop },
    { path: '/product', name: 'product.details', meta: { title: 'Product' }, component: SingleProduct },
    { path: '/checkout', name : 'checkout.page', meta: { title: 'Checkout' }, component: Checkout },
    { path: '/seller-list', name: 'seller.page', meta: { title: 'Seller-List' }, component: SellerList },
    { path: '/seller-store', name: 'seller.store', meta: { title: 'Seller-Store' }, component: SellerStore },
    { path: '/seller-apply', name: 'seller.apply', meta: { title: 'Seller-Apply' }, component: SellerApply },


    // User Route 

    { path: '/auth/login', name: 'user.login', meta: { title: 'Login' }, component: UserLogin },
    { path: '/auth/register', name: 'user.register', meta: { title: 'Register' }, component: UserRegister },
    { path: '/my/profile', name: 'user.profile', meta: { title: 'Profile' }, component: MyProfile },
    { path: '/my/Order', name: 'user.order', meta: { title: 'Order' }, component: MyOrderList },
    { path: '/my/wishlist', name: 'user.wishlist', meta: { title: 'Wishlist' }, component: MyWishList },

  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const DEFAULT_TITLE = "404"

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || DEFAULT_TITLE ;
  next()
})

export default router