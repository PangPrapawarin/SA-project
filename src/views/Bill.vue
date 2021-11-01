<template>
    <div>
        <Header></Header>
        <h1>ใบเสร็จ</h1>
        <p>สถานะ : {{ bill_status }}</p>
    </div>
    
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    data(){
        return{
            bill_status:''
        }
    },
    components:{
        Header
    },
}
</script>