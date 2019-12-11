<template>
    <div style="display:inline-block">
        <span class="time_style" v-popover:popover2>
            {{finalTime}}
        </span>
        <el-popover ref="popover2" :disabled="noPop" placement="top" width="170" trigger="hover">
            <el-col :span="24"><div style="text-align:center">{{getFormat('yyyy-MM-dd hh:mm:ss')}}</div></el-col>
        </el-popover>
    </div>
</template>
<style lang="less" scoped>
    .time_style{
        font-size: 12px;
        color: gray;
    }
</style>
<script>
    export default {
        props: {
            time: {
                required: true,
            },
            type: {
                default: 'short',
                type: String,
            },
            noPop:{
                default: false,
                type:Boolean,
            }
        },
        data() {
            return {
                currentTime: Date.now(),
                intervalTime: null
            }
        },
        computed: {
            finalTime() {
                return this.type === 'short' ? this.getShortTime() : this.getFormat(this.type)
            }
        },
        mounted() {
            this.timer = setInterval(() => {
                this.currentTime = Date.now();
            }, this.intervalTime )
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        methods: {
            getShortTime() {
                var currentTime = this.currentTime;
                var d_day = Number(this.time);
                var day = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600 / 24));
                var hour = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600));
                var minutes = Math.abs(parseInt((d_day - currentTime) / 1000 / 60));
                var seconds = Math.abs(parseInt((d_day - currentTime) / 1000));
                this.intervalTime = 60* 1000;
                if (day > 367) {
                    return parseInt(day / 365) + "年前".toString();
                } else if (day > 31) {
                    return parseInt(day / 30) + "月前".toString();
                } else if (day >= 2) {
                    return parseInt(day) + "天前".toString();
                } else if (day > 0 && day < 2) {
                    return "昨天".toString();
                } else if (hour > 0 && hour < 24) {
                    return parseInt(hour) + "小时前".toString();
                } else if (minutes > 0 && minutes < 60) {
                    return parseInt(minutes) + "分钟前".toString();
                } else if (seconds >= 0 && seconds < 60) {
                    this.intervalTime = 1000;
                    return parseInt(seconds) + "秒前".toString();
                }
            },
            getFormat(fmt){
                var t = new Date(Number(this.time));
                var o = { 
                    "M+" : t.getMonth()+1,                 //月份 
                    "d+" : t.getDate(),                    //日 
                    "h+" : t.getHours(),                   //小时 
                    "m+" : t.getMinutes(),                 //分 
                    "s+" : t.getSeconds(),                 //秒 
                    "q+" : Math.floor((t.getMonth()+3)/3), //季度 
                    "S"  : t.getMilliseconds()             //毫秒 
                }; 
                if(/(y+)/.test(fmt)) {
                    fmt=fmt.replace(RegExp.$1, (t.getFullYear()+"").substr(4 - RegExp.$1.length)); 
                }
                for(var k in o) {
                    if(new RegExp("("+ k +")").test(fmt)){
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                    }
                }
                return fmt;
            }

        }

    }
</script>