<template>
  <div class="outDiv">
    <image src='http://yx.aplusx.com/wximg/jiaxiao/xc_place.png' style="width:100%;height:300rpx;"></image>
        <div class="content">
          <div class='placeList' v-for='(item,index) in placeList' :key='index'>
            <div class='list_'><image src='../../static/images/place.png'  style="width: 200rpx; height: 200rpx;" /></div>   
            <div class='list_'>
              <div class='list_text'>
                 <p>{{item.name}}</p>
                <p>地址：{{item.address}}</p>
              </div>
            </div>
          </div>
          <h3>更多训练场正在开通中...</h3>
        </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      placeList:[
        {name:'王台训练场',address:'晋城市城区北石店镇太平村'},
        {name:'金村训练场',address:'晋城市城区金村镇金村村口'},
        {name:'鸿春训练场',address:'晋城市城区北石店镇鸿春村'},
        {name:'高都训练场',address:'晋城市泽州县高都镇207省道旁'},
        {name:'路训队训练场',address:'晋城市陵沁路水北村科三考场'},
        {name:'旧南站训练场',address:'晋城市高平市旧南站'},
        {name:'三甲北庄训练场',address:'晋城市高平市三甲北庄'},
        {name:'河西训练场',address:'晋城市高平市河西'},
        {name:'建宁训练场',address:'晋城市高平市建宁'},
        {name:'陈区训练场',address:'晋城市高平市陈区'},
        {name:'西牛庄训练场',address:'晋城市高平市西牛庄'},
        {name:'团池训练场',address:'晋城市高平市团池'},
        {name:'西阳村训练场',address:'晋城市高平市寺庄镇西阳村'},
        {name:'马村训练场',address:'晋城市高平市马村'},
        {name:'原村训练场',address:'晋城市高平市原村'},
        {name:'米山训练场',address:'晋城市高平市野川'},
        {name:'野川训练场',address:'晋城市高平市野川'},
        {name:'南王庄训练场',address:'晋城市高平市南王庄'},
        ]
    };
  },

  created() {

  },
  onLoad(){

  },
  onShow(){

  },
  methods: {
  }
};
</script>

<style>
page {
  height: 100%;
  background: #fff;
}
.outDiv {
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
}
.content{
  font-size:14px;
  color:#495060;
  padding:8px;
}
.placeList{
  display:flex;
  display:-webkit-flex;
  flex-wrap: nowrap;
  align-items:center;
  border-bottom:1px solid #eee;
  padding: 5px 0;
  position: relative;
}
.placeList .list_{
  height: 100px;
}
.placeList .list_:nth-child(2){
  padding: 0 6px;
}
h3{
  text-align: center;
  font-size: 16px;
  color: #e3e3e3;
  padding: 10px 0
}
.list_text{
  position:absolute;
  transform:translatey(-50% );
  top:50%;
  color: #414141;
}
.list_text p:nth-child(1){
  font-size: 17px;
  color: #414141;
  font-weight: 800;
}
</style>
