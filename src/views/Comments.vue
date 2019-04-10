<template>
    <section class="pop-comment">
        <div class="container p-0 mt-5">
            <div id="navigation" class="row  m-auto pt-5 mt-5">
                <Tabs :datas="tabsParam" v-model="tsbselected" @change="change" style="border: none"></Tabs>
            </div>
            <!-- 热门评论 -->
            <div class="popComment mt-4">
                <div id="comments" class="pt-4 pl-2 pr-2 container">
                    <div class="row ml-0 mr-0 mb-5 pb-3  comments-item position-relative" @click="$router.push('/movie_details?id='+item.fkMovieId)"
                        v-for='(item,index) in top10CommentArr'>
                        <div class="col-2">
                            <img class="img-fluid p-0" style="width: 60%" :src="item.movieImgUrl">
                        </div>
                        <div class="col-10">
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
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                top10CommentArr: [],
                state: {
                    tab: "hot",
                    pno: 1,//用户需要显示的页码，默认为1
                    pageSize: 6,
                },
                tabsParam: {
                    module1: '热门评论',
                    module2: '最近发表',
                    module3: '全部发表'
                },
                tsbselected: 'module1'
            }
        },
        methods: {
            change(data) {
                // this.$Message.info(`切换至${data.title}`, 1000);
            },
            initTop10Comment() {
                this.axios.get(this.$store.state.url + 'managemodule/comment/selectAll').then(res => {
                    if (res.status == 200) {
                        console.log(res)
                        for (var item of res.data.rows) {
                            item.movieImgUrl = this.$store.state.url + item.movieImgUrl;
                            item.imgUrl = this.$store.state.url + item.imgUrl;
                            this.top10CommentArr = res.data.rows;
                        }
                        this.top10MovieArr = res.data.rows;
                    }
                })
            },
            changeState(e) {
                if (e.target.nodeName === "SPAN") {
                    this.state.tab = e.target.dataset.tab;
                }
            },
        },
        watch: {
            tempNum() {
                // console.log("activeEle"+this.activeEle);
                this.state.pno = Number(this.activeEle) + Number(this.tempNum);
            },
            activeEle() {
                this.state.pno = Number(this.activeEle) + Number(this.tempNum);
            },
            "state.tab"() {
                this.tempNum = 1;
                this.activeEle = 0;
            }
        },

        mounted() {
            this.initTop10Comment();
        }
    }
</script>
<style>
    @import '../assets/css/index.css';
</style>