// All Import File  Code Is Here......................................................................................................
import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService.js";

export const useSeller = defineStore("seller", {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({
    sellers: [],
    loading: false,
  }),

  actions: {
    // API Calling Code Is Here.....................................................................................................

    async getData(page, show) {
      try {
        const res = await axiosInstance.get(
          `/sellers?page=${page}&show=${show}`
        );
        console.log(res);

        if (res.status === 200) {
          this.sellers = res.data;
          return new Promise((resolve) => {
            resolve(res.data);
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

    async sellerProductBySlug(slug) {
      try {
        const res = await axiosInstance.get(`/sellers/products/${slug}`);
        console.log(res.data);

        // if (res.status === 200) {
        //   this.sellers = res.data;
        //   return new Promise((resolve) => {
        //     resolve(res.data);
        //   });
        // }
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
