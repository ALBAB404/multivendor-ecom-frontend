<script setup>

import {
  HeaderTop,
  Navbar, 
  CartSideBar, 
  MobileMenu, 
  LoginModal, 
  NewsLetter, 
  FooterPart  
} from '@/components';

</script>

<template lang="">
  <div>
    <div class="backdrop"></div>
    <a class="backtop fas fa-arrow-up" href="#"></a>

    <!-- header Top -->
    <HeaderTop />
  
    <!-- navbar -->
    <Navbar />

    <!-- cart Side Bar -->
    <CartSideBar />
   
     <!-- Mobile Manu -->
     <MobileMenu />
  
    <!-- Login Modal Option -->

    <LoginModel />


      <!--  change content  -->

      <router-view></router-view>


    <!-- News Letter Part -->
    <NewsLetter />

    <!-- Footer Part -->
    <FooterPart />

  </div>
</template>

<style>
  
</style>