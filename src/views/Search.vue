<template>
    <section class="strategy mt-5 p-5">
        <div class="info text-center" style="color: #999">
                <h3 style="color:#ffb400;margin-left: 10px">搜索：{{searchParams}}</h3>
        </div>
        <div id="top10" class="pt-4 pl-2 pr-2 container">
            <div class="row ml-0 mr-0 mb-3  position-relative" @click="jumpToDetail(item.id,$event)" v-for='(item,index) in currentPageData'>
                <div class="col-2">
                    <img class="img-fluid p-0 w-60" :src="item.imgUrl">
                </div>
                <div class="col-8">
                    <div class="one-row ">
                        <div class="row text-muted m-0">
                            <div class="col text-left p-0 mt-4">
                                <p style="font-size: 20px;color: #333;">{{item.movieName}} </p>
                                <p class="pt-1">主演:
                                    <span class="ml-1">{{item.starring}}</span>
                                </p>
                                <p class="content pt-1" style="color: #999">上映时间:
                                    <span class="ml-1">{{item.startTime}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-1 d-flex flex-column justify-content-center score">{{item.praise}}</div>
            </div>
        </div>
        <div v-if='searchResultLength==0' class="info text-center" style="color: #999;margin-top: 200px;margin-bottom: 200px">
                <h1 style="margin-left: 10px">未查询到相关电影信息！</h1>
        </div>
        <div :class="searchResultLength==0?'d-none':''" class="block container text-right">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[6, 8, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                date: new Date().toLocaleDateString().split('/').join('-'),
                rate: '',
                top10MovieArr: [],
                pageSize: 10,
                currentPage: 1,
                total: 0,
                currentPageData: [],
                searchParams: this.$route.query.content,
                searchResultLength:0
            }
        },
        watch: {
            searchParams: function (new_v, old_v) {
                this.movienameSearch();
                console.log(new_v)
            }
        },
        methods: {
            movienameSearch() {
                var params = this.$route.query.content;
                var url = this.$store.state.url + 'managemodule/movie/selectPageMovie?map[movieName-like]=' + params;
                this.axios({
                    method: 'GET',
                    url,
                    params: { pageSize: this.pageSize, currentPage: this.currentPage }
                })
                    .then(res => {
                        console.log(res);
                        if (res.status == 200) {
                            if (res.data.rows) {
                                for (var item of res.data.rows) {
                                    item.movieImgUrl = this.$store.state.url + item.movieImgUrl;
                                    item.imgUrl = this.$store.state.url + item.imgUrl;
                                }
                                this.total = res.data.total;
                                this.currentPageData = res.data.rows;
                                this.searchResultLength=res.data.rows.length;
                            } else {
                                // this.$message.error('');
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            handleSizeChange(val) {
                this.currentPageData = []
                this.page = 0;
                this.total = 0;
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.infoInit(val, this.currentPage);
            },
            handleCurrentChange(val) {
                this.currentPageData = []
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.infoInit(this.pageSize, val);
            },

            jumpToDetail(id) {
                this.$router.push("/movie_details?id=" + id);   //跳转至movie_details.vue
            }
        },
        mounted() {
            this.movienameSearch();
        }
    }
</script>
<style scoped>
    .moviename {
        color: #f00;
        font-size: 24px;
    }

    .score {
        color: #ffb400;
        font-size: 36px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
</style>