import apiServices from '../services/apiServices';
import router from '../router';
import { createStore } from 'vuex'
export default createStore({
  state: {
    isAuthenticated:!!localStorage.getItem("user"),
    user:JSON.parse(localStorage.getItem("user")),
    contacts:[]
  },
  getters: {
  },
  mutations: {
    LOGOUT(state){
      localStorage.clear();
      state.user = {}
      router.push({ name: "Register"})
    },
    SET_CONTRACTS(state, contacts){
      state.contacts = contacts
    },
    CHANGE_CONTACT_SINGLE(state, payload){
      const contact = state.contacts.find(c => c.id === parseInt(payload.id))
      contact.name = payload.name,
      contact.email = payload.email,
      contact.phone = payload.phone,
      contact.tag = payload.tag
    },
    SEARCH_CONTACT(state, text){
      state.contacts.forEach(c => {
        if(c.name.includes(text)){
          state.contacts = [c]
        }
      })
    }
  },
  actions: {
    logout(_){
      _.commit("LOGOUT")
    },
    async getAllContacts(_){
      try {
        const { data } =  await apiServices.getAllContacts();
        _.commit("SET_CONTRACTS", data)
      }catch(err){
        console.log(err)
      }
    },
    async addContact(_, form){
      try{
        const { data } = await apiServices.addContact(form);
        if(data.ok){
          _.dispatch("getAllContacts")
        }
      }catch(err){
        console.log(err)
      }
    },
    searchContact(_, text){
      if(text !== ""){
        _.commit("SEARCH_CONTACT", text)
      }else{
        _.dispatch("getAllContacts")
      }
    },
    async changeContact(_, form){
      try{
        const { data } = await apiServices.changeContact(form);
        if(data){
          _.commit("CHANGE_CONTACT_SINGLE", data)
        }
      }catch(err){
        console.log(err)
      }
    }
  },
})
