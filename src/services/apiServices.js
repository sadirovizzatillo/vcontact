import axios from  'axios'

export const apiClient = axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:false,
    headers:{
        Accept: 'application/json',
        'Content-Type':'application/json'
    }
});

export default {
    getAllContacts(){
        return apiClient.get('/contacts')
    },
    deleteContact(id){
        return apiClient.delete(`/contacts/${id}`)
    },
    addContact(data){
        return apiClient.post(`/contacts`, data)
    },
    changeContact(data){
        return apiClient.put(`/contacts/${data.id}`, {
            name: data.name,
            email: data.email,
            phone: data.phone,
            tag: data.tag
        })
    },
}
