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
                    <div class="row">
                            <div class="text-left pb-4">
                                <span class="pop_title pl-2" style="border-left:4px solid #ffb400">热门电影</span>
                            </div>
                        </div>
                    <div class="row">
                        <div class="movie-item col-lg-3 col-md-3 col-sm-3 col-3  mb-2" v-for="item in popMovieList.imgList">
                            <a @click="$router.push('/movie_details?id='+item.id)" target="_blank">
                                <div class="movie-poster position-relative">
                                    <img :src="item.imgUrl" class="w-100">
                                    <div class="movie-overlay">
                                        <div class="movie-info">
                                            <div class="movie-score">
                                                <i>{{item.praise}}</i>
                                            </div>
                                            <div class="movie-title movie-title-padding" :title="item.movieName">{{item.movieName}}</div>
                                        </div>
                                    </div>
                                </div> 
                            </a>
                            <div class="movie-sale">
                                <a @click="$router.push('/tickets?id='+item.id)" class="active" target="_blank" data-act="salePlayingMovie-click" data-val="{movieid:345875}">购 票</a>
                            </div>
                        </div>
                        <div class="btn btn-light p-2 bordered w-100 mt-5 mb-4">
                                <router-link class="text-center" to="/movies"> 查看更多&gt;</router-link>
                            </div>
                    </div>

                    <!-- 热门评论 -->
                    <div class="popComment">
                        <div class="row">
                            <div class="text-left pb-4">
                                <span class="pop_title pl-2" style="border-left:4px solid #ffb400">热门影评</span>
                            </div>
                        </div>
               
                        <div id="comments" class="pt-4 pl-2 pr-2 container">
                            <div class="row ml-0 mr-0 mb-5 pb-3  comments-item position-relative" @click="$router.push('/movie_details?id='+item.fkMovieId)" v-for='(item,index) in top10CommentArr'>
                                <div class="col-2">
                                    <img class="img-fluid p-0 w-60" :src="item.movieImgUrl">
                                </div>
                                <div class="col-9">
                                    <div class="one-row ">
                                        <div class="row text-muted m-0">
                                             <div class="col text-left p-0">
                                        <p class="">
                                            <img style="width: 26px;height: 26px" :src="item.imgUrl" alt="">
                                            <span style='color: #666699;font-weight: bold'>{{item.name}}</span>
                                            评论
                                            <span style="color: #666699;">{{item.movieName}}</span>
                                            <span class="pl-2" style="color: #ccc;font-size: 12px">{{item.createTime}}</span>
                                        </p>
                                        <p class="content mt-2">
                                            {{item.comment}}
                                        </p>
                                    </div>
                                        </div>
                                        <div class="position-absolute" style="bottom: 0;right: 10px">
                                            <div class="text-right">
                                                <span class="iconfont icon-love" style="color: #fcc">&nbsp;</span>
                                                <span>{{item.pointsNum}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="btn btn-light p-2 bordered w-100 mt-5">
                            <router-link class="text-center" to="/comments"> 查看更多&gt;</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-md-3  orderWeekBox">
                    <p class="mb-4" style="color: #ffb400;font-size: 18px"> 热映Top10</p>
                    <div class="orderByWeek">
                        <table class="w-100">
                            <tr v-for='(item,index) in top10MovieArr' @click="$router.push('/movie_details?id='+item.id)">
                                <td style="color: #ffb400">{{index+1}}</td>
                                <td>{{item.movieName}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                carousel: {
                    carouselList: [
                        {
                            'md_url': this.$store.state.url + 'systemImg/' + '500_250_bg1.jpg', 'lg_url': this.$store.state.url + 'systemImg/' + '1920_520_bg1.jpg',
                            'sm_url': this.$store.state.url + 'systemImg/' + '40_40_bg1.jpg'
                        },
                        {
                            'md_url': this.$store.state.url + 'systemImg/' + '500_250_bg2.jpg', 'lg_url': this.$store.state.url + 'systemImg/' + '1920_520_bg2.jpg',
                            'sm_url': this.$store.state.url + 'systemImg/' + '40_40_bg2.jpg'
                        },
                        {
                            'md_url': this.$store.state.url + 'systemImg/' + '500_250_bg3.jpg', 'lg_url': this.$store.state.url + 'systemImg/' + '1920_520_bg3.jpg',
                            'sm_url': this.$store.state.url + 'systemImg/' + '40_40_bg3.jpg'
                        },
                        {
                            'md_url': this.$store.state.url + 'systemImg/' + '500_250_bg4.jpg', 'lg_url': this.$store.state.url + 'systemImg/' + '1920_520_bg4.jpg',
                            'sm_url': this.$store.state.url + 'systemImg/' + '40_40_bg4.jpg'
                        },
                        {
                            'md_url': this.$store.state.url + 'systemImg/' + '500_250_bg5.jpg', 'lg_url': this.$store.state.url + 'systemImg/' + '1920_520_bg5.jpg',
                            'sm_url': this.$store.state.url + 'systemImg/' + '40_40_bg5.jpg'
                        }],
                    timer: null,
                    ind: 0
                },
                // 评分
                rate: 3,
                popMovieList: {
                    imgList: [],
                    pageSize: 12,
                    currentPage: 1,
                    total: 0,
                    currentPageData: []
                },
                loginAlert: false,
                loginAlertMsg: "请先登录 !",
                loginAlertBgColor: "bg-dark position-fixed",

                top10MovieArr:[],
                top10CommentArr:[]
            }
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
            
            changeActiveIndex(i) {
                this.activeIndex = 1;
            },
            //获取电影列表
            initMovieList() {
                var url = this.$store.state.url
                    + 'managemodule/movie/selectPageMovie';
                this.axios({
                    method: 'GET',
                    url: url,
                    params: { pageSize: this.pageSize, currentPage: this.currentPage }
                })
                    .then(res => {
                        // console.log(res);
                        if (res.status == 200) {
                            if (res.data.rows) {
                                this.total = res.data.total;
                                for (var item of res.data.rows) {
                                    item.imgUrl = this.$store.state.url + item.imgUrl;
                                    // console.log(item.imgUrl)
                                }
                                this.popMovieList.imgList = res.data.rows;
                                // console.log(this.popMovieList.imgList);
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
             //获取排行数据
             initNextTen() {
                this.axios.get(this.$store.state.url + 'managemodule/movie/selectTop5ImgUrl').then(res => {
                    if (res.status == 200) {
                        // console.log(res)
                        for(var item of res.data.rows){
                            item.imgUrl=this.$store.state.url+item.imgUrl;
                        }
                        this.top10MovieArr=res.data.rows;
                    }
                })
            },
            initTop10Comment(){
                  this.axios.get(this.$store.state.url + 'managemodule/comment/selectAll').then(res => {
                    if (res.status == 200) {
                        console.log(res)
                        for(var item of res.data.rows){
                         item.movieImgUrl = this.$store.state.url + item.movieImgUrl;
                            item.imgUrl = this.$store.state.url + item.imgUrl;
                        }
                        this.top10CommentArr=res.data.rows;
                    }
                })
            }
        },
        created() {
            this.carouselTask();

        },
        mounted() {
            this.initMovieList();
            this.initNextTen();
            this.initTop10Comment();
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
    .movie-info {
        color: #fff;
        position: absolute;
        bottom: 7px;
        width: 100%;
    }

    .movie-score {
        color: #ffb400;
        float: right;
        margin-right: 10px;
    }

    .movie-title {
        font-size: 16px;
        width: 80%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 22px;
        margin: 0 10px;
    }

    .movie-sale {
        height: 39px;
        line-height: 39px;
    }

    .movie-sale a {
        display: block;
        border: 1px solid #ccc;
        text-align: center;
    }
    .movie-sale a:hover{
        background: #f00;
        color: #fff;
        border: none;
    }
</style>