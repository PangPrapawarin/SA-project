<template>
    <div>
        <h1>Air dryer maintenance</h1>
        <button class="check button button1" @click="login">เช็ครหัสสินค้า</button>
        <button class="register button button1"  @click="register">เพิ่มพนักงาน</button>
    </div>
  
  
</template>

<script>
export default {
    data(){
        return{
            form: {
                username:'',
                password:''
            }
        }
    },
    methods:{
        async login(){
            this.$router.push("/check-serial")
        },
        async register(){
            this.$router.push("/register")
        }
    }
}
</script>

<style lang="scss" scoped>
h1{ padding-top: 200px;
    font-family: "Times New Roman", Times, serif;
    font-size: 60px;
    color: firebrick;
    font-weight: bold;
    padding-bottom: 150px;
}

button.register{
   background-color: crimson; 
    border-radius: 15px;
    color: white;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 40px 50px;
    transition-duration: 0.4s;
    cursor: pointer;
}
button.check{
    background-color: crimson; 
    border-radius: 15px;
    color: white;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 40px 50px;
    transition-duration: 0.4s;
    cursor: pointer;
}
.button1 {
  
  color: wheat;
  border: 2px solid  crimson;
}

.button1:hover {
  background-color: crimson;
  color: white
}
.button1:active {
  background-color: wheat;
  box-shadow: 0 5px rgb(255, 255, 255);
  transform: translateY(4px);
}
template{
 background-image: url("C:\Users\Asus\Desktop\SA-project-frontend\src\assets\gif.gif"); }

</style>
