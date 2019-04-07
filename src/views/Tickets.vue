<template>
    <section>
   <div class="container-fulid banner" style="margin-bottom: 100px">
            <!-- 头部 -->
            <div class="wrapper container position-relative">
                <div class="celeInfo">
                    <div class="row mt-5">
                        <div class="col-3">
                            <img class="avatar w-100" :src="movieDetail.imgUrl" alt="">
                        </div>
                        <div class="col-5">
                            <div class="movie-brief-container mt-4">
                                <h3 class="name">{{movieDetail.movieName}}</h3>
                                <ul>
                                    <li class="pt-2">{{movieDetail.fkTypeName}}</li>
                                    <li class="ellipsis pt-1">{{movieDetail.starring}}</li>
                                    <li class="pt-1">{{movieDetail.filmLength}}</li>
                                    <li class="pt-1">{{movieDetail.startTime}}大陆上映</li>
                                </ul>
                            </div>
                            <div class="mt-3">
                                <p class="float-left">
                                    <!-- <a class="btn comment" style='color:#fff' href='#commentBox'> -->
                                         <!-- <i class="iconfont icon-dianping"></i>评论</a> -->
                                    <p class="btn wanted">
                                        <i class="iconfont icon-love "></i>想看</p>
                                </p>
                                <router-link class="btn buy" target="_blank" to='/movies' style="color: #fff;outline: none">查看更多电影详情</router-link>
                            </div>
                        </div>
                        <div class="col-4 d-flex justify-content-center movie-praise flex-column">
                            <p>用户评分：
                                <p class="praise pt-1">{{movieDetail.praise}}</p>
                            </p>
                            <p class="mt-3">累计观看：
                                <p class="view-count" style="font-size: 30px">{{movieDetail.browseNum}}
                                    <span style="font-size: 12px">人次</span>
                                </p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 影院列表 -->
        <div class="container intro mb-4 ">
                <p class="tab-title mb-3 pl-2" style="border-left: 4px solid #f00;">影院列表</p>
                <!-- <span>地对地导弹</span> -->
                <div class="row">
                    <div class="col-9">
                        <p>影院名称</p>
                        <p>影院地址</p>
                    </div>    
                    <div class="col-3">
                        <span><span>33</span>￥</span>
                        <router-link class="btn" to='/cinema'>购票</router-link>
                    </div>
                </div>

            </div>

    </section>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
       movieDetail: [],
            }
        },
        methods: {
  // 获取当前电影信息
            initMovieInfoById() {
                this.thisMovieId = this.$route.query.id;
                this.axios.get(this.$store.state.url + 'managemodule/movie/selectPageMovie?map[id]=' + this.thisMovieId)
                    .then(res => {
                        if (res.status == 200) {
                            res.data.rows[0].imgUrl = this.$store.state.url + res.data.rows[0].imgUrl;
                            this.movieDetail = res.data.rows[0];
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
        },
       mounted(){
           this.initMovieInfoById();
       }

    }
</script>
<style>
      @import '../assets/css/movie_details.css';
</style>