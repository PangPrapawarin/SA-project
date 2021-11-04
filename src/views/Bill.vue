<template>
    <div>
        <Header></Header>
        <h1>ใบเสร็จ</h1>
        <p>วันที่จ่าย : {{ paid_date }}</p>
        <p>เวลาที่จ่าย : {{ paid_time }}</p>
        <p>จำนวนวันที่ซ่อม : {{ total_time }}</p>
        <p>สถานะใบเสร็จ : {{ bill_status }}</p>
        <span>รายชื่อพนักงาน :</span>
        <span> {{names[0]}} {{names[1]}} {{names[2]}}</span>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import BillStore from '@/store/Bill'
import InvoiceStore from '@/store/Invoice'
import UserStore from '@/store/User'

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
            userId:[]
        }
    },
    components:{
        Header
    },
    methods:{
        async fetchBill(){
            let bills = await BillStore.dispatch("fetchBill")
            bills.forEach(bill =>{
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
                    // let start = invoice.start_fix
                    // let end = invoice.end_fix
                    i++
                    // console.log(start-end);

                }
            })
            let users = await UserStore.dispatch("fetchUser")
            let j=0
            await users.forEach(user => {
                if (this.userId[0]==user.id) {
                    this.names[j]=user.name
                    j++
                }
            })
            await users.forEach(user => {
                if (this.userId[1]==user.id) {
                    this.names[j]=user.name
                    j++
                }
            })
            await users.forEach(user => {
                if (this.userId[2]==user.id) {
                    this.names[j]=user.name
                    j++
                }
            })
        },
    }
}
</script>