<script setup>

// All Import File  Code Is Here......................................................................................................
import { ref,onMounted } from 'vue';
import { storeToRefs } from 'pinia'; 
// all components 
import {ProductCart, ProductPrice} from '@/components/product'
import {HomeSliderSkeleton, CategorySkeleton, ProductSkeleton} from '@/components/skeleton'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination,Autoplay, Navigation } from 'swiper/modules'

// slider data fetch 
import {useSlider, useCategory, useProduct} from '@/stores'


// All Variable  Code Is Here.....................................................................................................
const newSlide = ref([Navigation])
const modules = ref([Pagination,Autoplay]);

// slider data fetch 
const slider = useSlider();
const {sliders} = storeToRefs(slider)
// category data fetch 
const category = useCategory();
const {categories} = storeToRefs(category)
// product data fetch 
const product = useProduct();
const {products, sale, popular, feature, winter, newItems} = storeToRefs(product)
// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................


// All mounted Hooks  Code Is Here.....................................................................................................

onMounted(() => {
    slider.getData()
    category.getData()
    product.getData()
    product.getData('sale')
    product.getData('popular')
    product.getData('feature')
    product.getData('winter')
    product.getData('new')
})

</script>

<template lang="">
<div>
    <section class="banner-part">
        <div class="container">
            <div class="row">
            <div class="col-lg-12 order-0 order-lg-1 order-xl-1">
                <div class="home-grid-slider slider-arrow slider-dots">

                <template v-if="sliders.data">
                    <swiper
                        :spaceBetween="30"
                        :pagination="{
                        clickable: true,
                        }"
                        :autoplay="{
                            delay: 2000,
                        }"
                        :loop="true"
                        :modules="modules"
                        class="mySwiper">
                        <swiper-slide v-for="(slider, index) in sliders.data" :key="index"><a href="#"><img :src="slider.image" alt="" /></a></swiper-slide>
                    </swiper>
                </template>
                <template v-else>
                    <HomeSliderSkeleton />
                </template>
                </div>
            </div>
            </div>
        </div>
        </section>
    
        <section class="section suggest-part">
        <div class="container">
            <div class="row">
            <div class="col-lg-12">
                <div class="section-heading">
                <h3 style="float: left">SHOP BY CATEGORIES</h3>
                </div>
            </div>
            </div>
    
            <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                <template v-if="categories.data">
                    <div class="col" v-for="(category, index) in categories.data" :key="index">
                        <div class="product-card">
                        <ul>
                            <li>
                            <a class="suggest-card" href="shop-4column.html">
                                <img :src="category.image" alt="" />
                            </a>
                            </li>
                        </ul>
            
                        <h6 class="text-center mt-2">{{ category.name }}</h6>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <CategorySkeleton :dataAmount='10' />
                </template>             
            </div>
        </div>
        </section>
    
        <section class="section recent-part">
        <div class="container">
            <div class="row">
            <div class="col-lg-12">
                <div class="section-heading">
                <h2>recently sold items</h2>
                </div>
            </div>
            </div>
                <template v-if="products.data">
                    <ProductCart :products="products" />
                </template>
                <template v-else>
                    <ProductSkeleton :dataAmount='10'/>    
                </template>
            <div class="row">
            <div class="col-lg-12">
                <div class="section-btn-25">
                <a href="shop-4column.html" class="btn btn-outline"><i class="fas fa-eye"></i><span>show more</span></a>
                </div>
            </div>
            </div>
        </div>
        </section>

        <section class="section recent-part">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-heading">
                        <h2>Popular Items</h2>
                        </div>
                    </div>
                </div>
                    <template v-if="popular.data">
                        <ProductCart :products="popular" />
                    </template>
                    <template v-else>
                        <ProductSkeleton :dataAmount='10'/>    
                    </template>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-btn-25">
                        <a href="shop-4column.html" class="btn btn-outline"><i class="fas fa-eye"></i><span>show more</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section recent-part">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-heading">
                        <h2>Sales Items</h2>
                        </div>
                    </div>
                </div>
                    <template v-if="sale.data">
                        <ProductCart :products="sale" />
                    </template>
                    <template v-else>
                        <ProductSkeleton :dataAmount='10'/>    
                    </template>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-btn-25">
                        <a href="shop-4column.html" class="btn btn-outline"><i class="fas fa-eye"></i><span>show more</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section recent-part">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-heading">
                        <h2>Feature Products</h2>
                        </div>
                    </div>
                </div>
                    <template v-if="feature.data">
                        <ProductCart :products="feature" />
                    </template>
                    <template v-else>
                        <ProductSkeleton :dataAmount='10'/>    
                    </template>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-btn-25">
                        <a href="shop-4column.html" class="btn btn-outline"><i class="fas fa-eye"></i><span>show more</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section recent-part">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-heading">
                        <h2>Winter Products</h2>
                        </div>
                    </div>
                </div>
                    <template v-if="winter.data">
                        <ProductCart :products="winter" />
                    </template>
                    <template v-else>
                        <ProductSkeleton :dataAmount='10'/>    
                    </template>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-btn-25">
                        <a href="shop-4column.html" class="btn btn-outline"><i class="fas fa-eye"></i><span>show more</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
        <section class="section newitem-part">
        <div class="container">
            <div class="row">
            <div class="col">
                <div class="section-heading">
                <h2>collected new items</h2>
                </div>
            </div>
            </div>
            <div class="row">
                <div class="col">
                    <ul class="new-slider slider-arrow">


                        <!-- swiper js slider  -->

                        <swiper
                        :slidesPerView="5"
                        :sliderPerGroup="5"
                        :loop="true"
                        :autoplay="{
                            delay: 2000,
                        }"
                        :navigation="true"
                        :modules="newSlide"
                        class="mySwiper"
                      >
                        <swiper-slide v-for="(product, index) in newItems.data" :key="index">
                            <li>
                                <div class="product-card">
                                    <div class="product-media">
                                        <div class="product-label">
                                            <label class="label-text sale">{{ product.conditions }}</label>
                                            <label class="label-text new" v-if="product.discount">{{ product.discount }}</label>
                                        </div>
                                        <button class="product-wish wish">
                                        <i class="fas fa-heart"></i></button><router-link class="product-image" :to="{name: 'product.details'}">
                                            <img :src="product.images" alt="product" /></router-link>
                                    </div>
                                    <div class="product-content">
                                        <h6 class="product-name">
                                             <router-link :to="{name: 'product.details'}">{{ product.name }}</router-link>
                                        </h6>
                                        
                                          <ProductPrice  :price="product.price" :discount="product.discount"/>

                                        <button class="product-add" title="Add to Cart">
                                             <i class="fas fa-shopping-basket"></i><span>Add</span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </swiper-slide>
                      </swiper>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="section-btn-25">
                    <a href="shop-4column.html" class="btn btn-outline"><i class="fas fa-eye"></i><span>show more</span></a>
                    </div>
                </div>
            </div>
        </div>
     </section>
</div>
</template>

