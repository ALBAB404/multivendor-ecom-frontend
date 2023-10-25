
<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref, reactive, onMounted} from 'vue';

import {useAuth} from '@/stores/auth';
// validation error 
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
// router pushing 
import { useRouter } from 'vue-router'
// notification massage
import { ElNotification } from 'element-plus'

// All Variable  Code Is Here.....................................................................................................
const router = useRouter();

const auth = useAuth();

const showPassword = ref(false);

const sendOtp = ref(true);
const verifyFrom =  reactive({
  phone: '01686381998',
  otp_code: '',
});

var intervalTimer;
// API Calling Code Is Here.....................................................................................................
const onSubmit = async (values, { setErrors }) => {
    const res = await auth.register(values);    // auth.js a register() function ase.
    if (res) {
      sendOtp.value = true
      setTime(120);
      ElNotification({
        title: 'Success',
        message: 'OTP Send Success',
        type: 'success',
        position: 'top-left',
      });
    }else {
      setErrors(res);
    }
};

const otpVerify = async (values, { setErrors }) => {
  const res = await auth.otpVerify(verifyFrom);    // auth.js a otpVerify() function ase.
    if (res) {
      router.push({ name: 'index.page' });
      sendOtp.value = false
      ElNotification({
        title: 'Success',
        message: 'Register Successfully Done',
        type: 'success',
        position: 'top-left',
      });
    }else {
      setErrors(res);
    }
};

// resend otp code

const resendOtp = async () => {
  const res = await auth.resendOtp(verifyFrom.phone);
  if (res) {
    setTime(120);

    notify.Success("Otp Send Success");
  }
};
// All Mounted or other codes is here  Code Is Here.....................................................................................................


// All Function  Code Is Here.....................................................................................................

//Register validation code is here.
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
  //Otp validation code is here.
  const schemaOtpVerify = yup.object({
    otp_code : yup.number().required("Please Input Your OTP Code").min(6),
  })


const  toggleShow = () => {
  showPassword.value = !showPassword.value;
}


// start Count-Down
const timeLeft = ref("00:00");
var intervalTimer;

function setTime(seconds) {
  clearInterval(intervalTimer);
  timer(seconds);
}

function timer(seconds) {
  const now = Date.now();
  const end = now + seconds * 1000;
  displayTimeLeft(seconds);
  countdown(end);
}
function countdown(end) {
  // this.initialTime = this.selectedTime;
  intervalTimer = setInterval(() => {
    const secondsLeft = Math.round((end - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(intervalTimer);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(secondsLeft) {
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  timeLeft.value = `${zeroPadded(minutes)}:${zeroPadded(seconds)}`;
}

function zeroPadded(num) {
  return num < 10 ? `0${num}` : num;
}




</script>

<template lang="">
  <div>
    <section class="user-form-part">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-6">
            <div class="user-form-card">
              <div class="user-form-title" v-if="!sendOtp"><h2>Customer Register</h2></div>
              <div class="user-form-title" v-else><h2>Verify Your OPT Code</h2></div>              
              <div class="user-form-group" id="axiosForm" v-if="!sendOtp">
                <Form class="user-form" @submit="onSubmit" :validation-schema="schema" v-slot="{errors, isSubmitting}">
                  
                  <div class="form-group">
                    <Field 
                      name = "phone"
                      type="text"
                      class="form-control"
                      placeholder="phone no"
                      v-model="verifyFrom.phone"
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
              <div class="user-form-group" id="axiosForm" v-else>
                <Form class="user-form" @submit="otpVerify" :validation-schema="schemaOtpVerify" v-slot="{errors, isSubmitting}">
                  
                  <div class="form-group">
                    <Field 
                      name = "otp_code"
                      type="text"
                      class="form-control"
                      placeholder="OTP-CODE"
                      v-model="verifyFrom.otp_code"
                      :class ="{'is-invalid': errors.otp_code}"
                    />
                    <span class="text-danger">{{ errors.otp_code }}</span>
                  </div>

                  <a href="javascript::void(0)" class="text-success otp_cs" v-if="timeLeft === '00:00'" @click="resendOtp" >Resend Otp</a>
                  <a href="javascript::void(0)" class="text-success otp_cs" v-else >{{ timeLeft }}</a>
                  
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

  .otp_cs {
    float: right;
  }

  </style>