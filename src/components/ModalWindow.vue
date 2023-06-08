<template>
    <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                    
                    <span @click="$emit('close')">X</span>
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  <input type="text" placeholder="name" v-model="user.name">
                  <input type="text" placeholder="username" v-model="user.username">
                  <input type="text" placeholder="email" v-model="user.email">
                  <input type="text" placeholder="phone" v-model="user.phone">
                  <input type="text" placeholder="street" v-model="user.address.street">
                  <input type="text" placeholder="suite" v-model="user.address.suite">
                  <input type="text" placeholder="zipcode" v-model="user.address.zipcode">
                  <input type="text" placeholder="website" v-model="user.website">
                  <input type="text" placeholder="company name" v-model="user.company.name">
                  <input type="text" placeholder="company cath phrase" v-model="user.company.cathPhrase">
                  <input type="text" placeholder="company bs" v-model="user.company.bs">
                  <input type="file"
                    accept="image/png, image/jpeg" @change="inputFile">
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <button class="modal-default-button" @click="submitInputs">
                    Submit
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    emits:['submit','close'],
    name:'ModalWindow',
    data(){
        return{
            user:{
                name:'',
                username:'',
                email:'',
                address:{
                    street:'',
                    suite:'',
                    zipcode:'',
                },
                company:{
                    name:'',
                    cathPhrase:'',
                    bs:''
                },
                phone:'',
                website:'',
                photo:'' as string | ArrayBuffer | null
            }
        }
    },
    methods:{
      inputFile(e:Event){
        const fileInput = e.target as HTMLInputElement | null;
        if (fileInput && fileInput.files) {
          const file = fileInput.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              this.user.photo = reader.result;
            };
            reader.readAsDataURL(file);
          }
        }
      },
      submitInputs(){
        if(this.user.name.length<=0 || this.user.username.length<=0 || this.user.email.length<=0){
          alert('name, username and email is a must have fields')
        }
        else{
          this.$emit('submit',this.user)
        }
      }
    }
})
</script>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  color: black;
}
input{
    width: 60%;
    font-size: 1.5em;
    margin-bottom: 10px;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 40%;
  margin: 0px auto;
  height: 80vh;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header  {
    margin-bottom: 3em;
    text-align: end;
    
    span{
        font-weight: 900;
        font-size: 2em;
        cursor: pointer;
    }
  
}

.modal-body {
  margin: 20px 0;
  text-align: center;
}

.modal-default-button {
 padding: 20px 50px;
 font-size: 2em;
 background-color: #333;
 color: white;
 font-weight: 600;
 border: none;
 cursor: pointer;
 border-radius: 20px;
}

.modal-footer{
  text-align: center;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media screen and (max-width:900px) {
    .modal-container{
        width: 90%;
    }
    input{
      width: 100%;
    }
}

</style>