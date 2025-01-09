<template>
    <div>
      <h1>Product List</h1>
      <select v-model="selectedCategory" @change="filterByCategory">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <div class="products">
        <div v-for="product in paginatedProducts" :key="product.id" class="product-card" @click="goToProduct(product.id)">
          <h3>{{ product.title }}</h3>
          <p>
            Price: ${{ product.price }}
          </p>
          <p>
            Rating: {{ product.rating.rate }} / 5
          </p>
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        products: [],
        categories: [],
        selectedCategory: '',
        currentPage: 1,
        itemsPerPage: 10,
      };
    },
    computed: {
      filteredProducts() {
        if (this.selectedCategory) {
          return this.products.filter((product) => product.category === this.selectedCategory);
        }
        return this.products;
      },
      paginatedProducts() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredProducts.slice(start, start + this.itemsPerPage);
      },
      totalPages() {
        return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
      },
    },
    methods: {
      async fetchProducts() {
        const response = await axios.get('https://fakestoreapi.com/products');
        this.products = response.data;
      },
      async fetchCategories() {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        this.categories = response.data;
      },
      filterByCategory() {
        this.currentPage = 1;
      },
      goToProduct(id) {
        this.$router.push(`/product/${id}`);
      },
      nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++;
      },
      prevPage() {
        if (this.currentPage > 1) this.currentPage--;
      },
    },
    mounted() {
      this.fetchProducts();
      this.fetchCategories();
    },
  };
  </script>