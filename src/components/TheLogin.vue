<template>
  <div class="register">
    <h2>Login</h2>
    <el-input v-model="username" placeholder="Please Name" />
    <el-input type="password" v-model="userpassword" placeholder="Please Password" />
    <div class="register-btn">
      <el-button type="primary" @click="goRegister">Register</el-button>
      <el-button type="info" @click="submitUser" :loading="loading">Login</el-button>
    </div>
  </div>
</template>

<script setup>
import router from '../router'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'
const username = ref('')
const userpassword = ref('')
const loading = ref(false)
const submitUser =  async () => {
  loading.value = !loading.value

  if([username.value, userpassword.value].includes("")){
    ElNotification({
      title: 'Warning',
      message: 'Please Fill the form!',
      type: 'warning',
    })
    loading.value = !loading.value

    return
  }
  const form = {
    name:username.value,
    password:userpassword.value
  }
  loading.value = !loading.value
  const data =  await JSON.parse(localStorage.getItem("newUser"));
  const result =   checkUser(data)
  if(result === true){
    localStorage.setItem("user", JSON.stringify(form))
      router.push({ name: 'home' })
  }
}

const checkUser = (data) => {
  const { name, password } = data;
  
  if(username.value === name && userpassword.value === password){
    ElNotification({
      title: 'Success',
      message: `Hi ${name}, Welcome to the VContact platform)`,
      type: 'success',
    })
    return true
  }else{
    ElNotification({
      title: 'Warning',
      message: `Please register or fill the form correctly(`,
      type: 'warning',
    })
    loading.value = !loading.value
    return false
  }
}
const goRegister = () => {
  router.push({ name: "Register" })
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