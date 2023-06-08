<template>
  <HeaderVue @newUser="createUser" @delete="deleteUser" />
  <div class="container">
    <div v-for="user in Users" :key="user.id">
      <UserVue :id="user.id" :username="user.username" :name="user.name"  :email="user.email" :address="user.address" :phone="user.phone" :website="user.website" :company="user.company" :photo="user.photo" />
    </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import UserVue from './components/UserVue.vue';
import HeaderVue from './components/HeaderVue.vue';
import { User } from './types/user'

export default defineComponent({
  name: 'App',
  components: {
    UserVue,
    HeaderVue
},
  data(){
    return{
      Users:[] as User[]
    }
  },
  methods:{
    fetchData(){
      fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(json=>this.Users = json).then(()=>{
        fetch('https://jsonplaceholder.typicode.com/photos')
        .then(res=>res.json())
        .then(json=>{
          for(let user of this.Users){
            user.photo=json[user.id].thumbnailUrl
          }
        })
      })
    },
    createUser(user:User){
      this.Users.unshift(user)
    },
    deleteUser(){
      this.Users.shift()
    }
  },
  mounted() {
    this.fetchData()
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap');
*{
  box-sizing: border-box;
  overflow-x: hidden;
  font-family: 'Fira Sans', sans-serif;
  font-weight: 400;
}

#app{
  margin: 0 auto;
  overflow-x: hidden;
  width: 90%;
}
body{
  background-color: #333;
  color: white;
  overflow-x:hidden;
}
.container{
  
  margin-top: 5em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 5%;
}
</style>
