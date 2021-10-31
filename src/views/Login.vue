<template>
    <div>
        <h1>Air dryer maintenance</h1>
        <div>
            <span>Username: </span>
            <input type="text" v-model="form.username" placeholder="กรอกชื่อผู้ใช้">
        </div>
        <div>
            <span>Password: </span>
            <input type="password" v-model="form.password" placeholder="กรอกรหัสผ่าน">
        </div>
        <button @click="login">login</button>
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

<style>

</style>