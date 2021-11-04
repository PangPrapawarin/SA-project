<template>
    <div>
        <h1>เช็ครหัสสินค้า</h1>
        <span class="num"> รหัสสินค้า : </span>
        <input type="text" class="text" v-model="serialNumber" placeholder="  กรอกรหัสสินค้า">
        <!-- <div v-if="errors">
            <span class="error" v-if="!$v.serialNumber.minLength">รหัสสินค้าต้องมีอย่างน้อย {{ $v.serialNumber .$params.minLength.min }} ตัว</span>
        </div> -->
        <button :disabled="this.serialNumber=='' || this.serialNumber.length<10" class="button" @click="check">Check</button>
        <div class="detail">
            <span>รายละเอียดการซ่อม : </span>
            <input class="valid" :disabled="valid" v-model="detail" type="text" placeholder="  กรอกรายละเอียดการซ่อม">
        </div>
        <div class="price">
            <span>ราคา : </span>
            <input class="boxprice" :disabled="valid" v-model="price" type="number" placeholder="  กรอกราคา">
        </div>
        <button class="button button1" @click="submit">ยืนยัน</button>
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
                        this.$swal("รหัสสินค้าถูกต้อง",this.serialNumber,"success")
                        return false
                    }
                    this.$swal("ไม่มีรหัสสินค้านี้","","error")
                    return true
                });
        },
        async submit(){
            if (this.price!=='' && this.detail!=='') {
                await this.putData(this.id,this.price, this.detail)
                this.$router.push('/appraisal/'+ this.serialNumber)
                this.$swal("กรอกข้อมูลเรียบร้อย","","success" )
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
        },
        
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
h1{
    padding-bottom: 80px;
    padding-top: 150px;
}
input.text{
    margin-right: 40px;
    margin-left: 10px;
    border-radius: 5px;
}
input.valid{
    margin-left: 10px;
    border-radius: 5px;
}
input.boxprice{
    margin-left: 10px;
    border-radius: 5px;
}
div.detail{
    padding-bottom: 50px;
    padding-top: 80px;
}
div.price{
    padding-bottom: 50px;
    padding-top: 50px;
}
button.button{
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 5px;
    padding-top: 5px;
    font-family: "Lucida Console", "Courier New", monospace;
    color: white;
    background-color: darkslateblue;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 10px;
    box-shadow: 0 9px #999;
}
button:disabled{
    background-color: rgb(203, 202, 206);
    color: rgb(124, 119, 119);
}
/* .button:hover:not([disabled="disabled"]) {
    background-color: rgb(48, 43, 77)
} */
.button1:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>