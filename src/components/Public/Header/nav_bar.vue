<template>
    <div class="nav">
        <div class="wrapper">

            <div class="left">
                <div class="logo">
                    <img src="./../../../assets/img/logo-text-color.svg" height="100%" alt="">
                </div>
                <ul id="router-list" >
                    <router-link class="link pointer" 
                    v-show="!Number(el.hide)"
                     v-for="(el) in userMenu" tag="li"
                        :to='el.path' :key="el.path">
                        <i :class="el.icon"></i> {{ el.label }}
                    </router-link>
                </ul>
                <div class="underline" ref="un"></div>
            </div>
            <div class="right">
                <searchBar></searchBar>
                <el-dropdown type="primary">
                    <div class="baseInfo">
                        <userIcon :src='user_icon' :size='32'></userIcon>
                        <el-link :underline='false' v-if="loginStatus" @click.native="goMyPage">{{user_name}}</el-link>
                        <el-link :underline='false' v-else @click.native="goLogin">{{user_name}}登录</el-link>
                    </div>
                    <el-dropdown-menu slot="dropdown" v-if="loginStatus">
                        <el-dropdown-item @click.native="goMyPage">查看主页</el-dropdown-item>
                        <el-dropdown-item @click.native="goMyProfile">修改资料</el-dropdown-item>
                        <el-dropdown-item @click.native="goLogout">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

    </div>
</template>

<script>
    import {
        mapGetters,
        mapState
    } from 'vuex';
    export default {
        computed: {
            ...mapGetters(['user_icon', 'user_name', 'user_id']),
            ...mapState({
                'loginStatus': state => state.loginStatus,
                'userMenu': state => state.userMenu
            })
        },
        methods: {
            goMyPage() {
                this.$router.push('/user/' + this.user_id)
            },
            goMyProfile() {
                this.$router.push({
                    name: 'profile'
                })
            },
            goLogin() {
                this.$router.push('/login')
            },
            goLogout() {
                this.$confirm('是否要注销账号？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '马上注销',
                    cancelButtonText: '取消'
                }).then(e => {
                    this.$store.dispatch('logout')
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .nav {
        width: 100%;
        height: @nav_height;
        position: sticky;
        top: 0;
        z-index: 100;
        background: #ffffff7a;
        border-bottom: 1px solid #eee;
        backdrop-filter: saturate(180%) blur(20px);
        box-shadow: 0 20px 40px -20px rgba(0, 26, 100, .2);

        .wrapper {
            max-width: 1000px;
            width: 100%;
            height: 100%;
            ;
            margin: 0 auto;
            &:extend(.flex);
            justify-content: space-between;
            align-items: center;

            .left {
                // width: 50%;
                height: 100%;
                &:extend(.flex);
                justify-content: flex-start;
                align-items: center;

                .logo {
                    height: 100%;
                    margin-right: 20px
                }
 
                ul {
                    display: flex;
                    height: 100%;
                    align-items: center;

                    li {
                        margin-right: 0px;
                        font-size: 16px;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        // display: block;
                        white-space: nowrap;
                        // float: left;
                        padding: 0 15px;
                        flex-wrap: nowrap;
                        transition: all ease .4s;
                        position: relative;
                        &:hover {
                            color: #e0a612;

                        }


                        &.active,&.router-link-active {
                            color: #e0a612;
                            background:rgb(255,242,220);
                            &::after{
                                content: '';
                                    width: 100%;
                    height: 3px;
                    position: absolute;
                    left: 0;
                    bottom: -3px;
                    border-radius: 10px;
                    background: #e0a612;
                    transition: all ease 1s;
                            }
                          
                        }
                    }

                }

            }

            .right {
                .flex();

                .baseInfo {
                    margin-left: 20px;
                    &:extend(.flex);

                    .el-link {
                        margin-left: 5px;
                        font-size: 14px;
                    }
                }

            }
        }
    }
</style>