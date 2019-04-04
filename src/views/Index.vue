<template>
    <section>
        <!-- 轮播 -->
        <div class="container-fluid pr-0 pl-0 mr-0">
            <div class="row carouselBox border position-relative mr-0 ml-0 ">
                <div class="col-sm-12 imgLg p-0 ">
                    <div class="box" :class="carousel.ind==index?'first':''" v-for="(item,index) in carousel.carouselList">
                        <picture style="width: 100%">
                            <source media="(min-width: 999px)" :srcset="item.lg_url">
                            <source media="(max-width:1000px)" :srcset="item.md_url">
                            <img class="w-100" :src="item.src">
                        </picture>
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


        <div class="container mb-5">
            <div class="row mt-5 pt-4">
                <div class=" col-sm-12 col-md-9">
                    <!-- 热门电影 -->
                    <div class="popMovie">
                        <div class="row">
                            <div class="text-left pb-4">
                                <span class="pop_title">热门电影</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-2 col-md-2 col-sm-3 col-3  mb-2" v-for="item in  guide.imgList">
                                <div class="">
                                    <img src="http://127.0.0.1:83/img/movieImg/love/mo6.jpg" alt="" class="w-100" @click="$router.push('/strategy_details?pid='+item.pid)">
                                    <p>
                                        比悲伤更悲伤的故事
                                        <strong style="color: #e09015">8.2</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="btn btn-light p-2 bordered w-100 mt-2">
                            <router-link class="text-center" to="/movies"> 查看全部电影&gt;</router-link>
                        </div>
                    </div>
                    <!-- 热门推荐 -->
                    <div class="popRecommend">
                        <div class="row">
                            <div class="text-left pb-4">
                                <span class="pop_title">热门推荐</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 col-md-3 col-sm-4 col-4  mb-2" v-for="item in  guide.imgList">
                                <div class="">
                                    <img src="http://127.0.0.1:83/img/movieImg/love/mo6.jpg" alt="" class="w-100" @click="$router.push('/strategy_details?pid='+item.pid)">
                                    <p>
                                        比悲伤更悲伤的故事
                                        <strong style="color: #e09015">8.2</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 热门评论 -->
                    <div class="popComment">
                        <div class="row">
                            <div class="text-left pb-4">
                                <span class="pop_title">热门影评</span>
                            </div>
                        </div>
                        <!-- <div class="col-4  mb-2">
                                    <img src="http://127.0.0.1:83/img/movieImg/love/mo6.jpg" alt="" class="w-100" @click="$router.push('/strategy_details?pid='+item.pid)">
                                </div>
                                <span class="col-8  mb-2">
                                    wwwwww
                                </span> -->
                        <div id="comments" class="pt-4 pl-2 pr-2 container">
                            <div class="row ml-0 mr-0 mb-3  position-relative" 
                              @click="jumpToDetail(item.tid,$event)">
                                <div class="col-3">
                                    <img class="img-fluid p-0 w-60" src="http://127.0.0.1:83/img/movieImg/love/mo6.jpg">
                                </div>
                                <div class="col-9">
                                    <div class="one-row ">
                                        <div class="row text-muted m-0">
                                            <div class="col text-left p-0">
                                                <p>相伤害”——步履不停的思考生命的本质 </p>
                                                <p class="">
                                                    <span>云淡风轻</span>
                                                    评论
                                                    <span>《步履不停》</span>
                                                </p>
                                                <Rate v-model="rate"></Rate>
                                                <p class="content">
                                                    “所谓主角，是指即便没有出现在画面上，但仍然支配着整部电影的人。但到 底支配着什么呢？就是台词动作、情感，有时还包括剪辑。总而言之， 电影主角就是与镜头这一侧的导演呼吸频率同步的人。”...
                                                </p>
                                            </div>
                                        </div>
                                        <div class="position-absolute" style="bottom: 10px;right: 10px">
                                            <div class="text-right">

                                                <!-- <span class="iconfont icon-browse">&nbsp;</span>
                                                <span>浏览数</span> -->
                                                <span class="iconfont icon-love" style="color: #fcc">&nbsp;</span>
                                                <span>点赞数</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="btn btn-light p-2 bordered w-100 mt-5">
                            <router-link class="text-center" to="/comments"> 查看全部影评&gt;</router-link>
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
                // 评分
                rate: 3,

                guide: {
                    imgList: ['', '', '', '', '', '', '', '', '', '', '', '']
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
            changeActiveIndex(i){
            this.activeIndex = 1;
        },
        },
        created() {
            this.loadCarousel();
            this.carouselTask();

        },
        computed: {
            ...mapState(['userMsg'])
        },

    }
</script>
<style>
    @import '../assets/css/index.css';
</style>