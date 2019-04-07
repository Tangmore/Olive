<template>
    <section class='mb-5' v-cloak>
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
                                    <a class="btn comment" style='color:#fff' href='#commentBox'>
                                        <i class="iconfont icon-dianping"></i>评论</a>
                                    <span class="btn wanted">
                                        <i class="iconfont icon-love "></i>想看</span>
                                </p>
                                    <router-link class="btn buy" target="_blank" :to="'/movies?'+movieDetail.id" style="color: #fff;outline: none">特惠购票</router-link>
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
        <!-- 介绍 -->
        <div class="container intro mb-4 ">
            <p class="tab-title mb-3 pl-2" style="border-left: 4px solid #f00;">介绍</p>
            <span>{{movieDetail.describle}}</span>
            <!-- 评论 -->
        </div>
        <div class="container commentsList mb-5 ">
            <div class="comment-top row pl-3 mb-2">
                <span class="col-10 tab-title mb-3 pl-2" style="border-left: 4px solid #f00;">热门评论</span>
                <a class="col-2 public-comment-btn btn d-flex justify-content-center flex-column" style="color: #f00" href='#commentBox'>写评论</a>
            </div>
            <div class="row ml-0 mr-0 mb-3 item border-bottom pb-2" v-for="(item,i) of currentPageData" :key="i">
                <div class="col h-100 p-0 ml-1">
                    <div class="row align-items-end text-muted m-0">
                        <div class="col text-left p-0 mb-1">
                            <img :src="item.imgUrl" alt="" class="userAvatar">
                            <span class="d-none d-sm-inline" style="font-size: 16px;color: #000">&nbsp;{{item.name}}&nbsp;&nbsp;</span>
                            <span>{{item.createTime}}</span>
                        </div>
                        <div class="col-auto text-right p-0 mr-2 mb-2">
                            <span class="iconfont icon-zan pr-1" @click='isZan(item.id,item.flag)' :class="item.flag?'zan':''">&nbsp;</span>
                            <span>{{item.pointsNum}}</span>
                        </div>
                    </div>
                    <p class="w-100 p-1 m-0 desc" style="text-indent:24px">
                        {{item.comment}}
                    </p>
                </div>
            </div>

            <div v-if="commentsTotal==0">
                <p class="p-2 text-muted text-center floor">
                    还没有人评论哦！！
                </p>
            </div>

            <!-- 评论分页 -->
            <div class="text-right" v-if="commentsTotal!=0">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[6, 8, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>

            <!-- 发表评论 -->
            <div class="public-comment-box" id='commentBox'>
                <div class="row ml-1 mr-1 mb-1 ml-sm-3 mr-sm-3 mb-sm-3 align-items-center position-relative">
                    <textarea class="col m-1 border  mt-2  p-sm-2" placeholder="写下你的评论(字数在300以内)..." v-model="myComment" rows="6"></textarea>
                </div>
                <div class="d-flex justify-content-end flex-row">
                    <button type="button" class="m-1 h-50 btn public-btn 
                          ml-4 mb-5" :disabled='iscanPublicComment' @click="submitComment()">发表</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Toast from '@/components/toast.vue';
    export default {
        data() {
            return {
                movieDetail: [],
                commentsList: [],
                commentsTotal: 0,
                // 评论
                currentPageData: [],
                //所有信息
                // 每页显示条数
                pageSize: 6,
                // 当前页
                currentPage: 1,
                // 总条数
                total: 0,
                myComment: "",
                iscanPublicComment: false,
                thisMovieId: ''
            }
        },
        components: {
            Toast
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

            // 评论分页
            getComments(pageSize, currentPage, path) {
                var url = this.$store.state.url
                    + 'managemodule/comment/' + path + '?map[fkMovieId]=' + this.thisMovieId;
                this.axios({
                    method: 'GET',
                    url: url,
                    params: { pageSize: pageSize, currentPage: currentPage },
                    headers: { 'TLUSER': sessionStorage.getItem('token') }
                })
                    .then(res => {
                        console.log(res);
                        if (res.status == 200) {
                            if (res.data.rows) {
                                this.total = res.data.total;
                                for (var item of res.data.rows) {
                                    item.imgUrl = this.$store.state.url + item.imgUrl;
                                    // console.log(item.imgUrl)
                                }
                                this.currentPageData = res.data.rows;
                                this.commentsTotal = this.currentPageData.length;
                            } else {
                                this.commentsTotal = 0;
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            handleSizeChange(val) {
                this.currentPageData = [];
                this.page = 0;
                this.total = 0;
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getComments(val, this.currentPage);
            },
            handleCurrentChange(val) {
                this.currentPageData = []
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getComments(this.pageSize, val);
            },
            submitComment() {
                if (this.myComment.length > 300) {
                    this.$message.error('评论字数保持在300以内！');
                    return;
                }
                var url = this.$store.state.url + 'managemodule/comment/addComment';
                this.axios({
                    method: 'POST',
                    url,
                    data: { fkMovieId: this.thisMovieId, comment: this.myComment },
                    headers: { 'TLUSER': sessionStorage.getItem('token') }
                })
                 .then(res => {
                        if (res.data.state) {
                            this.$message.success(res.data.msg);
                        } else {
                            this.$router.push('/login_register');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            // 赞与取消点赞
            isZan(id,flag) {
                let _this = this;
                var url = _this.$store.state.url + 'managemodule/user/selectMyInfo';
                this.axios({
                    method: 'GET',
                    url,
                    headers: { 'TLUSER': sessionStorage.getItem('token') }
                }).then(res => {
                    if (res.status == 200) {
                        if (res.data.state) {
                            if(flag){
                                var url = this.$store.state.url + 'managemodule/commentUser/deleteCommentUser';
                            }else{
                                var url = this.$store.state.url + 'managemodule/commentUser/addCommentUser';
                            }
                            this.axios({
                                method: 'POST',
                                url,
                                data: { fkCommentId: id },
                                headers: { 'TLUSER': sessionStorage.getItem('token') }
                            })
                                .then(res => {
                                    if (res.data.state) {
                                        this.$message.success(res.data.msg);
                                        this.getComments(this.pageSize, this.currentPage, 'selectPageByMovieId');
                                    } else {
                                        this.$router.push('/login_register');
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        } else {
                            this.$router.push('/login_register');
                        }
                    }
                })
                    .catch(err => {
                        console.log(err);
                    })
            },
       
            selectIsLogin: function () {
                let _this = this;
                var url = _this.$store.state.url + 'managemodule/user/selectMyInfo';
                this.axios({
                    method: 'GET',
                    url,
                    headers: { 'TLUSER': sessionStorage.getItem('token') }
                }).then(res => {
                    if (res.status == 200) {
                        if (res.data.state) {
                            //调用用户登录了的评论查询
                            _this.getComments(this.pageSize, this.currentPage, 'selectPageByMovieId');
                        } else {
                            //调用未登录的查询
                            _this.getComments(this.pageSize, this.currentPage, 'selectPageByNoLogin');
                        }
                    }
                })
                .catch(err => {
                        console.log(err);
                 })
            }

        },

        mounted() {
            // 电影详情
            this.initMovieInfoById();
            this.selectIsLogin();

        }
    }
</script>
<style>
    @import '../assets/css/movie_details.css';
</style>