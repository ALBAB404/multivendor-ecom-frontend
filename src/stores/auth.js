import { defineStore } from 'pinia'
import axios from 'axios';

export const useAuth = defineStore('auth', {
    actions: {
      async login(fromData) {
       const res = await axios.post(import.meta.env.VITE_API_URL + "/api/v1/admin/login", fromData)
       console.log(res);
      },
    },
  })