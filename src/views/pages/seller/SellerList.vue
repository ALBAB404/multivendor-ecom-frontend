<script setup>
// All Import File  Code Is Here......................................................................................................
import { useSeller } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
// All Variable  Code Is Here.....................................................................................................
const seller = useSeller();

const { sellers } = storeToRefs(seller);
const show = ref(10);

// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................
onMounted(() => {
  getSellers();
});

const getSellers = async (page = 1) => {
  await seller.getData(page, show.value);
};
</script>

<template lang="">
  <div>
    <section class="inner-section single-banner">
      <div class="container"><h2>Seller List</h2></div>
    </section>
    <section class="inner-section">
      <div class="container">
        <div class="row" v-if="sellers.meta">
          <div class="col-lg-12">
            <div class="top-filter">
              <div class="filter-show">
                <label class="filter-label">Show :</label
                ><select
                  class="form-select filter-select"
                  v-model="show"
                  @change="getSellers"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div
          class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 isotope-items"
        >
          <div
            class="col"
            v-for="(seller, index) in sellers.data"
            ::key="index"
          >
            <div class="product-card">
              <ul>
                <li>
                  <router-link
                    :to="{
                      name: 'seller.store',
                      params: { slug: seller.slug },
                    }"
                    class="suggest-card"
                    ><img :src="seller.image" alt="seller lists"
                  /></router-link>
                  <div class="brand-meta">
                    <h4 class="text-center">{{ seller.shop_name }}</h4>
                    <p class="text-center">
                      {{ seller.products_count }} Products
                    </p>
                    <div class="form-button">
                      <button type="submit">
                        Visit Store <i class="fas fa-angle-right"></i>
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row" v-if="sellers.meta">
          <div class="col-lg-12">
            <div class="bottom-paginate">
              <p class="page-info">
                Showing {{ sellers.meta.per_page }} of
                {{ sellers.meta.total }} Results
              </p>
              <ul class="pagination">
                <Bootstrap5Pagination
                  :data="sellers"
                  @pagination-change-page="getSellers"
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
.page-item.active .page-link {
  background: #119744;
}
</style>
