// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";




export const useShop = defineStore('shop', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    products: [],
  }),
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
    async getData(page, show, sort) {
      try {
        const res = await axiosInstance.get(`/products-shop?page=${page}&show=${show}&sort=${sort}`);

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


    async sideBar() {
      try {
        const res = await axiosInstance.get("/shop-sideBar");

        console.log(res);

        // if (res.status === 200) {
        //     this.products = res.data;
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
  })
  // All Function  Code Is Here.....................................................................................................