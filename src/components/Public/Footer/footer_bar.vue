<template>
    <footer class="footer" :style="{'margin-bottom':bottom}">
        <div class="Links">
            <a target="_blank" rel="noopener noreferrer">专栏</a> ·
            <a target="_blank" rel="noopener noreferrer">圆桌</a> ·
            <a target="_blank" rel="noopener noreferrer">发现</a> ·
            <a target="_blank" rel="noopener noreferrer">移动应用</a> ·
            <a target="_blank" rel="noopener noreferrer">联系我们</a> ·
            <a target="_blank" rel="noopener noreferrer">发现</a>
        </div>
        <div class="Rights">
            <span>©{{curYear}} JULONE </span>
            <a target="_blank" rel="noopener noreferrer">闽 ICP 证 110745 号</a>
            <a target="_blank" rel="noopener noreferrer">
                <br>
                <img height="12px" src="@/assets/img/police.png">闽公网安备 11010802010035
                号
            </a> · 
            <a target="_blank" rel="noopener noreferrer">出版物经营许可证</a>
        </div>
        <div class="Reports">
            <a target="_blank" rel="noopener noreferrer">侵权举报</a> ·
            <a target="_blank" rel="noopener noreferrer">网上有害信息举报专区</a> ·
            <a target="_blank" rel="noopener noreferrer">儿童色情信息举报专区</a>
        </div>
        <div><span>违法和不良信息举报：010-82716601</span></div>
    </footer>
</template>
<script>
    export default {
        data(){
            return{
                curYear:new Date().getFullYear()
            }
        },
        props:{
            bottom:{
                default: '100px'
            }
        }
    }
</script>

<style lang="less">
    .footer {
        margin: 50px auto 100px;
        text-align: center;
        font-size: 12px;
        color: gray;
        width: 320px;
        line-height: 22px;

        a {
            text-decoration: none;
            color: gray;

            &:hover {
                color: @a_active_color;
            }
        }
    }
</style>