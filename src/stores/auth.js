import { defineStore } from 'pinia'
import axios from 'axios';

export const useAuth = defineStore('auth', {
  state: () => ({ errors: {} }),
    actions: {
      async login(fromData) {
      
        try {
          let res = await axios.post(import.meta.env.VITE_API_URL + "/api/v1/admin/login", fromData)

          console.log(res);
          
          if (res.status == 200) {
            
            return new Promise((resolve)=>{
                resolve(res.data)
            })

          }
        } catch (error) {

          if (error.response.data) {
            return new Promise((reject)=>{
              reject(error.response.data.errors)
            })  
          }          
        }

      },
    },
  })