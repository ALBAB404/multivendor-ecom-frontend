// All Import File  Code Is Here......................................................................................................
import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService.js";

export const useShop = defineStore("shop", {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({
    products: [],
    sideBar: [],
  }),

  actions: {
    // API Calling Code Is Here.....................................................................................................

    async getData(
      page,
      show,
      condition,
      brand,
      category,
      price_range,
      search,
      sort
    ) {
      try {
        const res = await axiosInstance.get(`/products-shop`, {
          params: {
            page,
            show,
            condition,
            brand: brand,
            category: category,
            price_range: price_range,
            search: search.length >= 3 ? search : "",
            sort: sort,
          },
        });

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

    async sideBarData() {
      try {
        const res = await axiosInstance.get("/shop-sideBar");
        if (res.status === 200) {
          this.sideBar = res.data;
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
