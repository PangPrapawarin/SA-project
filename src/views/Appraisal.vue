<template>
    <div>
        <Header></Header>
        <h1>รายการซ่อม</h1>
        <h3>รายละเอียดสินค้า</h3>
        <p>การรับประกัน : {{warranty}}</p>
        <p>ชื่อ : {{product.name}}</p>
        <p>สี : {{product.color}}</p>
        <p>รุ่น : {{product.model}}</p>
        <p>รหัสสินค้า : {{product.serial_number}}</p>
        <span>รายละเอียดการซ่อม : </span>
        <input type="text" v-model="detail">
        <div>
            <button @click="confirm">ส่งซ่อม</button>
            <button @click="cancel">ยกเลิกส่งซ่อม</button>
        </div>
        
    </div>
</template>
<script>
import Header from '@/components/Header.vue'
import ProductStore from '@/store/Product'
import WarrantyStore from '@/store/Warranty'

export default {
    created(){
        this.fetchProduct()
    },
    data(){
        
        return{
            product:{
                id:'',
                name:'',
                model:'',
                color:'',
                serial_number:'AD00000001'
            },
            warranty:'',
            detail:''
        }
    },
    components:{
        Header
    },
    methods:{
        async fetchProduct(){
            this.products = await ProductStore.dispatch("fetchProduct")
            this.products.forEach(product => {
                if(this.product.serial_number===product.serial_number){
                    this.product.id = product.id
                    this.product.name = product.product_name
                    this.product.model = product.model
                    this.product.color = product.color
                }
            });
            let warranties = await WarrantyStore.dispatch("fetchWarranty")
            warranties.every(warranty=>{
                if (this.product.id == warranty.product_id) {
                    var dateFrom = warranty.warranty_start_date
                    var dateTo = warranty.warranty_end_date;
                    var dateCheck = new Date().toLocaleDateString("en-CA")
                    // var dateCheck = '2021-10-30'
                    
                    if(dateCheck <= dateTo && dateCheck >= dateFrom){
                        this.warranty = 'อยู่ในการรับประกัน'
                    }else{
                        this.warranty = 'ไม่อยู่ในการรับประกัน'
                    }
                    return false
                }
                return true       
            });
        },
        async confirm(){
            if (this.detail!=='') {
                this.$swal({
                    title: 'ต้องการจะส่งซ่อมหรือไม่?',
                    showCancelButton: true,
                    confirmButtonText: 'ใช่',
                    cancelButtonText: 'ไม่'
                }).then((r)=>{
                    if(r.isConfirmed){
                        this.$router.push('/set-work')
                    }
                })
            }else{
                this.$swal("กรุณากรอกรายละเอียดการส่งซ่อม", "", "error")
            }
            
        },
        async cancel(){
            this.$router.push("/check-serial")
        }
    }
}
</script>
<style>

</style>