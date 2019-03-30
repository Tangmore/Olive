<template>
    <section class="app-spots mb-5">
        <!--轮播start-->
        <div id="header" class="container-fluid position-relative p-0" @mouseover="pauseCarousel" @mouseout="startCarousel">
            <div class="w-100 position-relative">
                <picture>
                    <source media="(min-width: 1000px)" :srcset="carousel.Imgs[1].lg_url">
                    <source media="(max-width:999px)" :srcset="carousel.Imgs[1].md_url">
                    <img class="w-100" :src="carousel.Imgs[1].src">
                </picture>
            </div>
            <div class="w-100 position-absolute">
                <div v-for="img of carousel.Imgs" :key="img.cid" class="position-absolute w-100" :class="img.cid==carousel.cid?'in':'out'">
                    <picture>
                        <source media="(min-width: 1000px)" :srcset="img.lg_url">
                        <source media="(max-width:999px)" :srcset="img.md_url">
                        <img class="w-100" :src="img.src">
                    </picture>
                    <p class="w-100 pr-5 pl-5 mb-1 text-center" @click="jumpToDetails(img.cid)">
                        <span class="iconfont icon-tubiao"></span>&nbsp;&gt;
                        <a herf="javascript:;" v-cloak>{{img.country}}</a>&nbsp;&gt;
                        <a herf="javascript:;" v-cloak>{{img.spot}}</a>
                    </p>
                </div>
            </div>
            <div class="w-100 d-none d-sm-block search-input">
                <p class="w-100 text-center text-white">
                    Let's go!
                </p>
                <form class="row d-md-flex bg-white  align-items-center">
                    <input class="col bg-transparent" type="text">
                    <span class="col-auto iconfont icon-sousuo"></span>
                </form>
            </div>
        </div>
        <!--轮播end-->
        <!--主体start-->
        <div id="body" class="container pl-0 pr-0">
            <!--全部类型start-->
            <div id="all-spots" class="mt-5">
                <h6 class="pt-4 pb-3  m-0 ">
                    <span class="d-inline-block iconfont icon-mudedi1"></span>
                    <span>选电影</span>
                </h6>

                <div class="mb-3 border-bottom pb-2 ml-4">
                    <Tabs :datas="param" v-model="selected" @change="change"></Tabs>
                </div>

                <div class=" ml-4 mt-3">
                    <Radio v-model="value5" :datas="param5" keyName="code" titleName="name"></Radio>
                </div>

                <div class="container">
                    <div class="row w-100 m-0 p-0">
                        <div class="col-6 col-md-3 p-1 card border-0 position-relative">
                            <img class="card-img" src="" @click="jumpToDetails(item.sid)" />
                            <div class="card-footer m-0 p-1">
                                <p class="m-0" v-cloak>电影名</p>
                                <p class="m-0" v-cloak>评分</p>
                            </div>
                            <!-- <img class="no-shadow" :src="hotImgUrl"> -->
                        </div>
                        <div class="col-6 col-md-3 p-1 card border-0 position-relative">
                            <img class="card-img" src="" @click="jumpToDetails(item.sid)" />
                            <div class="card-footer m-0 p-1">
                                <p class="m-0" v-cloak>电影名</p>
                                <p class="m-0" v-cloak>评分</p>
                            </div>
                            <!-- <img class="no-shadow" :src="hotImgUrl"> -->
                        </div>
                        <div class="col-6 col-md-3 p-1 card border-0 position-relative">
                            <img class="card-img" src="" @click="jumpToDetails(item.sid)" />
                            <div class="card-footer m-0 p-1">
                                <p class="m-0" v-cloak>电影名</p>
                                <p class="m-0" v-cloak>评分</p>
                            </div>
                            <!-- <img class="no-shadow" :src="hotImgUrl"> -->
                        </div>
                        <div class="col-6 col-md-3 p-1 card border-0 position-relative">
                            <img class="card-img" src="" @click="jumpToDetails(item.sid)" />
                            <div class="card-footer m-0 p-1">
                                <p class="m-0" v-cloak>电影名</p>
                                <p class="m-0" v-cloak>评分</p>
                            </div>
                            <!-- <img class="no-shadow" :src="hotImgUrl"> -->
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="btn btn-light p-2 bordered w-100">
                        <router-link class="text-center primary-color" to="/Spots"> 查看更多&gt;</router-link>
                    </div>

                </div>


            </div>
            <!--全部类型end-->


        </div>
    </section>
</template>
<script>
    // import {getSpotsEffect} from '../assets/js/spots.js'
    export default {
        data() {
            return {
                // background:"background: url(`../img/tab/tab01.png`) no-repeat center center;",
                // -------------------------------轮播数据start---------------------------------------------------
                carousel: {
                    timer: null,
                    Imgs: ["", "", "", ""],
                    cid: 14,
                    i: 0
                },

                //电影类型
                param: {
                    module1: '惊悚',
                    module2: '悬疑',
                    module3: '冒险',
                    module4: '爱情',
                    module5: '伦理'
                },
                selected: 'module1',
                //电影排序
                value5: 'a1',
                param5: [{ name: '按热度排序', code: 0 }, { name: '按时间排序', code: 1 }]
                // spots03:{
                //     imgs:["","","",""],
                //     hotImgUrl:this.$store.state.url+'/img/tab/hot.png'
                // }

            }
        },
        methods: {

            change(data) {
                this.$Message.info(`切换至${data.title}`, 1000);
            },
            // -------------------------------------轮播方法start------------------------------------------------
            loadCarousel() {
                this.axios.get(this.$store.state.url + `/spots/carousel`, {
                    params:
                        { num1: 9, num2: 11, num3: 14, num4: 16 }
                }).then(res => {
                    this.carousel.Imgs = res.data;
                    // console.log(res.data);
                })
            },
            task() {
                var index = this.carousel.i % this.carousel.Imgs.length;
                this.carousel.cid = this.carousel.Imgs[index].cid;
                this.carousel.i++;
            },
            startCarousel() {
                this.timer = setInterval(this.task, 3000);
            },
            pauseCarousel() {
                clearInterval(this.timer);
            },
            // -----------------------------------轮播方法end--------------------------------------------------
        },
        created() {
            this.loadCarousel();
            this.startCarousel();
        },
        destroyed() {
            if (this.carousel.timer) {
                clearInterval(this.carousel.timer);
            }
        }
    }
</script>
<style>
    @import '../assets/css/Movies.css';
    [v-cloak] {
        display: none;
    }

    .app-spots #body #all-spots>div>div>div {
        border: none;

    }

    .h-tabs-default {
        border-bottom: none;
    }
</style>