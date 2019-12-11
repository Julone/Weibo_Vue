<template>
    <div class="search_bar">
         <!-- <el-input placeholder="请输入搜索内容" v-model="input3" size="mini" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" round></el-button>
        </el-input> -->
        <div class="search" :class="{active}" @click.stop>
                        <i class="el-icon-search" @click="search" style="opacity:.6"></i>
                        <input type="text" id="sinput" style="color:gray;width:140px" 
                        placeholder="请输入关键词搜索"
                        v-model.trim="currentText"
                        @focus="active = true"
                        @blur="!currentText && (active = false)"
                        @keyup.enter="search">
                    </div>


    </div>
</template>
<script>
export default {
    data(){
        return{
            currentText:'',
            active:false
        }
    },
    methods:{
        search(){
            if(this.currentText =='') return;
            this.$router.push({name:'search',query:{q:this.currentText}})
        }
    },
    watch:{
        currentText(val){
            if(!val) this.active = false;
        }
    }
}
</script>
<style lang="less" scoped>
    .search_bar{
            .search {
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        padding: 0 10px 0 10px;
        border: 1px solid #e3e3e3;
        color: #2c3e50;
        outline: none;
        border-radius: 15px;
        transition: border-color 0.2s ease;
        vertical-align: middle !important;
        margin-left: .4rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        max-width: 200px;
        &.active{
            border-color: @primary_color;
            input{
                transform: translate(-1rem,0)
            }
            i{
                transform: translate(140px,0)
            }
        }
    }

    .search input {
        border: none;
        font-size: .8rem;
            height: inherit;
    background: transparent;
        transition: all ease .4s;
    }

    .search input::placeholder {
        font-size: .8rem;
        letter-spacing: 1px;
        transition: all ease .4s
    }
    
    .search input:focus::placeholder{
        opacity: 0;
        /* transform: translate(60px,0) */
    }
  
    .search i{
        transition: all ease .5s;
        z-index: 10;
        margin-right: 5px
    }

    }
</style>