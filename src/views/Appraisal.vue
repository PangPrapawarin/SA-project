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
        <div class="button">
            <button class="confirm button2" @click="confirm">ส่งซ่อม</button>
            <button class="cancel button2" @click="cancel">ยกเลิกส่งซ่อม</button>
        </div>
        
    </div>
</template>
<script>
import Header from '@/components/Header.vue'
import ProductStore from '@/store/Product'
import WarrantyStore from '@/store/Warranty'
import AppraisalStore from '@/store/Appraisal'
import BillStore from '@/store/Bill'

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
            price:'',
            bill:'รอชำระเงิน'
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
                    
                    if(dateCheck <= dateTo && dateCheck >= dateFrom){
                        this.warranty = 'อยู่ในการรับประกัน'
                        this.price = 'ไม่เสียค่าใช้จ่าย'
                        this.bill = 'ชำระเงินแล้ว'
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
                        let bill={
                            appraisals_id:this.product.id,
                            bill_status:this.bill,
                        }
                        this.putData(bill)
                    }
                })
            }else{
                this.$swal("กรุณากรอกรายละเอียดการส่งซ่อม", "", "error")
            }
            
        },
        async cancel(){
            this.$router.push("/check-serial")
        },
        async putData(bill){
            await BillStore.dispatch("createBill",bill)
            this.$router.push('/set-work/'+this.product.id)
        }
    }
}
</script>
<style>
h1{
    color: crimson;
}

button.confirm{
  background-color: rgb(24, 128, 219);
  border-radius: 10px;
  border-color: white;
  color: AliceBlue;
  padding: 5px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 50px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
.button2:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}
button.cancel{
  background-color: rgb(24, 128, 219);
  border-radius: 10px;
  border-color: white;
  color: AliceBlue;
  padding: 5px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 30px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
</style>