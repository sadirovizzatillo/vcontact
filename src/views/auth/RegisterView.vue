<template>
  <div class="register">
    <h2>Register</h2>
    <el-input v-model="name" placeholder="Please Name"/>
    <el-input type="email" v-model="email" placeholder="Please Email" />
    <el-input type="password" v-model="password" placeholder="Please Passwod" />
    <div class="register-btn">
      <el-button type="primary" @click="registerUser" :loading="loading">Register</el-button>
      <el-button type="info" @click="goLogin">Login</el-button>
    </div>
  </div>
</template>

<script setup>
import router from '../../router'
import  ValidateEmail from "../../helpers/gmailFormat" 
import { ElNotification } from 'element-plus'
import { ref } from 'vue'
const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const registerUser = () => {
  const result = ValidateEmail(email.value);

  loading.value = !loading.value
  if([name.value, email.value, password.value].includes("")){
    ElNotification({
      title: 'Warning',
      message: 'Please Fill the form!',
      type: 'warning',
    });
    loading.value = !loading.value
    return
  }else if(result === false){
    ElNotification({
        title: 'Warning',
        message: 'Please fill the Email space correctly!',
        type: 'warning',
      });
      loading.value = !loading.value
      return
  }
  
  const form = {
    name:name.value,
    email:email.value,
    password: password.value
  }
  localStorage.setItem("newUser", JSON.stringify(form));
  router.push({ name: "Login" })
}
const goLogin = () => {
  router.push({ name: "Login" })
}
</script>

<style scoped>
.register{
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  height: 100%;
  justify-content: center;
}
.register .el-input{
  margin-bottom: 8px;
}
.register-btn{
  display: flex;
  justify-content:flex-end;
}
</style>