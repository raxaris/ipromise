<script setup lang="ts">

</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid">
      <div @click="$router.push('/')" class="navbar-brand">
        <img class="logo" src="@/assets/img/logo-white.png" alt="iPromise"></div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-container collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <div class="nav-link">Личное</div>
          </li>
          <li class="nav-item">
            <div class="nav-link">Политическое</div>
          </li>
          <li class="nav-item">
            <div class="nav-link">Служба поддежки</div>
          </li>
          <li class="nav-item">
            <div class="nav-link">FAQ</div>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item d-none d-lg-block">
            <div class="nav-link">
              <font-awesome-icon icon="fa-solid fa-circle-user" />
            </div>
          </li>
          <li class="nav-item d-none d-lg-block">
            <div class="nav-link">
              <font-awesome-icon icon="arrow-right-from-bracket" />
            </div>
          </li>
          <!-- Надписи для коллапса -->
          <li class="nav-item d-lg-none">
            <a class="nav-link" @click="$router.push('/profile')">Profile</a>
          </li>
          <li class="nav-item d-lg-none">
            <a class="nav-link" @click="$router.push('/logout')">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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

.logo{
  height: 4vh;
}

.nav-link{
  color: white;
}

.navbar-container{
  background-color: #226F54;
}
</style>
