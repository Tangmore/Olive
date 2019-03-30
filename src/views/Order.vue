<template>
    <section class="strategy">
        <div class="container-fluid  p-0">
            <div class="imgLg  p-0 w-100 position-relative">
                <picture class=" imgLg">
                    <source media="(min-width: 999px)" :srcset="carousel.lg_url">
                    <source media="(max-width:1000px)" :srcset="carousel.md_url">
                    <img class="w-100" :src="carousel.src">
                </picture>
            </div>
        </div>

        <div class="container strategy_content pt-5 ">
            <div class="row">
                <div class="col-md-3  pl-0 content_left">
                    <h3 class="mb-1 text-muted p-2">
                        <i class="iconfont icon-mudedi1"></i> 分类排行榜</h3>

                    <div class="orderByType">
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


                <div class="col-md-9 content_right">
                    <h3 class="mb-3 p-2 text-muted">电影排行榜</h3>

                    <!-- <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-4 col-4  mb-2" v-for="item in  guide.imgList">
                            <div class="">
                                <img :src="item.img" alt="" class="w-100" @click="$router.push('/strategy_details?pid='+item.pid)">
                                <p>名称{{item.spot}}
                                    <span>评分{{item.tview}}</span>
                                </p>
                            </div>
                        </div>
                    </div> -->


                    <div id="content" class="pt-4 pl-2 pr-2 container">
                            <div class="row ml-0 mr-0 mb-3 item"  v-for="(item,i) of list" :key="i" @mouseenter="changeActiveIndex(i)" @mouseleave="changeActiveIndex('')" @click="jumpToDetail(item.tid,$event)">
                                <div class="col-auto h-100 pr-1 pl-0">
                                    <img class="img-fluid h-100 p-0" :src="item.headerImg" >
                                </div>
                                <div class="col h-100 p-0 ml-1">
                                    <p class="w-100 m-0 title pt-2" :class="activeIndex===i?'text-warning':''">{{item.title}}</p>
                                    <p class="w-100 p-1 m-0 desc">
                                       {{item.describle}}
                                    </p>
                                    <div class="row align-items-end text-muted m-0">
                                        <div class="col text-left p-0">
                                            <span>{{new Date().toLocaleDateString()}}</span>
                                            <span class="d-none d-sm-inline">&nbsp;{{item.uname || "匿名"}}&nbsp;&nbsp;</span>
                                            <span class="iconfont icon-browse">&nbsp;</span>
                                            <span >{{item.tview}}</span>
                                        </div>
                                        <div class="col-auto text-right p-0 mr-2">
                                            <span class="iconfont icon-love ">&nbsp;</span>
                                            <span>{{item.zan}}</span>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </div> 
                    <!-- 分页 -->
                    <!-- <h6 class="mb-3 p-2 text-muted small mt-4 text-left"> -->
                        <!-- <nav aria-label="Page navigation example">
                            <ul class="pagination mb-0 justify-content-end">
                                <li class="page-item" :class="pno==1?'disabled':''">
                                    <p class="page-link bg-transparent" href="#" @click='prePage'>上一页</p>
                                </li>
                                <li class="page-item" :class="pno==i?'active':''" v-for='i in pageCount'>
                                    <p class="page-link" :class="pno!=i?'bg-transparent':'border'" href="#" @click='curPage(i)'>{{i}}</p>
                                </li>
                                <li class="page-item" :class="pno==pageCount?'disabled':''">
                                    <p class="page-link bg-transparent" href="#" @click='nextPage'>下一页</p>
                                </li>
                            </ul>
                        </nav> -->


                        <!-- <Pagination :cur="current" :total="total" :pagerSize="3" @change="currentChange" :small="true" layout="total,sizes,pager,jumper"></Pagination> -->
                    <!-- </h6> -->

                </div>

            </div>
        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                carousel: '',
                spot: [],
                strategyList: [],  //当前页内容
                pageIndex: 0,   //页码
                pageSize: 6, //页大小
                pageCount: 0,
                pno: 1,
                guide: {
                    imgList: ['', '', '', '', '', '', '', '', '', '', '', '']
                },
                //分页
                current: 1,
                total: 200,
                list:["","","","","",""],
            activeIndex:""
            }
        },
        methods: {
            changeActiveIndex(i){
            this.activeIndex = i;
        },
        jumpToDetail(tid,e){
            e.preventDefault();
            
            this.$router.push({path:"/travel_detail",query:{tid:tid}});
        },
            currentChange(value) {
                this.total = this.total + 1;
                console.log(value.cur, value.size);
            },
            // 大图
            loadCarousel() {
                this.axios.get(this.$store.state.url + '/strategy/bigimg', { params: { num: 10 } }).then(res => {
                    this.carousel = res.data[0];
                })
            },
            //   获取排行数据
            loadTab() {
                this.axios.get(this.$store.state.url + '/strategy/tab').then(res => {
                    this.spot = res.data;
                })
            },
            //   获取分页数据
            loadStrategy() {
                this.axios.get(this.$store.state.url + '/strategy/getStrategy', { params: { pno: this.pno, pageSize: this.pageSize } }).then(res => {
                    this.strategyList = res.data.data;
                    //  console.log(res.data);
                    this.pageCount = res.data.pageCount;
                    for (var item of this.strategyList) {
                        item.img = item.img.split('&');

                    }
                })
            },
            //   分页切换
            prePage() {
                this.pno--;
                this.loadStrategy();

            },
            curPage(i) {
                this.pno = i;
                this.loadStrategy();
            },
            nextPage() {
                this.pno++;
                this.loadStrategy();
            },
            jumpToDetails(id) {
                this.$router.push("/strategy_details?pid=" + id);   //跳转至strategy_details.vue
            }
        },
        created() {
            this.loadCarousel();
            this.loadTab();
            this.loadStrategy();
        }
    }
</script>
<style>
    @import '../assets/css/Order.css';

</style>