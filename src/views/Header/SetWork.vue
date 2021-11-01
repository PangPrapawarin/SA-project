<template>
    <div>
        <Header></Header>
        <h1>จ่ายงาน</h1>
        <div>
            <span>พนักงานคนที่ 1 : </span>
            <select>
                <option v-for="(employee, index) in employees" :key="index">{{employee.name}}</option>
            </select>
        </div>
        
        
        <div>
            <span>พนักงานคนที่ 2 : </span>
            <select>
                <option v-for="(employee, index) in employees" :key="index">{{employee.name}}</option>
            </select>
        </div>

        <div>
            <span>พนักงานคนที่ 3 : </span>
            <select>
                <option v-for="(employee, index) in employees" :key="index">{{employee.name}}</option>
            </select>
        </div>

        <table>
            <thead>
                <tr>
                    <th>ชื่อ</th>
                    <th>เพศ</th>
                    <th>อีเมลล์</th>
                    <th>เบอร์โทร</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(employee, index) in employees" :key="index">
                    <td>{{employee.name}}</td>
                    <td>{{employee.sex}}</td>
                    <td>{{employee.email}}</td>
                    <td>{{employee.phone}}</td>
                </tr>
            </tbody>
        </table>
        <button @click="createBill">สร้างบิล</button>
    </div>
    
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    created(){
        this.fetchUser()
    },
    data(){
        return{
            employees:[
                {id:'1', 
                name:'Pang',
                email:'prapawarin.k@ku.th',
                sex:'Female',
                phone:'094-558-9164'
                },
                {id:'2', name:'Bank'},
                {id:'3', name:'Ploy'}
            ],
        }
    },
    components:{
        Header
    },
    methods:{
        async fetchUser(){

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
            
        }
    }
}
</script>
