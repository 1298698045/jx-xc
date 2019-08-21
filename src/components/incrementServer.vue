<template>
    <div>
        <i-con type="addressbook_fill" size="28" color="#fb731b" v-if="name" />
        {{name}}
    </div>
</template>
<script>
export default {
    name:"incrementServer",
    props:{
        increment:String
    },
    data(){
        return {
            name:""
        }
    },
    computed:{
        getQuery(increment){
            console.log(increment,'123131231')
            if(increment.increment==undefined){
                return false;
            }else {
                this.$httpWX.post({
                    url:this.$api.classType.increment,
                    data:{
                        params:{
                            status:1
                        }
                    }
                }).then(res=>{
                    const item = res.data.find(item=>item.id==Number(increment.increment));
                    console.log('增值服务',item);
                    this.name = item.title;
                    return item.title;
                })
            }
        }
    }
}
</script>
