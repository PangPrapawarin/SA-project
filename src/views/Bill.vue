<template>
    <div>
        <Header></Header>
        <h1>ใบเสร็จ</h1>
        <p class="time">จำนวนวันที่ซ่อม : {{ total_time }} วัน</p>
        <p>สถานะใบเสร็จ : {{ bill_status }}</p>
<<<<<<< HEAD
        <p>การรับประกัน : {{warranty_status}}</p>
        <span class="name">รายชื่อพนักงาน : {{ names[0] }} {{ names[1] }} {{names[2] }}</span>
        <div class="button">
            <button class="button button5 " :disabled="bill_status=='ชำระเงินแล้ว' || warranty_status=='อยู่ในการรับประกัน'" @click="pay"><span>จ่ายเงิน</span></button>
=======
        <p>การรับประกัน : {{ warranty_status }}</p>
        <span>รายชื่อพนักงาน : {{ names[0] }} {{ names[1] }} {{names[2] }}</span>
        <div>
            <button :disabled="bill_status=='ชำระเงินแล้ว' || warranty_status=='อยู่ในการรับประกัน'" @click="pay">จ่ายเงิน</button>
>>>>>>> 626e490b03803424874aeb0540d47edf9ddd9db0
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import BillStore from '@/store/Bill'
import InvoiceStore from '@/store/Invoice'
import UserStore from '@/store/User'
import WarrantyStore from '@/store/Warranty'
import AppraisalStore from '@/store/Appraisal'

export default {
    async created(){
        await this.fetchBill()
        await this.fetchInvoice()
        await this.fetchAppraisal(this.appraisalId)
    },
    data(){
        return{
            total_time:0 ,
            bill_status:'',
            names:[],
            billId:'',
            userId:[],
            appraisalId:this.$route.params.id,
            warranty_id:'',
            warranty_status:''
        }
    },
    components:{
        Header
    },
    methods:{
        async fetchBill(){
            let bills = await BillStore.dispatch("fetchBill")
            await bills.forEach(bill =>{
                if(this.appraisalId==bill.appraisals_id){
                    this.bill_status=bill.bill_status
                    this.billId=bill.id
                }
            })
        },
        async fetchInvoice(){
            let invoices = await InvoiceStore.dispatch("fetchInvoice")
            let i = 0
            await invoices.forEach(invoice =>{
                if(this.appraisalId==invoice.appraisals_id){
                    this.userId[i] = invoice.employee_id
                    let start = new Date(invoice.start_fix)
                    let end = new Date(invoice.end_fix)
                    var Difference_In_Time = end.getTime() - start.getTime();
                    this.total_time =  (Difference_In_Time / (1000 * 3600 * 24))+1;
                    i++
                }
            })
            let users = await UserStore.dispatch("fetchUser")
            let j=0
            await users.every(user => {
                if (this.userId[0]==user.id) {
                    this.names[j]=user.name
                    j++
                    return false
                }
                return true
            })
            await users.every(user => {
                if (this.userId[1]==user.id) {
                    this.names[j]=user.name
                    j++
                    return false
                }
                return true
            })
            await users.every(user => {
                if (this.userId[2]==user.id) {
                    this.names[j]=user.name
                    j++
                    return false
                }
                return true
            })
        },
        async pay(){
            await BillStore.dispatch("updateBill", this.billId)
            location.reload();
            this.$swal("จ่ายเงินเสร็จสิ้น","","success")
        },
        async fetchAppraisal(appraisalId){
            let appraisals = await AppraisalStore.dispatch("fetchApprisal")
            appraisals.forEach(appraisal=>{
                if (appraisalId==appraisal.id) {
                    this.fetchWarranty(appraisal.warranties_id)
                }
            })
        },
        async fetchWarranty(warrantyId){
            let warranties = await WarrantyStore.dispatch("fetchWarranty")
            warranties.every(warranty=>{
                if (warrantyId===warranty.id) {
                    this.warranty_id=warranty
                    var dateFrom = warranty.warranty_start_date
                    var dateTo = warranty.warranty_end_date;
                    var dateCheck = new Date().toLocaleDateString("en-CA")
                    if(dateCheck <= dateTo && dateCheck >= dateFrom){
                        this.warranty_status = 'อยู่ในการรับประกัน'
                    }else{
                        this.warranty_status = 'ไม่อยู่ในการรับประกัน'
                    }
                    return false
                }
                return true       
            })
        }
    }
}
</script>
<style lang="scss" scoped>
span.name{
    margin-bottom: 50;
}
button.button {
  display: inline-block;
  border-radius: 4px;
  background-color: sienna;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 30;
  width: 200;
  text-align: center;
  padding: 20;
  width: 100;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20;
  transition: 0.5s;
}

.button5:hover span {
  padding-right: 25;
}

.button5:hover span:after {
  opacity: 1;
  right: 0;
}
div.button{
    margin-bottom: 50;
}
p.time{
    padding-bottom: 50;
}
</style>