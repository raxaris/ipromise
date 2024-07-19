<script setup lang="ts">

</script>

<template>
<button class="sso-button">
  <slot></slot>
</button>
</template>

<style>
.sso-button{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 0;
  border-radius: 7px;
  border: 1px solid #828282;
  background-color: #fff;
  color: #000000;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 15px;
  box-sizing: border-box;
}

.sso-button:hover{
  background-color: #000000;
  color: #fff;
}

.sso-button img{
  width: 30px;
}
</style>