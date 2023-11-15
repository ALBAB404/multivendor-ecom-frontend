<script setup>
import { LoginFrom, Modal } from "@/components";
</script>

<template lang="">
  <div>
    <Modal>
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
    </Modal>
  </div>
</template>
