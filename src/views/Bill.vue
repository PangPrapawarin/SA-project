<template>
    <div>
        <Header></Header>
        <h1>ใบเสร็จ</h1>
        <p>วันที่จ่าย : {{ paid_date }}</p>
        <p>เวลาที่จ่าย : {{ paid_time }}</p>
        <p>จำนวนวันที่ซ่อม : {{ total_time }}</p>
        <p>สถานะใบเสร็จ : {{ bill_status }}</p>
        <p>การรับประกัน : {{warranty_status}}</p>
        <span>รายชื่อพนักงาน : {{ names[0] }} {{ names[1] }} {{names[2] }}</span>
        <div>
            <button :disabled="bill_status=='paid' || warranty_status=='อยู่ในการรับประกัน'" @click="pay">จ่ายเงิน</button>
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
    },
    data(){
        return{
            paid_date:'',
            paid_time:'',
            total_time:'',
            bill_status:'',
            names:[],
            billId:this.$route.params.id,
            userId:[],
            appraisalId:'',
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
                if(this.billId==bill.id){
                    this.bill_status=bill.bill_status
                    const arr = bill.paid_date.split(" ")
                    this.paid_date = arr[0]
                    this.paid_time = arr[1]
                }
            })
        },
        async fetchInvoice(){
            let invoices = await InvoiceStore.dispatch("fetchInvoice")
            let i = 0
            await invoices.forEach(invoice =>{
                if(this.billId==invoice.appraisals_id){
                    this.userId[i] = invoice.employee_id
                    this.appraisalId = invoice.appraisals_id
                    // let start = invoice.start_fix
                    // let end = invoice.end_fix
                    i++
                    // console.log(start-end);

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
            this.fetchAppraisal(this.appraisalId)
        },
        async pay(){
            location.reload();
            this.$swal("จ่ายเงินเสร็จสิ้น","","success")
        },
        async fetchAppraisal(appraisalId){
            let appraisals = await AppraisalStore.dispatch("fetchApprisal")
            appraisals.forEach(appraisal=>{
                if (appraisalId===appraisal.id) {
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
                    // var dateCheck = '2021-10-30'
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