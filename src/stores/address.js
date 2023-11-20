// All Import File  Code Is Here......................................................................................................
import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService.js";

export const useAddress = defineStore("address", {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({
    divisions: [],
    districts: [],
    address: {},
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


    async districtById(id) {
      try {
        const res = await axiosInstance.get(`/district/${id}`);

        if (res.status === 200) {
          this.districts = res.data.data;
          console.log(districts);
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

    async getUserAddress () {
       try {
        const res = await axiosInstance.get(`/user/address`);

        if (res.status === 200) {
          this.address = res.data.data;
          console.log(address);
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
    }

  
  },
});
// All Function  Code Is Here.....................................................................................................
