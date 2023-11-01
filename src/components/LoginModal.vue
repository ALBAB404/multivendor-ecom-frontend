<script setup>
import { LoginFrom } from "@/components";
</script>

<template lang="">
  <div>
    <div class="modal fade" id="login-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <button
            class="modal-close icofont-close"
            data-bs-dismiss="modal"
          ></button>
          <div class="product-view">
            <div class="row">
              <div class="col-12 col-sm-10 col-md-12">
                <div class="user-form-card">
                  <div class="user-form-title">
                    <h2>Customer Login</h2>
                    <p>Use your credentials to access</p>
                  </div>
                  <LoginFrom />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
