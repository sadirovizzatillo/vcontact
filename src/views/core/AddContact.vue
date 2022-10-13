<template>
    <div>
        <ul class="add-contact__list">
            <li class="add-contact__list-item">
                <label for="name">Name</label>
                <el-input type="text" id="name" name="name" v-model="name"></el-input>
            </li>
            <li class="add-contact__list-item">
                <label for="email">Email</label>
                <el-input type="email" id="email" name="email" v-model="email" pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"></el-input>
            </li>
            <li class="add-contact__list-item">
                <label for="phone">Phone</label>
                <el-input type="tel" id="phone" name="phone" v-model="phone"></el-input>
            </li>
            <li class="add-contact__list-item">
                <label for="tag">Tag</label>
                <el-input type="text" id="tag" name="tag" v-model="tag"></el-input>
            </li>
        </ul>
        
        <div class="add-contact__bottom">
            <el-button type="primary" @click="AddContact">Add Contact</el-button>
            <el-button @click="(() => this.$router.go(-1))">Back</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity"
import router from "../../router"
import ValidateEmail from "../../helpers/gmailFormat"
import store from "../../store"
import { ElNotification } from 'element-plus'
// import { ref } from "./runtime-core"

const name = ref(null)
const email = ref(null)
const phone = ref(null)
const tag = ref(null)

const AddContact = async () => {
    const result = await ValidateEmail(email.value);
    if(result === true){
        const form = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            tag: tag.value
        }
        
        await store.dispatch("addContact", form)
        
        router.go(-1)
    }else{
        ElNotification({
            title: 'Warning',
            message: 'Please fill the Email space correctly!',
            type: 'warning',
        });
        return
    }
    
}
</script>

<style scoped>
.add-contact__list{
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.add-contact__list-item{
    width: 40%;
}
ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
    margin-bottom: 32px;
}
.add-contact__bottom{
    display: flex;
    justify-content: flex-start;
}
</style>