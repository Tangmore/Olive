<template>
    <section>
        <!-- 轮播 -->
        <div class="container-fluid pr-0 pl-0 mr-0">
            <div class="row carouselBox border position-relative mr-0 ml-0 ">
                <div class="col-sm-12 imgLg p-0 ">
                    <div class="box" :class="carousel.ind==index?'first':''" v-for="(item,index) in carousel.carouselList">
                        <picture>
                            <source media="(min-width: 999px)" :srcset="item.lg_url">
                            <source media="(max-width:1000px)" :srcset="item.md_url">
                            <img class="w-100" :src="item.src">
                        </picture>
                        <!-- <div class="position-absolute">
                            <h4>{{item.day}}<span>/{{item.years}}</span>  </h4>
                            <p >{{item.tip}}</p>
                        </div> -->
                    </div>
                </div>

                <div class="imgMd position-absolute w-40">
                    <ul class="d-flex flex-column justify-content-center">
                        <li v-for="(item,index) in carousel.carouselList" :class="carousel.ind==index?'cuur':''" @mousemove="carousel.ind=index">
                            <img :src="item.sm_url" class="li_item w-100 mb-1" />
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <!-- 热门电影 -->
        <div class="container">
            <div class="row mt-5 pt-4">
            <div class=" col-sm-12 col-md-9">
                <div class="row ">
                    <div class="text-left pb-4 ">
                        <span class="pop_title">热门电影</span>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-4 col-4  mb-2" v-for="item in  guide.imgList">
                            <div class="">
                                <img :src="item.img" alt="" class="w-100" @click="$router.push('/strategy_details?pid='+item.pid)">
                                <p>名称{{item.spot}}
                                    <span>评分{{item.tview}}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="btn btn-light p-2 bordered w-100">
                        <router-link class="text-center" to="/Spots"> 查看全部电影&gt;</router-link>
                    </div>
                </div>

                <div class="row"> 
                    <div class="text-left pb-4">
                        <span class="pop_title">热门推荐</span>
                    </div>
                </div>


                <div class="row">
                        <div class="text-left pb-4">
                                <span class="pop_title">热门影评</span>
                            </div>
                    <div class="btn btn-light p-2 bordered w-100">
                        <router-link class="text-center" to="/Spots"> 查看全部电影&gt;</router-link>
                    </div>
                </div>

            </div>
            <div class="col-md-3  orderWeekBox">
                <p class="mb-4"> 一周口碑榜</p>
                <div class="orderByWeek">
                    <table class="w-100">
                        <tr>
                            <td>1</td>
                            <td>111</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>222</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>333</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>444</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>666</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>777</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>888</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>999</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>100</td>
                        </tr>
                    </table>
                </div>
            </div>


        </div>
        </div>
        
        <Toast v-if="loginAlert" :toastMsg="loginAlertMsg" :toastClass="loginAlertBgColor"></Toast>
    </section>
</template>

<script>
    import { mapState } from 'vuex'
    import Toast from "@/components/toast.vue"
    export default {
        data() {
            return {
                imgUrl: this.$store.state.url + "/img/background/loading.gif",
                carousel: {
                    carouselList: [
                        {
                            'md_url': this.$store.state.imgUrl + '/img/carousel/500_250_bg1.jpg', 'lg_url': this.$store.state.imgUrl + '/img/carousel/1920_520_bg1.jpg',
                            'sm_url': this.$store.state.imgUrl + '/img/carousel/40_40_bg1.jpg'
                        },
                        {
                            'md_url': this.$store.state.imgUrl + '/img/carousel/500_250_bg2.jpg', 'lg_url': this.$store.state.imgUrl + '/img/carousel/1920_520_bg2.jpg',
                            'sm_url': this.$store.state.imgUrl + '/img/carousel/40_40_bg2.jpg'
                        },
                        {
                            'md_url': this.$store.state.imgUrl + '/img/carousel/500_250_bg3.jpg', 'lg_url': this.$store.state.imgUrl + '/img/carousel/1920_520_bg3.jpg',
                            'sm_url': this.$store.state.imgUrl + '/img/carousel/40_40_bg3.jpg'
                        },
                        {
                            'md_url': this.$store.state.imgUrl + '/img/carousel/500_250_bg4.jpg', 'lg_url': this.$store.state.imgUrl + '/img/carousel/1920_520_bg4.jpg',
                            'sm_url': this.$store.state.imgUrl + '/img/carousel/40_40_bg4.jpg'
                        },
                        {
                            'md_url': this.$store.state.imgUrl + '/img/carousel/500_250_bg5.jpg', 'lg_url': this.$store.state.imgUrl + '/img/carousel/1920_520_bg5.jpg',
                            'sm_url': this.$store.state.imgUrl + '/img/carousel/40_40_bg5.jpg'
                        }],
                    timer: null,
                    ind: 0
                },
                tab: {
                    barList: ['亚洲', '欧洲', '美洲', '全球'],
                    ind: 0,
                    imgList: []
                },
                guide: {
                    imgList: ['', '', '', '', '', '', '', '', '', '', '', '']
                },

                travel: {
                    travelList: ['', '', '', '']
                },
                loginAlert: false,
                loginAlertMsg: "请先登录 !",
                loginAlertBgColor: "bg-dark position-fixed"
            }
        },
        components: {
            Toast
        },
        methods: {
            carouselTask() {
                this.carousel.timer = setInterval(() => {
                    this.carousel.ind++;
                    if (this.carousel.ind > this.carousel.carouselList.length - 1) {
                        this.carousel.ind = 0;
                    }
                }, 4000)
            },
            loadCarousel() {
                this.axios.get(this.$store.state.url + '/index/carousel', {
                    params: { num1: 1, num2: 4, num3: 8, num4: 17, num5: 18 }
                }).then(res => {
                    this.carousel.carouselList = res.data;
                })
            },


            //http://localhost:3001/index/tab
            loadTab() {
                this.axios.get(this.$store.state.url + '/index/tab'
                ).then(res => {
                    this.tab.imgList = res.data;
                })
            },
            loadGuide() {
                this.axios.get(this.$store.state.url + '/index/guide'
                ).then(res => {
                    this.guide.imgList = res.data;
                    for (var item of this.guide.imgList) {
                        item.img = item.img.split('&')[0];
                    }
                    //  console.log(this.guide.imgList)
                })
            },

            loadpopTravels() {
                this.axios.get(this.$store.state.url + "/index/travel").then((res => {
                    //  console.log(res)
                    this.travel.travelList = res.data;
                }))
            },

            toAddtravel() {
                if (this.userMsg) {
                    this.$router.push('/add_travel')
                } else {
                    this.loginAlert = true;
                    setTimeout(() => {
                        this.loginAlert = false;
                    }, 2000)
                }
            }
        },
        created() {
            this.loadCarousel();
            this.carouselTask();
            this.loadTab();
            this.loadGuide();
            this.loadpopTravels();
        },
        computed: {
            ...mapState(['userMsg'])
        },

    }
</script>
<style>
    @import '../assets/css/index.css';
</style>