<template>
    <div>
        <h1>เช็ครหัสสินค้า</h1>
        <span>serial number: </span>
        <input type="text" v-model="serialNumber" placeholder="กรอกรหัสสินค้า">
        <!-- <div v-if="errors">
            <span class="error" v-if="!$v.serialNumber.minLength">รหัสสินค้าต้องมีอย่างน้อย {{ $v.serialNumber .$params.minLength.min }} ตัว</span>
        </div> -->
        <div>
            <button :disabled="this.serialNumber=='' || this.serialNumber.length<10" @click="check">Check</button>
        </div>
    </div>
</template>

<script>
// import { required, minLength} from 'vuelidate/lib/validators'
import ProductStore from '@/store/Product'
export default {
    data(){
        return{
            errors: false,
            serialNumber:'',
            products:[]
        }
    },
    // validations:{
    //     serialNumber:{
    //         required,
    //         minLength: minLength(10)
    //     }
    // },
    methods:{
        async check(){
            this.products = await ProductStore.dispatch("fetchProduct")
            this.products.every(product => {
                    if(this.serialNumber===product.serial_number){
                        this.$swal("ข้อมูลถูกต้อง","","success")
                        this.$router.push("/appraisal")
                        return false
                    }
                    console.log('f');
                    this.$swal("ไม่มีรหัสสินค้านี้","","error")
                    return true
                });
        },
    }
}
</script>

<style>
span.error{
    color:red;
}
</style>