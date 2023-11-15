<script setup>
  // All Import File  Code Is Here......................................................................................................

  // All Variable  Code Is Here.....................................................................................................
  const props = defineProps({
    navCategory: {
      type: Array,
      required: true,
    },
  })

  // API Calling Code Is Here.....................................................................................................

  // All Function  Code Is Here.....................................................................................................
</script>

<template>
  <div>
    <nav class="navbar-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="navbar-content">
              <ul class="navbar-list">
                <li class="navbar-item dropdown">
                  <router-link class="navbar-link" :to="{ name: 'index.page' }">home</router-link>
                </li>

                <li class="navbar-item dropdown-megamenu">
                  <a class="navbar-link dropdown-arrow" href="#">Categories</a>
                  <div class="megamenu">
                    <div class="container">
                      <div class="row row-cols-5">
                        <div class="col" v-for="(categories, index) in navCategory.data" :key="index">
                          <div class="megamenu-wrap">
                            <router-link
                              :to="{
                                name: 'shop.page',
                                query: { products: categories.slug },
                              }"
                            >
                              <h5 class="megamenu-title">
                                {{ categories.name }}
                              </h5>
                            </router-link>
                            <ul class="megamenu-list">
                              <li v-for="(sub_category, index) in categories.sub_category" :key="index">
                                <router-link
                                  :to="{
                                    name: 'shop.page',
                                    query: { products: sub_category.slug },
                                  }"
                                >
                                  {{ sub_category.name }}
                                </router-link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li class="navbar-item dropdown-megamenu">
                  <router-link class="navbar-link" :to="{ name: 'shop.page' }">shop</router-link>
                </li>

                <li class="navbar-item dropdown-megamenu">
                  <router-link class="navbar-link" :to="{ name: 'seller.page' }">Seller List</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<style lang=""></style>
