<template>
    <div>
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
import { required, minLength} from 'vuelidate/lib/validators'
import WarrantyStore from '@/store/Warranty'
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
    methods:{
        async check(){
            if (this.serialNumber.length<10) {
                this.errors = true
            }else if(this.serialNumber.length>=10){
                let warranties = await WarrantyStore.dispatch("fetchWarranty")
                warranties.data.forEach(warranty=>{
                    if(this.serialNumber==warranty.serial_number){
                        this.$swal("ข้อมูลถูกต้อง","","success")
                        this.$router.push("/apprisal")
                    }else{
                        this.$swal("ไม่มีรหัสสินค้านี้","","error")
                    }
                });
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