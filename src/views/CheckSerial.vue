<template>
    <div>
        <Header></Header>
        <h1>เช็ครหัสสินค้า</h1>
        <span>serial number: </span>
        <input type="text" v-model="serialNumber" placeholder="กรอกรหัสสินค้า">
        <div v-if="errors">
            <span class="error" v-if="!$v.serialNumber.minLength">รหัสสินค้าต้องมีอย่างน้อย {{ $v.serialNumber .$params.minLength.min }} ตัว</span>
        </div>
        <div>
            <button :disabled="this.serialNumber==''" @click="check">Check</button>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { required, minLength} from 'vuelidate/lib/validators'

export default {
    data(){
        return{
            errors: false,
            serialNumber:'',
        }
    },
    validations:{
        serialNumber:{
            required,
            minLength: minLength(10)
        }
    },
    components:{
        Header
    },
    methods:{
        async check(){
            if (this.serialNumber.length<10) {
                this.errors = true
            }else if(this.serialNumber.length>=10){
                this.$swal("ข้อมูลถูกต้อง","","success")
                this.$router.push("/apprisal")
            }
            
        }
    }
}
</script>

<style>
span.error{
    color:red;
}
</style>