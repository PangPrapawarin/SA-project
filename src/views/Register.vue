<template>
    <div>
        <h1>Register</h1>
        <div>
            <span>ชื่อ: </span>
            <input type="text" v-model="form.name" placeholder="กรอกชื่อ">
        </div>
        <div >
            <span>อีเมลล์: </span>
            <input type="email" v-model="form.email" placeholder="กรอกอีเมลล์">
        </div>
        <div>
            <span>ที่อยู่: </span>
            <input type="text" v-model="form.address" placeholder="กรอกที่อยู่">
        </div>
        <div>
            <span>เพศ: </span>
            <select 
                v-model="form.sex">
                <option v-for="(sex, index) in sexs" :value="sex.name" :key="index"> 
                    {{sex.name}}
                </option>
            </select>
        </div>
        <div>
            <span>เงินเดือน: </span>
            <input type="number" v-model="form.salary" placeholder="กรอกเงินเดือน" min="0">
        </div>
        <div>
            <span>เบอร์โทร: </span>
            <input type="text" v-model="form.phone" placeholder="กรอกเบอร์โทรศัพท์">
        </div>
        <button @click="register">register</button>
        <button @click="clearForm">cancel</button>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import UserStore from '@/store/User'
export default {
    data(){
        return{
            form: {
                name:'',
                email:'',
                address:'',
                sex:'',
                salary:0,
                phone:'',
            },
            sexs: [
                {
                    name: "male"
                },
                {
                    name: "female"
                }
            ]
        }
        
    },
    components:{
        Header
    },
    methods:{
        async register(){
            if (this.form.name!='' && this.form.email!=='' && this.form.address!=='' && this.form.sex!=='' && this.form.salary!=='' && this.form.phone!=='') {
                let newUser ={
                    name:this.form.name,
                    address:this.form.address,
                    sex:this.form.sex,
                    salary:this.form.salary,
                    phone:this.form.phone,
                    email:this.form.email
                }
                console.log(newUser.name);
                await UserStore.dispatch('createUser', newUser)
                this.$swal("สมัครเสร็จสิ้น", "","success")
                this.$router.push("/")
            }else{
                this.$swal("กรุณากรอกข้อมูลให้ครบ","","error")
            }
            
        },

        clearForm(){
            this.form= {
                name:'',
                email:'',
                address:'',
                sex:'',
                salary:'',
                phone:'',
            }
        },
    }
}
</script>

<style lang="scss" scoped>

</style>>