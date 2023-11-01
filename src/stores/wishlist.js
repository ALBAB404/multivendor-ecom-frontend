// All Import File  Code Is Here......................................................................................................
import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService.js";
import { useAuth } from "@/stores";

// All Variable  Code Is Here.....................................................................................................
export const useWishlist = defineStore("wishlist", {
  state: () => ({
    wishlists: {},
    loading: false,
  }),

  actions: {
    // API Calling Code Is Here.....................................................................................................

    async index(product) {
      try {
        const res = await axiosInstance.get("user/wishlists");

        if (res.status === 200) {
          const auth = useAuth();
          auth.user.meta.wishlist = res.data.data;
        }
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data);
          });
        }
      }
    },
    async addToWishlist(product) {
      this.loading = product.id;
      try {
        const res = await axiosInstance.post("user/wishlists", {
          product_id: product.id,
        });

        if (res.status) {
          const auth = useAuth();
          if (res.status === 201) {
            // attach
            auth.user.meta.wishlist.unshift(product);
          } else {
            // detach
            const index = auth.user.meta.wishlist.findIndex(
              (i) => i.id === product.id
            );
            auth.user.meta.wishlist.splice(index, 1);
          }
          return new Promise((resolve) => {
            resolve(res);
          });
        }
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data);
          });
        }
      }
    },
  },
});
// All Function  Code Is Here.....................................................................................................
