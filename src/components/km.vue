<template>
    <div>
        <p>
            科目：
            <span>{{km}}</span>
        </p>
    </div>
</template>
<script>
export default {
    props:{
            km:String
        },
    data(){
        return {
            
        }
    },
    mounted(){
        // this.$httpWX.post({
        //     url:'',
        //     data:{

        //     }
        // }).then(res=>{
        //     console.log(res);
        // })
    }
}
</script>