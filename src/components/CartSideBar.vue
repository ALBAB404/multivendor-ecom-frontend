<script setup>
// All Import File  Code Is Here......................................................................................................
import { useCart } from "@/stores";
import { storeToRefs } from "pinia";

// All Variable  Code Is Here.....................................................................................................
const cart = useCart();
const { cartItemCount, cartItem, totalPrice } = storeToRefs(cart);

// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................

function cartClose() {
  $("body").css("overflow", "inherit"),
    $(".cart-sidebar").removeClass("active"),
    $(".backdrop").fadeOut();
}

// delete cart

const deleteCart = (index) => {
  cart.destroy(index);
};

//  cart decrement
const cartDecrement = (index) => {
  cart.decrement(index);
};

//  cart Increment
const cartIncrement = (product) => {
  cart.addToCart(product);
};
</script>

<template lang="">
  <div>
    <aside class="cart-sidebar">
      <div class="cart-header">
        <div class="cart-total" v-if="cartItemCount !== 0">
          <i class="fas fa-shopping-basket"></i
          ><span>total item ({{ cartItemCount }})</span>
        </div>

        <div v-else class="cart-total">
          <span>Your Cart is Empty..</span>
        </div>
        <button class="cart-close" @click="cartClose">
          <i class="icofont-close"></i>
        </button>
      </div>
      <transition name="switch" mode="out-in">
        <TransitionGroup
          name="list"
          tag="ul"
          class="cart-list"
          v-if="cartItemCount !== 0"
        >
          <li
            class="cart-item"
            v-for="(cart, index) in cartItem"
            :key="cart.id"
          >
            <div class="cart-media">
              <a href="#">
                <img :src="$filters.makeImagePath(cart.thumbnail)" alt="product" />
              </a>
              <button class="cart-delete" @click.prevent="deleteCart(index)">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
            <div class="cart-info-group">
              <div class="cart-info">
                <h6>
                  <a href="product-single.html">{{ cart.name }}</a>
                </h6>
                <p>Unit Price - {{ $filters.currencySymbol(cart.price) }}</p>
              </div>
              <div class="cart-action-group">
                <div class="product-action">
                  <button
                    class="action-minus"
                    title="Quantity Minus"
                    :disabled="cart.quantity === 1 ? true : false"
                    @click.prevent="cartDecrement(index)"
                  >
                    <i class="icofont-minus"></i></button
                  ><input
                    class="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    :value="cart.quantity"
                  />
                  <button
                    class="action-plus"
                    title="Quantity Plus"
                    @click.prevent="cartIncrement(cart)"
                  >
                    <i class="icofont-plus"></i>
                  </button>
                </div>
                <h6>
                  {{ $filters.currencySymbol(cart.price * cart.quantity) }}
                </h6>
              </div>
            </div>
          </li>
        </TransitionGroup>
        <ul v-else class="cart-list">
          <li class="cart-item margin_cs">
            <img
              src="@/assets/images/cart/cart.png"
              class="cart-image"
              alt=""
            />
          </li>
          <h3 class="text-center">Your Cart is Empty.</h3>
        </ul>
      </transition>
      <div class="cart-footer">
        <router-link
          class="cart-checkout-btn"
          :to="{
            name: 'checkout.page',
          }"
          ><span class="checkout-label">Proceed to Checkout</span
          ><span class="checkout-price">{{
            $filters.currencySymbol(totalPrice)
          }}</span></router-link
        >
      </div>
    </aside>
  </div>
</template>

<style>
.cart-image {
  width: 50%;
}

.margin_cs {
  margin-top: 100px;
}

.list-move,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.switch-enter-from,
.switch-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.switch-enter-active,
.switch-leave-active {
  transition: all 0.5s ease;
}
</style>
