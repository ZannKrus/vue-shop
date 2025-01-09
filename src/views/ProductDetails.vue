<template>
    <div v-if="product && product.rating">
      <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
      <p>Rating: {{ product.rating.rate }} / 5 ({{ product.rating.count }} reviews)</p>
      <button @click="addToCart">Add to Cart</button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
</template>
  
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      product: null,
    };
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${this.$route.params.id}`
        );
        this.product = response.data;
      } catch (error) {
        console.error("Ошибка загрузки данных товара:", error);
      }
    },
    addToCart() {
      if (this.product) {
        this.$store.commit("addToCart", this.product);
      }
    },
  },
  mounted() {
    this.fetchProduct();
  },
};
</script>
