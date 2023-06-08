<template>
    <header>
        <img :src="icon" alt="icon" @click="show = !show">
        
    </header>
    <div class="right">
        <div v-show="show" class="show">
            <span @click="checkModal">{{text}}</span>
        </div>
    </div>
    <div v-if="modal">
        <ModalWindow @submit="checkData" @close="modal=false"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ModalWindow from './ModalWindow.vue';
import {User} from '../types/user'
export default defineComponent({
    emits: ['newUser', 'delete'],
    name:'HeaderVue',
    methods:{
        checkData(inputs:User){
            let email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            
            if(email.test(inputs.email)){
                inputs.geo = {
                    lat:2,
                    lng:3
                }
                this.modal=false
                this.text = 'delete account'
                this.delete = true
                fetch(`https://jsonplaceholder.typicode.com/users/1`, {
                    method: 'PUT',
                    body: JSON.stringify(inputs),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((res) => {
                    if(res.ok){
                        this.icon = inputs.photo
                        this.$emit('newUser',inputs)
                    }
                    else{
                        alert('server error')
                    }
                })
                
            }
            else{
                alert('invalid email')
            }
        },
        checkModal(){
            if(this.delete==false){
                this.modal=true
            }
            else{
                fetch('https://jsonplaceholder.typicode.com/users/1', {
                    method: 'DELETE',
                }).then((res)=>{
                    if(res.ok){
                        this.icon = 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
                        this.$emit('delete')
                        this.delete=false
                        this.text='become one of us'
                    }
                    else{
                        alert('server error')
                    }
                    
                })
                
            }
            this.show=false
        }
    },
    data(){
        return{
            show:false,
            text:'become one of us',
            delete:false,
            modal:false,
            icon:'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
        }
    },
    components:{ModalWindow}
})
</script>

<style scoped lang="scss">
header{
    text-align: end;
    
}
.right{
    display: flex;
    justify-content: end;
    flex-wrap: wrap;
}
.show{
    background-color: white;
    color: black;
    padding: 20px;
    margin-right: 20px;
    animation: select ease-in .4s;
    span{
        font-size: 1.2em;
        font-weight: 900;
        cursor: pointer;
    }
}
.error{
    border-color: red;
}
img{
    width: 100px;
    cursor: pointer;
    border-radius: 60px;
}
@keyframes select {
    0%{
        padding-top: 0px;
    }
    100%{
        margin-top: 0;
    }
}
</style>