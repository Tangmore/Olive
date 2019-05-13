<template>
    <section class="app-spots mb-5">
        <!--主体start-->
        <div id="body" class="container pl-0 pr-0">
            <!--全部类型start-->
            <div id="all-spots" class="mt-5">
                <h6 class="pt-4 pb-3  m-0 ">
                    <span class="d-inline-block iconfont icon-mudedi1"></span>
                    <span>选电影</span>
                </h6>
                <div class="mb-3 border-bottom pb-2 ml-4">
                    <Radio v-model="typeId" :datas="typeArr" keyName="id" titleName="typeName" @change="changeMovieType"></Radio>
                </div>
                <div class=" ml-4 mt-3">
                    <Radio v-model="orderById" :datas="orderArr" keyName="id" titleName="name" @change="changeOrderType"></Radio>
                </div>

                <!-- 电影列表 -->
                <div class="row">
                    <div class="movie-item col-lg-2 col-md-2 col-sm-3 col-3  mb-2" v-for="item in popMovieList.imgList">
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
                        <div class="movie-sale pl-0">
                            <a @click="$router.push('/tickets?id='+item.id)"  target="_blank" >购 票</a>
                        </div>
                    </div>
                </div>

                <!-- 电影分页 -->
                <div class="text-right">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                        :page-sizes="[12, 18]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                //电影类型
                selected: 'module1',
                typeId: 1,
                typeArr: [],
                //电影排序
                orderById: '',
                orderByString: 'praise',
                orderArr: [{ name: '按热度排序', id: 0 }, { name: '按时间排序', id: 1 }],
                popMovieList: {
                    imgList: [],
                },
                pageSize: 12,
                // 当前页
                currentPage: 1,
                // 总条数
                total: 0,

            }
        },
        methods: {
            //初始化电影类型下拉
            initMovieType() {
                this.axios.get(this.$store.state.url + 'managemodule/type/selectAllType')
                    .then(res => {
                        // console.log(res);
                        this.typeArr = res.data.rows;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            changeMovieType(data) {
                this.typeId = data.id;
                this.initMovieList(this.typeId, this.orderByString);
            },
            changeOrderType(data) {
                this.orderById = data.id;
                // console.log(data.id)
                if (data.id == 0) {
                    this.orderByString = 'praise';
                } else {
                    this.orderByString = 'create_time';
                }
                this.initMovieList(this.typeId, this.orderByString);
            },
            // 条件查找电影列表
            initMovieList(typeId, orderByString) {
                var url = this.$store.state.url
                    + 'managemodule/movie/selectPageMovie?map[fkTypeId]=' + typeId + '&field=' + orderByString;
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
                                }
                                this.popMovieList.imgList = res.data.rows;
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            handleSizeChange(val) {
                this.popMovieList.imgList = [];
                this.page = 0;
                this.total = 0;
                // console.log(`每页 ${val} 条`);
                this.pageSize = val;
                  this.initMovieList(this.typeId, this.orderById);
            },
            handleCurrentChange(val) {
                this.popMovieList.imgList = []
                // console.log(`当前页: ${val}`);
                this.currentPage = val;
                  this.initMovieList(this.typeId, this.orderById);
            },


        },
        mounted() {
            this.initMovieType();
            this.initMovieList(this.typeId, this.orderById);
        },
        created() {

        },

        destroyed() {

        }
    }
</script>
<style>
    [v-cloak] {
        display: none;
    }

    .app-spots #body #all-spots>div>div>div {
        border: none;
    }

    .h-tabs-default {
        border-bottom: none;
    }

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
        font-size: 14px;
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
        text-align: center;
    }

    .movie-sale a {
        display: block;
        border: 1px solid #ccc;
        padding-left: 0;
    }

    .movie-sale:hover {
        background: #f00;
        color: #fff;
        border: none;
    }
</style>