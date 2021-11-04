<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
            <div class="name">
                <span>ชื่อ: </span>
                <input class="nname" type="text" v-model="form.name" placeholder="กรอกชื่อ">
            </div>
            <div class="email">
                <span>อีเมลล์: </span>
                <input class="eemail" type="email" v-model="form.email" placeholder="กรอกอีเมลล์">
            </div>
            <div class="address">
                <span>ที่อยู่: </span>
                <input class="aaddress" type="text" v-model="form.address" placeholder="กรอกที่อยู่">
            </div>
            <div class="sex">
                <span>เพศ: </span>
                <select class="sex"
                    v-model="form.sex">
                    <option v-for="(sex, index) in sexs" :value="sex.name" :key="index"> 
                        {{sex.name}}
                    </option>
                </select>
            </div>
            <div class="salary">
                <span>เงินเดือน: </span>
                <input class="ssalary" type="number" v-model="form.salary" placeholder="กรอกเงินเดือน" min="0">
            </div>
            <div class="tell">
                <span>เบอร์โทร: </span>
                <input class="ttell" type="text" v-model="form.phone" placeholder="กรอกเบอร์โทรศัพท์">
            </div>
            <button class="register button3">register</button>
        </form>
        <button @click="clearForm" class="clear button3">cancel</button>
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
                salary:'',
                phone:'',
            },
            sexs: [
                {
                    name: "Male"
                },
                {
                    name: "Female"
                }
            ],
        }
        
    },
    components:{
        Header
    },
    methods:{
        async register(){
            if (this.form.name!='' && this.form.email!=='' && this.form.address!=='' && this.form.sex!=='' && this.form.salary!=='' && this.form.phone!=='' && this.form.salary>0) {
                let newUser ={
                    name:this.form.name,
                    address:this.form.address,
                    sex:this.form.sex,
                    salary:this.form.salary,
                    phone:this.form.phone,
                    email:this.form.email
                }
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
h1{
    padding-bottom: 50px;
    font-family: "Times New Roman", Times, serif;
}
input.nname{
    border-radius: 10px;
    margin-left: 20px;
}
input.eemail{
    border-radius: 10px;
    margin-left: 5px;
}
input.aaddress{
    border-radius: 10px;
    margin-left: 5px;
}
input.ttell{
    border-radius: 10px;
    margin-left: 5px;
}
input.ssalary{
    border-radius: 10px;
    margin-left: 5px;
}
select.sex{
    border-radius: 5px;
    margin-left: 5px;
}
div.name{
    padding-bottom: 30px;
}
div.address{
    padding-bottom: 30px;
}
div.email{
    padding-bottom: 30px;
}
div.sex{
    padding-bottom: 30px;
}
div.salary{
    padding-bottom: 30px;
}
div.tell{
    padding-bottom: 40px;
}
button.register{
    margin-top: 50px;
    margin-bottom: 10px ;
    margin-right: 0px;
    border-radius: 10px;
      background-color: DarkSlateBlue;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16;
  margin: 4 2;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; 
  transition-duration: 0.4s;
}
button.clear{
  border-radius: 10px;
  background-color: DarkSlateBlue;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4 2;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}
// .button {
//   background-color: #4CAF50; /* Green */
//   border: none;
//   color: white;
//   padding: 15px 32px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 16px;
//   margin: 4px 2px;
//   cursor: pointer;
//   -webkit-transition-duration: 0.4s; /* Safari */
//   transition-duration: 0.4s;
// }



.button3:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}
</style>>