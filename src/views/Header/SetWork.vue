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
            <b-button size="sm" @click="selectAllRows">เลือกทั้งหมด</b-button>
            <b-button size="sm" @click="clearSelected">ยกเลิกการเลือกทั้งหมด</b-button>
        </p>
        <div>
            <span>วันที่เริ่มซ่อม : </span>
            <input type="date" v-model="start_fix">
            <span>วันที่สิ้นสุดการซ่อม : </span>
            <input type="date" v-model="end_fix">
        </div>
        <button @click="createBill">สร้างบิล</button>
    </div>
    
</template>

<script>
import Header from '@/components/Header.vue'
import UserStore from '@/store/User'

export default {
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
            if (this.selected.length !== 0) {
                this.$swal({
                    title: 'ต้องการจะสร้างใบเสร็จหรือไม่?',
                    showCancelButton: true,
                    confirmButtonText: 'ใช่',
                    cancelButtonText: 'ไม่'
                }).then((r)=>{
                    if(r.isConfirmed){
                        this.$router.push('/bill/' + this.appraisalId)
                    }
                })
            }else{
                this.$swal("กรุณาเลือกพนักงาน", "อย่างน้อย 1 คน", "error")
            }
            
            
        },
        onRowSelected(items) {
            this.selected = items
        },
        selectAllRows() {
            this.$refs.selectableTable.selectAllRows()
        },
        clearSelected() {
            this.$refs.selectableTable.clearSelected()
        },
    }
}
</script>
