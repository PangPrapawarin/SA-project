<template>
    <div>
        <h1>เช็ครหัสสินค้า</h1>
        <span>รหัสสินค้า : </span>
        <input type="text" v-model="serialNumber" placeholder="กรอกรหัสสินค้า">
        <!-- <div v-if="errors">
            <span class="error" v-if="!$v.serialNumber.minLength">รหัสสินค้าต้องมีอย่างน้อย {{ $v.serialNumber .$params.minLength.min }} ตัว</span>
        </div> -->
        <button :disabled="this.serialNumber=='' || this.serialNumber.length<10" @click="check">Check</button>
        <div>
            <span>รายละเอียดการซ่อม : </span>
            <input :disabled="valid" v-model="detail" type="text" placeholder="กรอกรายละเอียดการซ่อม">
        </div>
        <div>
            <span>ราคา : </span>
            <input :disabled="valid" v-model="price" type="number" placeholder="กรอกราคา">
        </div>
        <button @click="submit">ยืนยัน</button>
    </div>
</template>

<script>
// import { required, minLength} from 'vuelidate/lib/validators'
import ProductStore from '@/store/Product'
import AppraisalStore from '@/store/Appraisal'
export default {
    data(){
        return{
            // errors: false,
            id:'',
            serialNumber:'',
            products:[],
            price:'',
            detail:'',
            valid:true
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
                        this.valid=false
                        this.id=product.id
                        this.$swal("รหัสสินค้าถูกต้อง","","success")
                        return false
                    }
                    this.$swal("ไม่มีรหัสสินค้านี้","","error")
                    return true
                });
        },
        async submit(){
            if (this.price!=='' && this.detail!=='') {
                this.putData(this.id,this.price, this.detail)
                this.$router.push('/appraisal')
            }else if(this.valid){
                this.$swal("กรุณาเช็ครหัสสินค้าก่อน","","error")
            }
            else{
                this.$swal("กรุณากรอกข้อมูล", "", "error")
            }
        },
        async putData(id, price, detail){
            let payload = {
                id: id,
                price: price,
                detail: detail,
            }
            await AppraisalStore.dispatch('updateAppraisal', payload)
        }
    }
}
</script>

<style>
input:disabled::-webkit-input-placeholder { /* WebKit browsers */
    color:    #fff;
}
/* span.error{
    color:red;
} */
</style>