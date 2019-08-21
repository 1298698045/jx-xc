<template>
    <div>
        {{adress}}
    </div>
</template>
<script>
export default {
    name:"site",
    props:{
        siteValue:Number
    },
    data(){
        return {
            adress:""   
        }
    },
    computed:{
        getQuery(siteValue){
            console.log('sitels',siteValue);
            if(siteValue.siteValue==undefined){
                return false;
            }else {
                this.$httpWX.post({
                    url:this.$api.coach.querySite,
                    data:{
                    }
                }).then(res=>{
                    console.log(res);
                    const item = res.data.list.find(item=>item.id==siteValue.siteValue);
                    this.adress = item.title;
                    return item.title;
                })
            }
        }
    }
}
</script>