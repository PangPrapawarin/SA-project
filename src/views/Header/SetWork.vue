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
                    <span aria-hidden="true">&check;</span>
                    <span class="sr-only">เลือก</span>
                </template>
                <template v-else>
                    <span aria-hidden="true">&nbsp;</span>
                    <span class="sr-only">ยังไม่เลือก</span>
                </template>
            </template>
        </b-table>
        <p>
            <b-button size="sm" @click="selectAllRows">เลือกทั้งหมด</b-button>
            <b-button size="sm" @click="clearSelected">ยกเลิกการเลือกทั้งหมด</b-button>
        </p>
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
            selected: [{
                id:'',
                name:'',
            }],
            users:[]
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
            this.$swal({
                title: 'ต้องการจะสร้างใบเสร็จหรือไม่?',
                showCancelButton: true,
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่'
            }).then((r)=>{
                if(r.isConfirmed){
                    this.$router.push('/bill')
                }
            })
            
        },
        onRowSelected(items) {
            this.selected = items
            console.log(this.selected);
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
