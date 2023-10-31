// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'

export const useCart = defineStore('cart', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    cartItem: [],
    cartItemCount: 0,
    loading: false,
  }),
  
  actions: {

    addToCart(product){
      let item = product;
      item = {...item, quantity : 1}
      if (this.cartItem.length > 0) {
        let boolean = this.cartItem.some((i)=> i.id === item.id);
        if (boolean) {
          let index = this.cartItem.findIndex((i)=> i.id === item.id);
          this.cartItem[index]['quantity'] += 1
          console.log(this.cartItem);
        }else{
          this.cartItem.push(item)
        }
      }else{
        this.cartItem.push(item)
      }

      this.cartItemCount++
    }



    // API Calling Code Is Here.....................................................................................................
    

  },
  })
  // All Function  Code Is Here.....................................................................................................