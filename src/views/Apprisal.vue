<template>
    <div>
        <Header></Header>
        <h1>รายการซ่อม</h1>
        <p>warranty :</p>
        <button @click="confirm">ส่งซ่อม</button>
        <button @click="cancel">ยกเลิกส่งซ่อม</button>
    </div>
</template>
<script>
import Header from '@/components/Header.vue'

export default {
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