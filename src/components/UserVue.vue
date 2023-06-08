<template>
    <div class="row">
        <div class="text">
            <div class="img">
                <img :src="photo" alt="img">
            </div>
            <div>
                <span>{{ username }}</span>
            </div>
            <div>
                <span>{{ name }}</span>
            </div>
            <div>
                <span>Email: {{ email }}</span>
            </div>
            <div>
                <span>Phone: {{ phone }}</span>
            </div>
            <div>
                <span>Website: {{ website }}</span>
            </div>
            <div>
                <span>Address</span>
                <ul>
                    <li>Street: {{ address?.street }}</li>
                    <li>City: {{address?.city  }}</li>
                    <li>Suite: {{ address?.suite }}</li>
                </ul>
            </div>
            <div>
                <span>Company</span>
                <ul>
                    <li>{{ company?.name }}</li>
                    <li>Catch phrase: {{ company?.catchPhrase }}</li>
                    <li>Bs: {{ company?.bs }}</li>
                </ul>
            </div>
        </div>
        
    </div>
    

</template>

<style scoped lang="scss">
    .row{
        width: 400px;
        margin-bottom: 7em;
        padding: 15px;
        background-color: white;
        border-radius: 10px;
        color: black;
        animation: appear 2s;
    }
    .img{
        text-align: center;
    }
    img{
        border-radius: 100px;
        width: 150px;
        height: 150px;
    }
    span{
        font-weight: 600;
        font-size: 1.3em;
        word-break: break-all;
    }
    li{
        word-break: break-all;
        font-size: 1.2em;
        margin-bottom: 10px;
    }
    ul{
        margin-left: 0;
        padding-left: 0;
    }
    .text{
        text-align: center;
        div{
            margin-top: 15px;
        }
    }
    @keyframes appear {
        0%{opacity: 0;}
        100%{opacity: 1;}
    }
    @media screen and (max-width: 500px) {
        .row{
            width: 90%;
        }
    }
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Address } from '../types/user'
import { Company } from '../types/user'

export default defineComponent({
    name:'UserVue',
    props: {
        id:Number,
        name:String,
        username:String,
        email:String,
        address:Object as PropType<Address>,
        phone:String,
        website:String,
        company:Object as PropType<Company>,
        photo:String
    }
})
</script>