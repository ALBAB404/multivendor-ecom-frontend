// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";




export const useProduct = defineStore('product', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    products: {},
    sale:[],
    popular:[],
    feature:[],
    winter:[],
    loading: false,
  }),
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
    async getData(type = "") {
      try {
        const res = await axiosInstance.get("/products?conditions="+type);

        if (res.status === 200) {

          if(type === 'sale'){
            this.sale = res.data;
          }else if (type === 'popular'){
            this.popular = res.data ;
          }else if (type === 'feature'){
            this.feature = res.data ;
          }else if (type === 'winter'){
            this.winter = res.data ;
          }else{
            this.products = res.data ;
          }

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
    
    
   

  },
  })
  // All Function  Code Is Here.....................................................................................................