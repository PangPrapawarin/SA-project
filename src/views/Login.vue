<template>
    <div>
        <h1>Air dryer maintenance</h1>
        <div>
            <span>Username: </span>
            <input type="text" placeholder="กรอกชื่อผู้ใช้">
        </div>
        <div>
            <span>Password: </span>
            <input type="password" placeholder="กรอกรหัสผ่าน">
        </div>
        <button @click="login">login</button>
        <button @click="register">register</button>
    </div>
  
  
</template>

<script>
export default {
    methods:{
        async login(){
            this.$swal("ล็อกอินสำเร็จ","ยินดีต้อนรับ", "success")
            this.$router.push("/checkSerial")
        },
        async register(){
            this.$router.push("/register")
        }
    }
}
</script>

<style>

</style>