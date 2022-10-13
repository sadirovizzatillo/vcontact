
<template>
    <div class="contacts-header">
        <h3>Contacts</h3>
        <el-button type="primary" @click="(() => this.$router.push({ name: 'AddContact'}))">Add Contact</el-button>
    </div>
    
    <div class="search-wrapper">
        <el-input v-model="search"  placeholder="Please input" @input="searchContact($event)" clearable/>
    </div>
    <el-table :data="allContracts" border style="width: 100%">
        <el-table-column prop="name" label="Name"/>
        <el-table-column prop="phone" label="Phone" width="150"/>
        <el-table-column prop="tag" label="Tag" />
        <el-table-column prop="email" label="Email" width="220"/>
        <el-table-column label="Actions">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog
    v-model="dialog"
    title="Warning"
    width="30%"
    align-center
    >
    <ul class="edit-list" v-if="editable">
        <li class="edit-list__item">
            <label for="name">Name</label>
            <el-input type="text" id="name" name="name" v-model="editName"></el-input>
        </li>
        <li class="edit-list__item">
            <label for="phone">Phone</label>
            <el-input type="tel" id="phone" name="phone" v-model="editPhone"></el-input>
        </li>
        <li class="edit-list__item">
            <label for="email">Email</label>
            <el-input type="email" id="email" name="email" v-model="editEmail"></el-input>
        </li>
        <li class="edit-list__item">
            <label for="tag">Tag</label>
            <el-input type="email" id="tag" name="tag" v-model="editTag"></el-input>
        </li>
    </ul>
    <h3 v-else>Do you want to delete this contact ?</h3>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="modaDialog" >Cancel</el-button>
            <el-button type="primary" @click="ChangeDialog()">Confirm</el-button>
        </span>
    </template>
</el-dialog>
</template>

<script setup>
// import router from "@/router"
import apiServices from "../../services/apiServices"
// import { computed, onMounted, ref } from "../../../node_modules/vue"
import { useStore } from "vuex"
import { ref } from "@vue/reactivity"
import { computed, onMounted } from "@vue/runtime-core"
const store = useStore()

const dialog = ref(false)
const editName = ref(null)
const editEmail = ref(null)
const editPhone = ref(null)
const editable = ref(true)
const deleteId = ref(null)
const editId = ref(null)
const editTag = ref(null)
const edit = ref(false)
const search = ref(null)

onMounted(() => {
    store.dispatch("getAllContacts");
})

const modaDialog = () => {
    dialog.value = !dialog.value
}

const searchContact = (e) => {
    store.dispatch("searchContact", e)
}


const  ChangeDialog = async () => {
    dialog.value = !dialog.value
    if(edit.value === true){
        const form = {
            name: editName.value,
            email: editEmail.value,
            phone: editPhone.value,
            id: editId.value,
            tag: editTag.value
        }
        store.dispatch("changeContact", form)
    }
    if(deleteId.value){
        const id = deleteId.value
        try{
            const { data } = await apiServices.deleteContact(id);
            if(data){
                await store.dispatch("getAllContacts")
            }
        }catch(err){
            console.log(err)
        }
    }
    
}

const handleEdit = (data) => {
    dialog.value = !dialog.value
    editable.value = true
    edit.value = true
    if(data){
        console.log(data)
        const { name, phone, email, id, tag } = data
        editEmail.value = email;
        editName.value = name;
        editPhone.value = phone;
        editId.value = id,
        editTag.value = tag
    }
}

const handleDelete = (data) => {
    dialog.value = !dialog.value
    editable.value = false
    edit.value = false
    if(data){
        deleteId.value = data.id
    }
}

const allContracts = computed(() => {
    return store.state.contacts
})

</script>


<style scoped>
.contacts-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.search-wrapper{
    max-width: 300px;
    margin-bottom: 16px;
}
.dialog-footer button:first-child {
    margin-right: 10px;
}
ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
}
.edit-list__item{
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
}
.edit-list__item label{
    text-align: left;
    margin-bottom: 8px;
}
</style>