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
        <p>รายละเอียดการซ่อม : {{detail}}</p>
        <p>ราคา : {{price}}</p>
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
import AppraisalStore from '@/store/Appraisal'

export default {
    created(){
        this.fetchProduct()
        this.fetchAppraisal()
    },
    data(){
        
        return{
            product:{
                id:'',
                name:'',
                model:'',
                color:'',
                serial_number:this.$route.params.id
            },
            warranty:'',
            detail:'',
            price:''
        }
    },
    components:{
        Header
    },
    methods:{
        async fetchAppraisal(){
            this.appraisals = await AppraisalStore.dispatch("fetchApprisal")
            this.appraisals.forEach(appraisal =>{
                if (this.product.id==appraisal.warranties_id) {
                    this.price=appraisal.price
                    this.detail=appraisal.detail
                }
            })
        },
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
                        this.price = 'ไม่เสียค่าใช้จ่าย'
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
                        this.$router.push('/set-work/'+this.product.id)
                    }
                })
            }else{
                this.$swal("กรุณากรอกรายละเอียดการส่งซ่อม", "", "error")
            }
            
        },
        async cancel(){
            this.$router.push("/check-serial")
        },
        loadOnce:function(){
            location.reload();
        }
    }
}
</script>
<style>

</style>