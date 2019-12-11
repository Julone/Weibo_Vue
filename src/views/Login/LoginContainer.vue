<template>
    <div class="container">
        <div class="wrapper">
            <router-view></router-view>
            <footerBar />
        </div>
    </div>
</template>
<script>
    export default {}
</script>

<style scoped lang="less">
    .container {
        margin: 0 auto;
        padding: 30px 10px;
        height: calc(100vh - @nav_height);
        width: 100%;
        display: flex;
        justify-content: center;
        background: url('./../../assets/img/overview-header-bg-e2dc888faa.svg') white bottom center/105% no-repeat;
        box-sizing: border-box;

        .wrapper {
            max-width: 400px;
        }

        /deep/.el-form {
            width: 330px;
            margin: 0 auto;
            /deep/.el-form-item {
                margin-bottom: 22px;

                &:last-child {
                    margin-bottom: 12px;
                }
            }

            /deep/.el-input,.el-autocomplete{
                    width: 100%;
                .el-input__inner {
                    border-radius: 500px;
                }
            }

            /deep/.el-button--primary.is-plain {
                background: white;
                color: #E8C064;
                transition: all ease .2s;

                &:hover,
                &:active {
                    background: #E8C064;
                    color: white;
                }

                &.is-disabled,
                &.is-disabled:hover,
                &.is-disabled:active {
                    background-color: #FFFFFF;
                    border-color: #EBEEF5;
                    color: #C0C4CC;
                }
            }

        }

    }
</style>