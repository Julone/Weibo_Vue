<template>
  <div class="home">
    
    <div class="card" v-for="(el,i) in data" :key="el.msg">
      <div>
     
          <span v-if='el.trans'>
          {{el.t_msg}}
        </span>
           <span v-else>
        {{el.msg}}
        </span>
        <el-button @click='t(i)'>翻译它</el-button>
      
      </div>
    </div>
  </div>
</template>

<script>
import {trans} from '@/api/baidu/'
export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data(){
    return {
      data:[{msg:'apple is a great company',trans:false,t_msg:''}]
    }
  },
  filters:{
    
  },
  methods:{
    async t(i){
      if(!this.data[i].t_msg){

      this.data[i].t_msg = await trans({q:this.data[i].msg}).then(r=>{
        return  r.data.trans_result[0].dst
       })
       console.log(this.data);
      }
       this.data[i].trans = !this.data[i].trans


    }
  },
  watch:{
    data:{
      deep:true,
      handler(n,o){
       
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .card{
    height: 60px;
    margin: 20px auto;
    background: gray;
    width:500px;

  }
</style>