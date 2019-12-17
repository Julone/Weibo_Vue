<template>
    <div class="container">
        <ul>
            <li v-for="(el,index) in data" :key="index">
                {{el}}
            </li>
        </ul>
        <div class="title">
            <!-- <div class="icon">
                <i class="el-icon-warning-outline"></i>
            </div> -->
            <!-- :class="!(index % 2) ? 'fadeTop'+index :'fadeBottom'+index" -->
            <div class="t1">
                404 Not Found
            </div>
            <div class="span">
                <span v-for="(item) in title" :key="item">
                    {{item}}
                </span>
            </div>

            <div class="backHome ">
                <a @click="$router.push('/home')">
                    <i class="el-icon-house"></i>
                    返回首页</a>
            </div>
        </div>
        <footerBar bottom='0' style="position:absolute;bottom:20px;width:100%" />


    </div>
</template>
<style lang="less" scoped>
    .container {
        background: #f7f7f7 url('./../../assets/img/外踢啊空.svg') right top / 35vw no-repeat;
        color: #d2d4d6;
        height: calc(100vh - @nav_height);
        overflow: hidden;
        
        @primary_color: #7c8287;

        @keyframes move {
            from {
                transform: translate(0, 0);
            }

            to {
                @h: ~"calc( -1795px + 150vh)";
                transform: translate(0, @h)
            }
        }

        .backHome {
            display: flex;
            font-size: 2rem;
            justify-content: center;
            margin-top: 3rem;

            a {
                font-weight: 500;
                font-size: 1.2rem;
                color: darken(@primary_color, 10%);
                border: 1px solid @primary_color;
                border-radius: 50px;
                padding: 0 20px;
                &:hover {
                    color: @a_active_color;
                    border-color: @a_active_color;
                }
            }
        }

        .title {
            text-align: justify;
            font-family: Helvetica Neue LT, Helvetica Neue, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
            font-weight: 700;
            font-size: 3rem;
            line-height: 3.5rem;
            letter-spacing: -.025rem;
            color: @primary_color;
            position: absolute;
            top: calc(40vh - 3.5rem);
            // top: 0;
            width: 30rem;
            // height: 4rem;
            left: 50%;
            margin-left: -13rem;
            display: block;


            .span {
                // height: 4rem;
                margin-top: 1rem;
                position: relative;

                span {

                    // transition: all linear .1s;
                    // position: absolute;
                    // left: 0;
                    &:hover {
                        // font-size: 4rem;
                        transform: scale(1.2);
                        transform-origin: center bottom;
                    }
                }


                // &::after {
                //     content: '';
                //     background: @a_active_color;
                //     width: 10px;
                //     height: 3.8rem;
                //     position: absolute;
                //     display: block;
                //     top: 0;
                //     // right: 0;
                //     animation: fromleft 2s 1 ease forwards, light 1s ease 2s infinite;
                //     // bottom: -5rem;
                // }
            }



            @keyframes light {
                from {
                    opacity: 0;
                }

                60% {
                    opacity: 0;
                }

                100% {
                    opacity: 1;
                }
            }

            @keyframes fromleft {
                from {
                    // left: 0;
                    transform: translate(0, 0)
                }

                to {
                    // left: 28rem;
                    transform: translate(27rem, 0)
                }
            }

        }

        ul {
            animation: move 30s linear infinite forwards;
            left: 20vw;
            user-select: none;
            filter: blur(5px);

            li {
                font-size: 50px;
                margin-left: 15vw;
                font-weight: 1000;
                white-space: nowrap;
                opacity: .7;

                &:hover {
                    // background: #E91E63;
                    // padding-left: 5px;
                }
            }
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                title: '此页面已找不到。',
                data: ['Nemůžu najít tuhle stránku.',
                    'Не удаётся найти эту страницу',
                    '找不到此页面',
                    'Não consigo encontrar esta página.',
                    '이 페이지를 찾을 수 없습니다',
                    'Kan ikke finde denne side',
                    'Can\'t find this page',
                    'لا يمكن العثور على هذه الصفحة',
                    'ไม่พบหน้านี้',
                    'Ma ei leia seda lehekülge.',
                    '求之不至页面',
                    'En löydä t ätä sivua.',
                    'このページが見つかりません',
                    'Δεν μπορώ να βρω αυτή τη σελίδα',
                    'Nie można znaleźć tej strony',
                    'Impossible de trouver cette page',
                    'Nu pot găsi această pagină',
                    '搵唔噉页面',
                    '找不到此頁面',
                    'Nemůžu najít tuhle stránku.',
                    'Не удаётся найти эту страницу',
                ]
            }
        }
    }
</script>