<template>
    <div>
        <h1>Air dryer maintenance</h1>
        <button @click="login">เช็ครหัสสินค้า</button>
        <button @click="register">เพิ่มพนักงาน</button>
    </div>
  
  
</template>

<script>
export default {
    data(){
        return{
            form: {
                username:'',
                password:'',
            }
        }
    },
    methods:{
        async login(){
            this.$router.push("/check-serial")
        },
        async register(){
            this.$router.push("/register")
        },
    }
}
</script>

<style>

</style>