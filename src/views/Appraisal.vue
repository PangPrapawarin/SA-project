<template>
    <div>
        <Header></Header>
        <h1>รายการซ่อม</h1>
        <p>การรับประกัน : {{warranty}}</p>
        <h3>รายละเอียดสินค้า</h3>
        <p>ชื่อ : {{product.name}}</p>
        <p>สี : {{product.color}}</p>
        <p>รุ่น : {{product.model}}</p>
        <p>รหัสสินค้า : {{product.serial_number}}</p>
        <p>รายละเอียดการซ่อม : {{detail}}</p>
        <button @click="confirm">ส่งซ่อม</button>
        <button @click="cancel">ยกเลิกส่งซ่อม</button>
    </div>
</template>
<script>
import Header from '@/components/Header.vue'

export default {
    data(){
        return{
            product:{
                name:'',
                model:'',
                color:'',
                serial_number:''
            },
            warranty:'',
            detail:''
        }
    },
    components:{
        Header
    },
    methods:{
        async confirm(){
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
        },
        async cancel(){
            this.$router.push("/check-serial")
        }
    }
}
</script>
<style>

</style>