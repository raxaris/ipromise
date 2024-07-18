<script setup lang="ts">

</script>

<template>
  <div class="navbar">
    <div @click="$router.push('/')" style="cursor: pointer; font-size: 20px"><img src="@/assets/img/logo.png" alt="iPromise"></div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/promises')">Promises</my-button>
      <my-button @click="$router.push('/about')" style="margin-left: 20px;">About</my-button>
      <my-button @click="$router.push('/store')" style="margin-left: 20px;">Vuex</my-button>
      <my-button @click="$router.push('/composition')" style="margin-left: 20px;">Composition</my-button>
    </div>
  </div>
</template>

<style scoped>
.navbar{
  height: 8vh;
  background-color: #226F54;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: white;
}

.navbar__btns{
  margin-left: auto;
}
</style>
