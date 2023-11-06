<script setup>
import { ProductPrice } from "@/components/product";
import { ref } from "vue";
import { useCart, useNotification, useAuth, useWishlist } from "@/stores";
import { storeToRefs } from "pinia";

const notify = useNotification();
const cart = useCart();
const { loading } = storeToRefs(cart);
const wishlist = useWishlist();
const auth = useAuth();
const price = ref();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});



</script>
<template>
    <div>
        
    </div>
</template>
