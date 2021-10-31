<template>
    <div>
        <Header></Header>
        <h1>Check Serial</h1>
        <span>serial number: </span>
        <input type="text" placeholder="กรอกรหัสสินค้า">
        <button>Check</button>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
    components:{
        Header
    },
}
</script>

<style>

</style>