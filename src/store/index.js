// import apiServices from '../services/apiServices';
import router from '../router';
import { createStore } from 'vuex'
export default createStore({
  state: {
    isAuthenticated:!!localStorage.getItem("user"),
    user:JSON.parse(localStorage.getItem("user")),
    contacts: [
      {
        "name": "izzatillos",
        "email": "sadirovizzatillo3@gmail.com",
        "phone": "+998973364647",
        "tag": "family",
        "id": 1
      },
      {
        "name": "sadriddin",
        "email": "ganiyev1",
        "phone": "+998973364644",
        "tag": "familyp",
        "id": 2
      },
      {
        "name": "sadsad",
        "email": "asda@gmail.com",
        "phone": "123123",
        "tag": "4adsad",
        "id": 3
      }
    ],
    contact: [
      {
        "name": "izzatillos",
        "email": "sadirovizzatillo3@gmail.com",
        "phone": "+998973364647",
        "tag": "family",
        "id": 1
      },
      {
        "name": "sadriddin",
        "email": "ganiyev1",
        "phone": "+998973364644",
        "tag": "familyp",
        "id": 2
      },
      {
        "name": "sadsad",
        "email": "asda@gmail.com",
        "phone": "123123",
        "tag": "4adsad",
        "id": 3
      }
    ],
  },
  getters: {
    doneTodos (state) {
      return state.todos.filter(todo => todo.done)
    },
    allContacts(state){
      return state.contacts
    }
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
      // state.contacts =  state.contacts.filter(c => text === c.name)
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
   async deleteContact(_, contactId){
      try{
        const contact = await _.state.contacts.findIndex(c => c.id === contactId);
        _.state.contacts.splice(contact, 1)
      }catch(err){
        console.log(err)
      }
    },
    // async getAllContacts(_){
    //   try {
    //     const { data } =  await apiServices.getAllContacts();
    //     _.commit("SET_CONTRACTS", data)
    //   }catch(err){
    //     console.log(err)
    //   }
    // },
    async addContact(_, form){
      try{
        const  data  = await _.state.contacts.push(form);
        if(data.ok){
          return _.state.contacts
        }
      }catch(err){
        console.log(err)
      }
    },
    searchContact(_, text){
      if(text !== ""){
        _.commit("SEARCH_CONTACT", text)
      }else{
         _.state.contacts = _.state.contacts ? _.state.contact : _.state.contact
      }
    },
    async changeContact(_, form){
      try{
        const contact = await _.state.contacts.find(c => form.id === c.id)
        if(contact){
          contact.email = form.email,
          contact.name = form.name,
          contact.phone = form.phone,
          contact.tag = form.tag
        }
      }catch(err){
        console.log(err)
      }
    }
  },
})
