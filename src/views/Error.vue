<template></template>
<script>
import { textChangeRangeIsUnchanged } from 'typescript';

    export default{
        name:'Error',
        created(){
            let _this=this;
            this.$alert('登录信息失效！','提示',{
                confirmButtonText:'确定',
            }).then((response)=>{
                localStorage.removeItem('token');
                _this.$router.push('/');
            })
        }
    }
</script>