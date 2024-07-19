<script setup lang="ts">

</script>

<template>
  <footer>
    <div class="container-fluid footer-container d-flex justify-content-between">
      <div class="title d-flex flex-column justify-content-center">
        <div>iPromise. Портал обещаний 2024.</div>
        <div>Все права защищены.</div>
      </div>
      <div class="links d-flex align-items-center">
        <div class="icon">
          <font-awesome-icon icon="fa-brands fa-twitter" />
        </div>
        <div class="icon">
          <font-awesome-icon icon="fa-brands fa-instagram" />
        </div>
        <div class="icon">
          <font-awesome-icon icon="fa-brands fa-facebook" />
        </div>
        <div class="support d-flex flex-column justify-content-center">
          <div>Техническая поддержка</div>
          <div>support@mitwork.kz</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
  background-color: #226F54;
  height: 7vh;
  padding: 0 100px;
  color: white;
  font-size: 12px;
}

.icon{
  display: flex;
  align-items: center;
  padding-left: 30px;
  font-size: 18px
}

.support{
  padding-left: 30px;
}
</style>
