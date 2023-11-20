// All Import File  Code Is Here......................................................................................................
import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService.js";

export const useAddress = defineStore("address", {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({
    divisions: [],
    districts: [],
  }),

  actions: {
    // API Calling Code Is Here.....................................................................................................

    async getDivisions() {
      try {
        const res = await axiosInstance.get("/divisions");

        if (res.status === 200) {
          this.divisions = res.data.data;
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
          this.navaddress = res.data;
          console.log(navaddress);
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
