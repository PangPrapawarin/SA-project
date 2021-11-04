<template>
    <div>
        <Header></Header>
        <h1>จ่ายงาน</h1>
        <b-table
            :items="this.users"
            :fields="fields"
            :select-mode="selectMode"
            responsive="sm"
            ref="selectableTable"
            selectable
            @row-selected="onRowSelected">
            <template #cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                    <span class="sr-only">เลือก</span>
                    <span aria-hidden="true">&#9989;</span>
                </template>
                <template v-else>
                    <span class="sr-only">ยังไม่เลือก</span>
                    <span aria-hidden="true">&#10060;</span>
                </template>
            </template>
        </b-table>
        <p>
            <button class="button-74" size="sm" @click="selectAllRows">เลือกทั้งหมด</button>
            <button class=" button-74" size="sm" @click="clearSelected">ยกเลิกการเลือกทั้งหมด</button>
        </p>
        <div>
            <span>ตั้งแต่วันที่</span>
            <date-picker v-model="start_fix" type="date" 
                :default-value="new Date()" :disabled-date="notBeforeToday"
                placeholder='วันที่เริ่มซ่อม' 
                :clearable=false ></date-picker>
            <span>ถึง</span>
            <date-picker v-model="end_fix" type="date"
                :default-value="new Date()" :disabled-date="notBeforeTodaySelect" 
                placeholder='วันที่ซ่อมเสร็จ' 
                value-type="format" :clearable=false></date-picker>
        </div>
        <button class="button-74" @click="createBill">สร้างบิล</button>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import UserStore from '@/store/User'
import InvoiceStore from '@/store/Invoice'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    components: { DatePicker },
    created(){
        this.fetchUser()
    },
    data(){
        return{
            employees:{
                id:'', 
                name:'',
                email:'',
                sex:'',
                phone:''
            },
            fields: ['selected', 'id', 'name', 'email', 'sex', 'phone'],
            selectMode: 'multi',
            selected: [],
            users:[],
            appraisalId:this.$route.params.id,
            start_fix:'',
            end_fix:''
        }
    },
    
    components:{
        Header
    },
    methods:{
        async fetchUser(){
            this.users = await UserStore.dispatch('fetchUser')
        },
        createBill(){
            if (this.selected.length !== 0 && this.selected.length<=3 && this.start_fix!='' && this.end_fix!='') {
                this.$swal({
                    title: 'ต้องการจะสร้างใบเสร็จหรือไม่?',
                    showCancelButton: true,
                    confirmButtonText: 'ใช่',
                    cancelButtonText: 'ไม่'
                }).then((r)=>{
                    if(r.isConfirmed){
                        this.createInvoice()
                        this.$router.push('/bill/' + this.appraisalId)
                    }
                })
            }else if((this.start_fix=='' || this.end_fix=='') && this.selected.length !== 0){
                this.$swal("กรุณากรอกวันที่","","error")
            }
            else if(this.selected.length>3){
                this.$swal("เลือกพนักงานเกินกำหนด","มากกว่า 3 คน","error")
            }
            else{
                this.$swal("กรุณาเลือกพนักงาน", "อย่างน้อย 1 คน", "error")
            }
            
            
        },
        onRowSelected(items) {
            this.selected = items
            if(this.selected.length > 3){
                this.$swal("เลือกพนักงานเกินกำหนด","ไม่เกิน 3 คน","error")
            }
        },
        selectAllRows() {
            this.$refs.selectableTable.selectAllRows()
        },
        clearSelected() {
            this.$refs.selectableTable.clearSelected()
        },
        createInvoice(){
            this.start_fix = this.start_fix.toISOString().split('T')[0]
            this.selected.forEach(select => {
                let invoice={
                    start_fix:this.start_fix,
                    end_fix:this.end_fix,
                    employee_id:select.id,
                    appraisals_id:this.appraisalId
                }
                this.putdata(invoice)
            });
        },
        async putdata(invoice){
            await InvoiceStore.dispatch('createInvoice', invoice)
        },
        notBeforeToday(date) {
            return date < new Date();
        },
        notBeforeTodaySelect(date) {
            return date < this.start_fix;
        },
    }
}
</script>

<style lang="scss" scoped>

input.date{
    
    border-radius: 5px;
    
}
input.edate{
  
    border-radius: 5px;
}

.button-74 {
  
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 200;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-74:hover {
  background-color: orange;
}

.button-74:active {
  box-shadow: #422800 2px 2px 0 0;
  transform: translate(2px, 2px);
}

@media (min-width: 768px) {
  .button-74 {
    min-width: 120px;
    padding: 0 25px;
  }
}
</style>
