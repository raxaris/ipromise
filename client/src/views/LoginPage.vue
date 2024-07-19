<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import SSOButton from '@/components/UI/SSOButton.vue';
import FormInput from "@/components/UI/TextInput.vue";

const loginQuery = ref('');
const passwordQuery = ref('');

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      login: loginQuery.value,
      password: passwordQuery.value
    });
    console.log('Успешный вход', response.data);
  } catch (error) {
    console.error('Ошибка при входе', error);
  }
};

const loginWithGoogle = () => {
  console.log("Logged with google")
};

const loginWithFacebook = () => {
  console.log("Logged with facebook")
};
</script>

<template>
  <div class="login-container d-flex align-items-center justify-content-center">
    <div class="login-card">
      <img src="@/assets/img/logo.png" alt="iPromise" class="logo" />
      <form @submit.prevent="login" class="d-flex flex-column">
        <FormInput v-model="loginQuery" label="Имя пользователи или эл. адрес"></FormInput>
        <FormInput v-model="passwordQuery" label="Пароль"></FormInput>
        <button class="btn" type="submit">Войти</button>
      </form>
      <div class="alternative-login d-flex flex-column justify-content-center">
        <div class="bridge d-flex">
          <hr class="line">
          <span>Или</span>
          <hr class="line">
        </div>
        <div class="enter">
          <span class>Войти через</span>
        </div>
        <div class="auth-buttons d-flex row justify-content-between align-items-center">
          <div class="col-12 col-xl-6 px-1">
            <SSOButton class="auth-button" @click="loginWithGoogle">
              <img src="@/assets/img/google.png" alt="google">
              <span>Google</span>
            </SSOButton>
          </div>
          <div class="col-12 col-xl-6 px-1">
            <SSOButton class="auth-button" @click="loginWithFacebook">
              <img src="@/assets/img/facebook.png" alt="facebook">
              <span>Facebook</span>
            </SSOButton>
          </div>
        </div>
      </div>
      <div class="additional-links">
        <div class="link"><span>Забыли пароль?</span><a href="/reset-password">Восстановить</a></div>
        <div class="link"><span>У вас ещё нет аккаунта?</span> <a href="/register">Зарегистрироваться</a></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  background-color: #d9edbf;
  width: 100%;
}

.login-card {
  width: 30%;
  text-align: center;
}

.logo {
  width: 200px;
}

input {
  margin-bottom: 15px;
  padding: 8px 10px;
  border: 1px solid #828282;
  border-radius: 7px;
  font-size: 14px;
}

input:focus {
  box-shadow: 0 0 0 1px #226F54;
  outline: none;
}

.btn {
  padding: 10px;
  background-color: #226F54;
  color: white;
  border: none;
  border-radius: 7px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.btn:hover {
  background-color: #185c45;
  color: white;
}

form{
  margin-bottom: 10px;
}
.alternative-login {
  color: #828282;
}

.bridge{
  display: flex;
  align-items: center;
  text-align: center;
}

.line {
  flex: 1;
  border: none;
  height: 2px;
  background-color: #828282;
}

.alternative-login span {
  font-size: 14px;
  padding: 0 15px;
}

.enter{
  margin-bottom: 5px;
}

.auth-buttons{
  margin-top: 10px;
}

.auth-button{
  width: 100%;
}

.link{
  font-size: 14px;
  color: #828282;
  padding: 5px 0;
}

.link span{
  padding-right: 5px;
}

.link a{
  color: #828282;
  text-decoration: none;
}

.link a:hover{
  color: #226F54;
  text-decoration: underline;
}
</style>