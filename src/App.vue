<script setup>
import AppLayout  from '@/layouts/AppLayout.vue'
</script>

<template>
  <div>
    
    <AppLayout>


    <!-- change content -->
    <!-- <router-view></router-view> -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>


    </AppLayout>


  
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
