<template>
    <el-aside width="200px" class="site-aside">
        <div class="aside-top">
            <h3>Vcontact</h3>
        </div>
        <ul class="routes-list">
            <li v-for="(route, id) in routes" :key="id" @click="setActive(route.id)" :class="[activeId === route.id ? 'active' : '']">
                <router-link :to="{ name: `${route.path}`}">
                    {{ route.name }}
                </router-link>
            </li>
        </ul>
    </el-aside>
</template>

<script setup>
import { reactive, ref } from "@vue/runtime-core"
const activeId = ref(1)
const routes = reactive([
{
    id:1,
    name:"All Contacts",
    path:"AllContact",
},
])

const setActive = (id) => {
    activeId.value = id
}
</script>

<style scoped>
.site-aside{
  background-color: darkslategray;
}
.aside-top h3{
  color: #fff;
}
.routes-list{
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.routes-list li {
    padding: 8px;
}
.active{
    background: darkgray;
}
.routes-list li a{
    text-decoration: none;
    color: aliceblue;
}
</style>