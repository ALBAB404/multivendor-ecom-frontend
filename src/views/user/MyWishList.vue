<script setup>
// All Import File  Code Is Here......................................................................................................
import { useAuth, useNotification } from "@/stores";
import { ProductPrice } from "@/components/product";
import { storeToRefs } from "pinia";

// All Variable  Code Is Here.....................................................................................................
const auth = useAuth();
const { user } = storeToRefs(auth);

// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................
</script>

<template>
  <div>
    <section class="inner-section single-banner">
      <div class="container">
        <h2>wishlist</h2>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="index.html">My Wishlist</a>
          </li>
        </ol>
      </div>
    </section>
    <section class="inner-section wishlist-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="table-scroll">
              <table class="table-list">
                <thead>
                  <tr>
                    <th scope="col">Serial</th>
                    <th scope="col">Product</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">shopping</th>
                    <th scope="col">action</th>
                  </tr>
                </thead>
                <tbody v-if="auth.user.data">
                  <tr
                    v-for="(product, index) in user.meta.wishlist"
                    :key="index"
                  >
                    <td class="table-serial">
                      <h6>{{ ++index }}</h6>
                    </td>
                    <td class="table-image">
                      <img :src="product.thumbnail" alt="product" />
                    </td>
                    <td class="table-name">
                      <h6>{{ product.name }}</h6>
                    </td>
                    <td class="table-price">
                      <!-- <h6 class="product-price"><span>৳1,859</span></h6> -->
                      <ProductPrice
                        :price="product.price"
                        :discount="product.discount"
                      />
                    </td>
                    <td class="table-shop">
                      <button class="product-add" title="Add to Cart">
                        add to cart</button
                      ><!-- fas fa-spinner fa-spin -->
                    </td>
                    <td class="table-action">
                      <a
                        class=""
                        href="javascript::void(0)"
                        title="Remove Wishlist"
                        ><i class="icofont-trash"></i
                      ></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center mt-5">
              <button class="btn btn-outline">Load more items</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>
