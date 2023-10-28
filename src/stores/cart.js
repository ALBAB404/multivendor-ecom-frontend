// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'

export const useCart = defineStore('cart', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    cartItem: [],
    loading: false,
  }),
  
  actions: {

    addToCart(product){
      let item = product;
      item = {...item, quantity : 1}
      if (this.cartItem.length > 0) {
        
      }else{
        this.cartItem.push(product)
      }
    }



    // API Calling Code Is Here.....................................................................................................
    

  },
  })
  // All Function  Code Is Here.....................................................................................................