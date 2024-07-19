<template>
  <PageNavbar/>
  <div class="app-container container-fluid d-flex justify-content-center align-items-center">
    <router-view></router-view>
  </div>
  <PageFooter/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

.app-container{
  background-color: #d9edbf;
  margin-top: 7vh;
  padding: 20px;
  min-height: 86vh;
}
</style>
<script setup lang="ts">
import PageFooter from "@/components/PageFooter.vue";
import PageNavbar from "@/components/PageNavbar.vue";
</script>