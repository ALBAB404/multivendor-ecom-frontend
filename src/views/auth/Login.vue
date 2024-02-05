
<script setup>

import {reactive, ref} from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

// validation part
const schema = yup.object({
  phone: yup.string().required(),
  password: yup.string().required().min(8),
});

import {useAuth} from '@/stores/auth';
import { storeToRefs } from 'pinia';

const auth = useAuth()
const { errors } = storeToRefs(auth)
const isToggle = ref(false)



const onSubmit = async (value, action) => {
  console.log(value);
  console.log(action);
  // await auth.login(from)
}

const togglePassword = () => {
  isToggle.value = !isToggle.value
}

</script>

<template lang="">
  <div>
    <section class="user-form-part">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-6">
            <div class="user-form-card">
              <div class="user-form-title">
                <h2>Customer Login</h2>
                <p>Use your credentials to access</p>
              </div>
              <div class="user-form-group" id="axiosForm">
                <Form class="user-form" @submit="onSubmit" :validation-schema="schema" v-slot="{errors}">
                  <!--v-if-->
                  <div class="form-group">
                    <Field
                      name="phone"
                      type="text"
                      class="form-control"
                      :class="{'is-invalid' : errors.phone}"
                      placeholder="phone no"
                    />
                    <span class="text-danger" v-if="errors.phone" >{{ errors.phone }}</span>
                    <!--v-if-->
                  </div>
                  <div class="form-group" @click.prevent="togglePassword()">
                    <Field
                      name="password"
                      :type="isToggle ? 'password' : 'text'"
                      class="form-control"
                      :class="{'is-invalid' : errors.password}"
                      placeholder="password"
                    /><span class="view-password"
                      ><i class="fas text-success fa-eye" :class="{'fa-eye-slash' : isToggle }"></i></span
                    >
                    <span class="text-danger" v-if="errors.password" >{{ errors.password }}</span>
                    <!--v-if-->
                  </div>
                  <div class="form-button">
                    <button type="submit">login</button>
                    <p>
                      Forgot your password?<a
                        href="reset-password.html"
                        class=""
                        >reset here</a
                      >
                    </p>
                  </div>
                </Form>
              </div>
            </div>
            <div class="user-form-remind">
              <p>
                Don't have any account?<router-link :to="{ name: 'user.register' }" class="">register here</router-link>
              </p>
            </div>
            <div class="user-form-footer"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
  </template>

  <style >
  
  @import "@/assets/css/user-auth.css";

  </style>