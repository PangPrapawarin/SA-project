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
            this.$router.push("/set-work")
        },
        async cancel(){
            this.$router.push("/check-serial")
        }
    }
}
</script>
<style>

</style>