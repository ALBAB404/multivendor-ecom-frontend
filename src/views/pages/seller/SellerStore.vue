<script setup>
// All Import File  Code Is Here......................................................................................................
import { useRoute } from "vue-router";
import { useSeller } from "@/stores";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
// all components 
import {ProductCart, ProductPrice} from '@/components/product'
import { ProductSkeleton} from '@/components/skeleton'

// All Variable  Code Is Here.....................................................................................................
const route = useRoute();
const seller = useSeller();
const {products} = storeToRefs(seller)
const show = ref(10);
const sort = ref('default');

// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................
const getSellersProduct = (page = 1) => {
  seller.sellerProductBySlug(route.params.slug, page, show.value, sort.value);
}

onMounted(() => {
  getSellersProduct();
});
</script>

<template lang="">
  <div v-if="products.data">
    <section
      class="single-banner"
      style="
        background: url('//website/images/single-banner.jpg') center center
          no-repeat;
      "
    >
      <div class="container"><h2>Seller Products</h2></div>
    </section>
    <div class="brand-single">
      <a href="#"
        ><div>
          <img
            :src="products.data.image"
            alt="product"
          /></div></a
      ><a href="#"><h3>{{ products.data.shop_name }}</h3></a>
    </div>
    <section class="inner-section shop-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="top-filter">
              <div class="filter-show">
                <label class="filter-label">Show :</label
                ><select
                  class="form-select filter-select"
                  v-model="show"
                  @change="getSellersProduct"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>
              <div class="filter-short">
                <label class="filter-label">Short by :</label
                ><select class="form-select filter-select"
                  v-model="sort"
                  @change="getSellersProduct"
                >
                  <option value="default">default</option>
                  <option value="new">New</option>
                  <option value="popular">Popular</option>
                  <option value="winter">Winter</option>
                  <option value="feature">Feature</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <template v-if="products.data">                
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
              <ProductCart :product="product" v-for="(product, index) in products.products[0].data" :key="index" />
          </div>
        </template>
        <template v-else>
            <ProductSkeleton :dataAmount='10'/>    
        </template>

        <div class="row" v-if="products.data">
          <div class="col-lg-12">
            <div class="bottom-paginate">
              <p class="page-info">
                Showing {{ products.products[0].per_page }} of
                {{ products.products[0].total }} Results
              </p>
              <ul class="pagination">
                <Bootstrap5Pagination
                  :data="products.products[0]"
                  @pagination-change-page="getSellersProduct"
                >
                  <template #prev-nav>
                    <a class="page-link" href="#"
                      ><i class="fas fa-long-arrow-alt-left"></i
                    ></a>
                  </template>
                  <template #next-nav>
                    <a class="page-link" href="#"
                      ><i class="fas fa-long-arrow-alt-right"></i
                    ></a>
                  </template>
                </Bootstrap5Pagination>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<style>
@import "@/assets/css/brand-single.css";
</style>
