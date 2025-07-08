<template>
    <tr>
        <td><a href="https://juejin.cn/post/7423420457657565247">cell A</a></td>
        <td>cell B</td>
        <td>cell C</td>
        
    </tr>
</template>
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const token = localStorage.getItem('token')
  console.log('about页面的token:', token)
})
</script>