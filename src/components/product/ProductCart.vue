<script setup>
import { ProductPrice } from "@/components/product";
import { ref } from "vue";
import { useCart, useNotification, useAuth, useWishlist, useModal } from "@/stores";
import { storeToRefs } from "pinia";

const notify = useNotification();
const cart = useCart();
const { loading } = storeToRefs(cart);
const wishlist = useWishlist();
const auth = useAuth();
//MOdal from 
const modal = useModal();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

function addToCart(product) {
  cart.addToCart(product)
  notify.Success(`${product.name} Successfully Added Your Cart Item`);
}

const addToWishlist = async (product) => {
  if (auth.user.data) {
    let res = wishlist.addToWishlist(product);
    res.then((response) => {
      if (response.status === 200) {
        notify.Success(`${product.name} Removed Your Wishlist Items`);
        wishlist.loading = false;
      } else {
        notify.Success(
          `${product.name} Successfully Added Your Wishlist Items`
        );
        wishlist.loading = false;
      }
    });
  } else {
    modal.toggleModal()
  }
};
</script>
<template>
    <div class="col">
      <div class="product-card">
        <div class="product-media">
          <div class="product-label">
            <label class="label-text sale">{{ product.conditions }}</label>
            <label class="label-text new" v-if="product.discount">{{
              product.discount
            }}</label>
          </div>
          <button
            class="product-wish wish"
            @click.prevent="addToWishlist(product)"
          >
            <i
              class="fas fa-spinner fa-spin"
              v-if="wishlist.loading === product.id"
            ></i>
            <i class="fas fa-heart" v-else></i></button
          ><router-link class="product-image" :to="{ name: 'product.details', params: {slug: product.slug} }"
            ><img :src="$filters.makeImagePath(product.thumbnail)" alt="product"
          /></router-link>
        </div>
        <div class="product-content">
          <h6 class="product-name">
            <router-link :to="{ name: 'product.details', params: {slug: product.slug} }">{{
              product.name
            }}</router-link>
          </h6>

          <ProductPrice :price="product.price" :discount="product.discount" />

          <button
            class="product-add"
            title="Add to Cart"
            @click.prevent="addToCart(product)"
          >
            <i class="fas fa-spinner fa-spin" v-if="loading === product.id"></i>
            <i class="fas fa-shopping-basket" v-else></i><span>Add</span>
          </button>
        </div>
      </div>
    </div>
</template>
