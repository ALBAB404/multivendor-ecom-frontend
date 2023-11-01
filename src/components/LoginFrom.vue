<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref } from "vue";

import { useAuth, useNotification } from "@/stores";
// validation error
import { Form, Field } from "vee-validate";
import * as yup from "yup";
// router pushing
import { useRouter, useRoute } from "vue-router";

// All Variable  Code Is Here.....................................................................................................
const router = useRouter();
const route = useRoute();
const auth = useAuth();
const showPassword = ref(false);
const notify = useNotification();
// API Calling Code Is Here.....................................................................................................
const onSubmit = async (values, { setErrors, resetForm }) => {
  try {
    const res = await auth.login(values);

    if (res && res.data) {
      resetForm();
      $("#login-modal").modal("hide");
      router.push({ name: route.path === "/auth/login" ? "index.page" : "" });
      notify.Success("Login Successfully Done");
    } else if (res && res.errors) {
      setErrors(res.errors);
    } else {
      console.error("Unexpected response:", res);
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any other errors here
  }
};

// All Function  Code Is Here.....................................................................................................

const schema = yup.object({
  // validation code . eta ekta package
  phone: yup.string().required("Phone Feild Is Required"),
  password: yup.string().required(),
});

const toggleShow = () => {
  // password show on and off korar jonno ei function ready kora hoise .
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="user-form-group" id="axiosForm">
    <Form
      class="user-form"
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-group">
        <Field
          name="phone"
          type="text"
          class="form-control"
          placeholder="phone no"
          :class="{ 'is-invalid': errors.phone }"
        />
        <span class="text-danger" v-if="errors.phone">{{ errors.phone }}</span>
      </div>
      <div class="form-group">
        <Field
          name="password"
          :type="showPassword ? 'text' : 'password'"
          class="form-control"
          placeholder="password"
          :class="{ 'is-invalid': errors.password }"
        />

        <span class="text-danger" v-if="errors.password">{{
          errors.password
        }}</span>
        <span class="view-password" @click="toggleShow"
          ><i
            class="fas text-success"
            :class="{
              'fa-eye': showPassword,
              'fa-eye-slash': !showPassword,
            }"
          ></i></span
        ><!--v-if-->
      </div>
      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="checkbox"
          id="check"
          value=""
        /><label class="form-check-label" for="check">Remember Me</label>
      </div>
      <div class="form-button">
        <button type="submit" :disabled="isSubmitting">
          login
          <span
            v-show="isSubmitting"
            class="spinner-border spinner-border-sm mr-1"
          ></span>
        </button>
        <p>
          Don't have any account?<router-link
            :to="{ name: 'user.register' }"
            class=""
            >register here</router-link
          >
        </p>
      </div>
    </Form>
  </div>
</template>
