<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  const offcanvasElement = document.getElementById('offcanvasNavbar');
  const toggleButton = document.querySelector('[data-bs-toggle="offcanvas"]') as HTMLButtonElement;
  const closeButton = document.querySelector('[data-bs-dismiss="offcanvas"]') as HTMLButtonElement;

  if(offcanvasElement) {
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        offcanvasElement.classList.add('custom-show');
      });
    }

    offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
      offcanvasElement.classList.remove('custom-show');
    });
  }
});

</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid">
      <div @click="$router.push('/')" class="navbar-brand">
        <img class="logo" src="@/assets/img/logo-white.png" alt="iPromise"></div>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <div class="title-offcanvas">Меню</div>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav">
            <li class="nav-item">
              <div @click="$router.push('/feed')" class="nav-link">ЛИЧНОЕ</div>
            </li>
            <li class="nav-item">
              <div @click="$router.push('/political')" class="nav-link">ПОЛИТИЧЕСКОЕ</div>
            </li>
            <li class="nav-item">
              <div @click="$router.push('/faq')" class="nav-link">FAQ</div>
            </li>
<!--            <li class="nav-item">-->
<!--              <div class="input-group custom-input-group flex-nowrap">-->
<!--                <span class="input-group-text" id="addon-wrapping"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></span>-->
<!--                <input type="text" class="form-control" placeholder="Поиск" aria-label="main-input" aria-describedby="addon-wrapping">-->
<!--              </div>-->
<!--            </li>-->
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item d-none d-lg-block fa">
              <div @click="$router.push('/profile')" class="nav-link fa">
                <font-awesome-icon icon="fa-solid fa-circle-user" />
              </div>
            </li>
            <li class="nav-item d-none d-lg-block fa">
              <div class="nav-link fa">
                <font-awesome-icon icon="bell" />
              </div>
            </li>
            <li class="nav-item d-none d-lg-block fa">
              <div @click="$router.push('/logout')" class="nav-link fa">
                <font-awesome-icon icon="arrow-right-from-bracket" />
              </div>
            </li>
            <!-- Надписи для коллапса -->
            <li class="nav-item d-lg-none">
              <div class="nav-link">УВЕДОМЛЕНИЯ</div>
            </li>
            <li class="nav-item d-lg-none">
              <div class="nav-link" @click="$router.push('/profile')">ПРОФИЛЬ</div>
            </li>
            <li class="nav-item d-lg-none">
              <div class="nav-link">ВЫХОД</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

.navbar{
  height: 7vh;
  background-color: #226F54;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: white;
}

.logo{
  height: 4vh;
  margin-right: 30px;
  cursor: pointer;
}

.nav-item{
  display: flex;
  align-items: center;
  cursor: pointer;
}
.nav-item.fa{
  padding-left: 5px;
}

.nav-link{
  color: white;
  font-weight: 600;
  font-size: 13px;
  text-align: center
}

.nav-link:hover{
  color: #fe8f4c;
}

.nav-link.fa{
  font-size: 18px;
}

.custom-show{
  background: linear-gradient(#11372a, #000000);
  color: white;
}

.title-offcanvas{
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
}

.custom-input-group {
  padding-left: 20px;
  max-height: 30px;
  max-width: 200px;
}


</style>
