<template>
    <div>
        <h1>Air dryer maintenance</h1>
        <div class="name">
            <span>Username: </span>
            <input type="text" v-model="form.username" placeholder="    กรอกชื่อผู้ใช้">
        </div>
        <div class="password"> 
            <span>Password: </span>
            <input type="password" v-model="form.password" placeholder="    กรอกรหัสผ่าน">
        </div>
        <button @click=" login">login</button>
        <button @click="register">register</button>
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
            if (this.form.username!=='' && this.form.password!=='') {
                this.$swal("ล็อกอินสำเร็จ","ยินดีต้อนรับ", "success")
                this.$router.push("/check-serial")
            }else if(this.form.username==='' && this.form.password===""){
                this.$swal("กรุณากรอกข้อมูล","","error")
            }
            else if(this.form.username===''){
                this.$swal("กรุณากรอกชื่อผู้ใช้","","error")
            }else if(this.form.password===""){
                this.$swal("กรุณากรอกรหัสผ่าน","","error")
            }
            
        },
        async register(){
            this.$router.push("/register")
        }
    }
}
</script>

<style lang="scss" scoped>
h1{ padding-top: 150px;
    font-family: "Times New Roman", Times, serif;
    font-size: 60px;
    color: firebrick;
    font-weight: bold;
}
div.name{
    padding-top: 100px;
    font-family: "Lucida Console", "Courier New", monospace;
    
}
div.password{
    padding-top: 70px;
    padding-bottom: 100px;
    font-family: "Lucida Console", "Courier New", monospace;
}
button{
    padding-right: 30px;
    padding-left: 30px;
    padding-bottom: 12px;
    padding-top: 12px;
    font-family: "Lucida Console", "Courier New", monospace;
}
</style>