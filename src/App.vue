<script setup>
// All Import File  Code Is Here......................................................................................................
import { onMounted } from "vue";
import { useCategory } from "@/stores";
import { storeToRefs } from "pinia";

import {
  HeaderTop,
  Navbar,
  CartSideBar,
  MobileMenu,
  LoginModal,
  NewsLetter,
  FooterPart,
} from "@/components";

// All Variable  Code Is Here.....................................................................................................
const navCategoryData = useCategory();
const { navCategory } = storeToRefs(navCategoryData);

// API Calling Code Is Here.....................................................................................................
onMounted(() => {
  navCategoryData.navCategories();
});
// All Function  Code Is Here.....................................................................................................
</script>

<template>
  <div>
    <div class="backdrop"></div>
    <a class="backtop fas fa-arrow-up" href="#"></a>
    <!--
  header Top -->
    <HeaderTop />
    <!-- navbar -->
    <Navbar :navCategory="navCategory" />
    <!-- cart Side Bar -->
    <CartSideBar />
    <!-- Mobile Manu -->
    <MobileMenu />
    <!-- Login Modal Option -->
    <LoginModal />
    <!-- change content -->
    <!-- <router-view></router-view> -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- News Letter Part -->
    <NewsLetter />
    <!-- Footer Part -->
    <FooterPart />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
