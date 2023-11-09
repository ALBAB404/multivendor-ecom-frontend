// All Import File  Code Is Here......................................................................................................
import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService.js";

export const useCategory = defineStore("category", {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({
    categories: {},
    loading: false,
    navCategory: [],
  }),

  actions: {
    // API Calling Code Is Here.....................................................................................................

    async getData() {
      try {
        const res = await axiosInstance.get("/categories");

        if (res.status === 200) {
          this.categories = res.data;
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

    async navCategories() {
      try {
        const res = await axiosInstance.get("/nav-categories");

        if (res.status === 200) {
          this.navCategory = res.data;
          console.log(navCategory);
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
