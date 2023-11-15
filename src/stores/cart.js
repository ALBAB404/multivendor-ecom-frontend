// All Import File  Code Is Here......................................................................................................
import { defineStore } from "pinia";
import {  ref } from 'vue';
export const useCart = defineStore("cart", {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({
    cartItem: [],
    loading: false,
  }),

  persist: {
    paths: ["cartItem"],
  },

  getters: {
    totalPrice: (state) => {
      let price = 0;
      state.cartItem.map((el) => {
        price += el["price"] * el["quantity"];
      });

      return price;
    },

    cartItemCount: (state) => {
      let price = 0;
      state.cartItem.map((el) => {
        price += el["quantity"];
      });

      return price;
    },
  },

  // All Function  Code Is Here.....................................................................................................
  actions: {
    addToCart(product) {
        const price = ref();


        if (product.discount) {
        var firstPrice = product.price;
        var discount = product.discount / 100;
        var totalPrice = firstPrice - firstPrice * discount;
        price.value = totalPrice.toFixed();
          } else {
            price.value = product.price;
          }


      this.loading = product.id;

      let item = {
        id: product.id,
        name: product.name,
        price: price.value,
        thumbnail: product.thumbnail,
      };
      
      item = { ...item, quantity: 1 };
      if (this.cartItem.length > 0) {
        let boolean = this.cartItem.some((i) => i.id === item.id);
        if (boolean) {
          let index = this.cartItem.findIndex((i) => i.id === item.id);
          this.cartItem[index]["quantity"] += 1;
          console.log(this.cartItem);
        } else {
          this.cartItem.push(item);
        }
      } else {
        this.cartItem.push(item);
      }

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },

    async destroy(index) {
      if (this.cartItem.length > 0) {
        this.cartItem.splice(index, 1);
      }
    },

    async decrement(index) {
      if (this.cartItem.length > 0) {
        if (this.cartItem[index]["quantity"] !== 1) {
          this.cartItem[index]["quantity"] -= 1;
        }
      }
    },
  },
  // API Calling Code Is Here.....................................................................................................
});
