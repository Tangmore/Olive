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
        <div class="container choosePart mb-5">
            <Steps :datas="chooseData" :step="step"></Steps>
        </div>
        <!-- 场次列表 -->
        <div class="container intro mb-4 " v-show="step==0">
            <div class="row">
                <el-table :data='currentPageData' style="width:100%" stripe>
                    <el-table-column label='时间' prop='startTime'>
                    </el-table-column>
                    <el-table-column label='影院' prop='fkCinemaName'>
                    </el-table-column>
                    <el-table-column label='影厅' prop='fkHallName'>
                    </el-table-column>
                    <el-table-column label='价格' prop='price'>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width='136px'>
                        <template slot-scope="{row,$index}">
                            <el-button type="danger" size="small" plain @click="toChooseSeat(row,$index)">选座</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="text-right mt-4">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[6, 8, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 选取座位 -->
        <div class="container SeatList mb-4" v-show='step==1'>
            <div class="row" style="margin-bottom: 20px">
                <div class="col-2 text-center">
                        <p>
                            <el-button   size="mini" >  <i class="iconfont icon-shipin"></i></el-button>
                        </p>
                    <p>可选座位</p>
                </div>
                <div class="col-2 text-center">
                    <p>
                         <el-button  disabled  size="mini" >  <i class="iconfont icon-shipin"></i></el-button>
                    </p>
                    <p>已售座位</p>
                </div>
            </div>
            <div class="row">
                <div class="col-8">
                    <div class="row">
                        <div class="col-2 " v-for='(item,index) in seatStatusArr'>
                            <div class="position-relative">
                                    <el-button  size="mini" class="mb-2" style="font-size: 18px;" 
                              :disabled="item.purchased==1"
                                 @click="toBuySeat(item.id,item.lineNum,item.colNum,$event)"
                                    ref='seatItem'>
                                    <i class="iconfont icon-shipin"></i>
                            </el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4" style="border-left: 1px solid #f00">
                    <div class="choose-movie-Info p-5">
                        <p>影院：{{chooseAddressObj.fkCinemaName}}</p>
                        <p>影厅：{{chooseAddressObj.fkHallName}}</p>
                        <p>地址：{{chooseAddressObj.fkCinemaAddress}}</p>
                        <p>场次：{{chooseAddressObj.startTime}}</p>
                        <p>票价：{{chooseAddressObj.price}}</p>
                        <p>座位：
                            <span v-for='item in chooseSeatStringArr'>{{item}}</span>
                        </p>
                        <p>原价：{{originalPrice}}￥</p>
                        <p v-show='discount'>折扣：{{discount}}</p>
                        <p>现价：{{currentPrice}}￥</p>
                        <el-button type="danger" size="small" plain @click='toBuyTickets'>购买</el-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 付款成功 -->
        <div class="container buySuccessResult" v-show='step==2'>
            <!-- <img src="" alt=""> -->
            <main class="row mb-5">
                <p class="col-4"></p>
                <div class="result-box col-4">
                    <p style="color: #f00;font-size: 20px;font-weight: bold;" class="pb-2">下单成功！！！</p>
                    <p class="pb-2">时间：{{buySuccessResult.createTime}}</p>
                    <p class="pb-2">订单编号：{{buySuccessResult.orderNum}}</p>
                    <p> 总价：{{buySuccessResult.presentPrice}}￥</p>
                </div>
                <p class="col-4"></p>
            </main>

        </div>
    </section>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                movieDetail: [],
                chooseData: [
                    { key: '1', desc: '选择影片场次' },
                    { key: '2', desc: '选择座位' },
                    { key: '3', desc: '付款' }
                ],
                step: 0,
                currentPageData: [],
                // 每页显示条数
                pageSize: 8,
                // 当前页
                currentPage: 1,
                total: 0,
                // 座位arr
                seatStatusArr: [],
                chooseAddressObj: {},
                chooseSeatArr: [],
                chooseSeatStringArr: [],
                discount: '',
                totalPrice: 0,
                buySuccessResult: {}
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
            //查询场次安排
            initSceneList(pageSize, currentPage) {
                var url = this.$store.state.url + 'managemodule/scene/selectPageScene?map[fkMovieId]=' + this.thisMovieId;
                this.axios({
                    method: "GET",
                    url,
                    params: { pageSize: pageSize, currentPage: currentPage }
                })
                    .then(res => {
                        if (res.status == 200) {
                            console.log(res);
                            for (var item of res.data.rows) {
                                item.price = item.price + '￥';
                            }
                            this.total = res.data.total;
                            this.currentPageData = res.data.rows;
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
            // 选座
            toChooseSeat(c, index) {
                this.step = 1;
                this.chooseAddressObj = c;
                this.axios.get(this.$store.state.url + 'managemodule/scene/selectDetailScene?id=' + c.id)
                    .then(res => {
                        if (res.status == 200) {
                            // console.log(res)
                            this.seatStatusArr = res.data.row.positions;
                            this.discount = res.data.row.discount;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            getThisNum(e) {
                e.target.nextElementSibling.style.display = 'block';
            },
            dropThisNum(e) {
                e.target.nextElementSibling.style.display = 'none';
            },
            //点击选座座位
            toBuySeat(id, line, col, e) {
                // for(var i=0;i<this.chooseSeatArr.length;i++){
                //     if()
                // }
                if(this.chooseSeatArr.indexOf(id)==-1){
                     this.chooseSeatArr.push(id);
                let seat = line + '排' + col + '座';
                this.chooseSeatStringArr.push(seat); 
                 e.target.style.color = 'red';
                }else{
                    e.target.style.color = 'black';
                    let ind=this.chooseSeatArr.indexOf(id);
                    this.chooseSeatArr.splice(ind,1);
                    this.chooseSeatStringArr.splice(ind,1);
                }
               
              
            },
            toBuyTickets() {
                let _this = this;
                // _this.step=2;
                var url = _this.$store.state.url + 'managemodule/user/selectMyInfo';
                this.axios({
                    method: 'GET',
                    url,
                    headers: { 'TLUSER': sessionStorage.getItem('token') }
                }).then(res => {
                    if (res.status == 200) {
                        if (res.data.state) {
                            this.submitOrder();
                        } else {
                            this.$router.push('/login_register');
                        }
                    }
                })
                    .catch(err => {
                        console.log(err);
                    })
            },
            // 提交订单
            submitOrder() {
                this.$confirm('确定下单吗？', '提示', { type: 'warning' })
                    .then(() => {
                        var _this = this;
                        if (this.chooseSeatArr.length > 0) {
                            var url = _this.$store.state.url + 'managemodule/orders/addOrder';
                            this.axios({
                                method: 'POST',
                                url,
                                data: { fkSceneId: this.chooseAddressObj.id, pids: this.chooseSeatArr },
                                headers: { 'TLUSER': sessionStorage.getItem('token') }
                            }).then(res => {
                                _this.step = 2;
                                this.buySuccessResult = res.data.row;
                            })
                                .catch(err => {
                                    console.log(err);
                                })
                        } else {
                            _this.$message.error('位置信息不能为空！！！')
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '订单已取消！'
                        })
                    })
            }
        },
        computed: {
            originalPrice() {
                if (this.chooseSeatArr.length > 0) {
                    let price = parseFloat(this.chooseAddressObj.price.split('￥')[0]);
                    return this.chooseSeatArr.length * price;

                } else {
                    return 0;
                }
            },
            currentPrice() {
                if (this.chooseSeatArr.length > 0) {
                    let price = parseFloat(this.chooseAddressObj.price.split('￥')[0]);
                    return this.chooseSeatArr.length * price * this.discount;
                } else {
                    return 0;
                }
            }
        },
        mounted() {
            // 初始电影信息
            this.initMovieInfoById();
            //获取场次列表
            this.initSceneList(this.pageSize, this.currentPage);
        }

    }
</script>
<style>
    @import '../assets/css/movie_details.css';
    .seat-item {
        display: none;
        right: 0;
        top: 0;
        border: 1px solid #999;
        z-index: 99;
    }

    .hasBuy {
        color: #f00;
    }

    .result-box {}

    .choose-movie-Info p {
        margin-bottom: 4px;

    }
</style>