
<script setup>

import { ref} from 'vue';

import {useAuth} from '@/stores/auth';
// validation error 
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
// router pushing 
import { useRouter } from 'vue-router'
// notification massage
import { ElNotification } from 'element-plus'


const router = useRouter()

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string().required(),
  password: yup.string().required().min(8),
  password_confirmation: yup.string().required('password confirmation is a required field').min(8).oneOf(
      [yup.ref("password"), null],
      "password and confirm password must be match"
    ),
})

const auth = useAuth()
const showPassword = ref(false)


const onSubmit = async (values, { setErrors }) => {
  try {
    const res = await auth.register(values);

    if (res.status === 200) {
      router.push({ name: 'index.page' });
      ElNotification({
        title: 'Success',
        message: 'Register Successfully Done',
        type: 'success',
        position: 'top-left',
      });
    }else {
      console.error('Unexpected response:', res);
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle any other errors here
  }
};


const  toggleShow = () => {
  showPassword.value = !showPassword.value;
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
                <h2>Customer Register</h2>
                <p>Use your credentials to access</p>
              </div>
              <div class="user-form-group" id="axiosForm">
                <Form class="user-form" @submit="onSubmit" :validation-schema="schema" v-slot="{errors, isSubmitting}">
                  
                  <div class="form-group">
                    <Field 
                      name = "phone"
                      type="text"
                      class="form-control"
                      placeholder="phone no"
                      :class ="{'is-invalid': errors.phone}"
                    />
                    <span class="text-danger">{{ errors.phone }}</span>
                  </div>

                  <div class="form-group">
                    <Field 
                      name = "name"
                      type="text"
                      class="form-control"
                      placeholder="name"
                      :class ="{'is-invalid': errors.name}"
                    />
                    <span class="text-danger">{{ errors.name }}</span>
                  </div>

                  <div class="form-group">
                    <Field 
                      name = "email"
                      type="text"
                      class="form-control"
                      placeholder="email"
                      :class ="{'is-invalid': errors.email}"
                    />
                    <span class="text-danger">{{ errors.email }}</span>
                  </div>
                  <div class="form-group">
                    <Field 
                      name = "password"
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      placeholder="password"
                      :class ="{'is-invalid' : errors.password}"
                    />

                    <span class="text-danger" v-if="errors.password">{{ errors.password }}</span>
                    <span class="view-password" @click="toggleShow"
                      ><i class="fas text-success" :class="{
                        'fa-eye' : showPassword,
                        'fa-eye-slash' : !showPassword,
                      }"></i></span
                    >
                  </div>

                  <div class="form-group">
                    <Field 
                      name = "password_confirmation"
                      :type="showPassword ? 'text' : 'password_confirmation'"
                      class="form-control"
                      placeholder="Retype Password"
                      :class ="{'is-invalid' : errors.password_confirmation}"
                    />

                    <span class="text-danger" v-if="errors.password_confirmation">{{ errors.password_confirmation }}</span>
                    <span class="view-password" @click="toggleShow"
                      ><i class="fas text-success" :class="{
                        'fa-eye' : showPassword,
                        'fa-eye-slash' : !showPassword,
                      }"></i></span
                    >
                  </div>
                  
                  <div class="form-button">
                    <button type="submit" :disabled="isSubmitting">Register
                      <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    </button>
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
                 have any account?<router-link :to="{ name: 'user.login' }" class="">Login here</router-link>
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