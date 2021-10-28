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
            <input type="text" v-model="form.tel" placeholder="กรอกเบอร์โทรศัพท์">
        </div>
        <button @click="register">register</button>
        <button @click="clearForm">cancel</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form: {
                name:'',
                email:'',
                address:'',
                sex:'',
                salary:'',
                tel:'',
            },
            sexs: [
                {
                    id: 1,
                    name: "male"
                },
                {
                    id: 2,
                    name: "female"
                }
            ]
        }
        
    },
    methods:{
        async register(){
            this.$swal("สมัครเสร็จสิ้น", "","success")
            this.clearForm()
        },
        clearForm(){
            this.form= {
                name:'',
                email:'',
                address:'',
                sex:'',
                salary:'',
                tel:'',
            }
        }
    }
}
</script>

<style lang="scss" scoped>
h1{
    background-color:DodgerBlue;
}
.bla{
    background-color: pink;
}
</style>>