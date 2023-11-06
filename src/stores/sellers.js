// All Import File  Code Is Here......................................................................................................
import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService.js";

export const useSeller = defineStore("seller", {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({
    sellers: [],
    products: {}, 
  }),

  actions: {
    // API Calling Code Is Here.....................................................................................................

    async getData(page, show) {
      try {
        const res = await axiosInstance.get(
          `/sellers?page=${page}&show=${show}`
        );

        if (res.status === 200) {
          this.sellers = res.data;
        }
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data);
          });
        }
      }
    },

    async sellerProductBySlug(slug, page, show, sort) {
      try {
        const res = await axiosInstance.get(`/sellers/products/${slug}?page=${page}&show=${show}&sort=${sort}`);

        if (res.status === 200) {
          this.products = res.data;
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
