<template>
    <section class="container info pt-4 mt-5 mb-5">
        <div class="row">
            <div class="col-sm-3 catalog">
                <div class="w-100">
                    <h4>个人中心</h4>
                    <ul class="pointer_nav_right mt-3 list-unstyled text-left">
                        <li class="mt-2  p-2 col-sm-12 col-5 mr-0" :class="staticSty.ind==index?'active':''" v-for='(item,index) in staticSty.titleList'
                            @click='tabChange(index)'>
                            <i class="iconfont pr-2" :class='item.icon'></i>
                            <b>{{item.title}}</b>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 个人信息 -->
            <div class="col-sm-9" v-show='staticSty.ind==0'>
                <div class="profile ">
                    <p>
                        <span class="title pr-4">我的信息</span>
                    </p>
                    <form class="form-group">
                        <div class="unameDiv">
                            <div class="row m-2 mt-2">
                                <label for='phone' class="col-2 control-label p-0 col-2">头像:</label>
                                <div class="col-6 col-10">
                                    <el-upload class="avatar-uploader" :action="uploadAction" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeImgUpload">
                                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="row m-2 mt-3">
                                <label for='uname' class="col-2 control-label p-0">昵称：</label>
                                <div class="col-10">
                                    <input type="text " class="form-control" id="uname" style='text-indent:6px' v-model='info.infoList.name' @blur="ackUname">
                                    <p class="tips" v-show='unameAck.flag'>{{unameAck.tip}}</p>
                                </div>
                            </div>
                            <div class="row m-2 mt-3">
                                <label for='balance' class="col-2 control-label p-0">余额：</label>
                                <div class="col-10">
                                    <!-- <input type="text " class="form-control" disabled id="balance" style='text-indent:6px' v-model='info.infoList.balance' @blur="ackUname"> -->
                                    <!-- <p class="tips" v-show='unameAck.flag'>{{unameAck.tip}}</p> -->
                                    <span>{{info.infoList.balance}}￥</span>
                                </div>
                            </div>

                            <div class="row m-2 mt-3">
                                <label for='phone' class="col-2 control-label p-0">手机号:</label>
                                <div class="col-10">
                                    <input type="text " class="form-control" id="phone" style='text-indent:6px' v-model='info.infoList.phone' @blur="ackPhone">
                                    <!-- <input type="text" class="form-control" id="phone" v-model='info.infoList.phone' @blur='ackPhone'> -->
                                    <p class="tips" v-show='phoneAck.flag'>{{phoneAck.tip}}</p>
                                </div>
                            </div>
                            <div class="row mt-3 mb-5 pb-5">
                                <div class="col-12 text-center">
                                    <p class=" btn  btn-danger" @click='submitInfo' :disabled="(unameAck.flag||phoneAck.flag||profileAck.flag)">保存</p>
                                    <p class="tips" v-show='subAck.flag'>{{subAck.tip}}</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- 评论列表 -->
            <div class="col-sm-9" v-show='staticSty.ind==1'>
                <div class="profile ">
                    <div v-if='commentsTotal>0'>
                        <div class="popComment mt-4">
                            <div id="comments" class="pt-4 pl-2 pr-2 container">
                                <div class="row ml-0 mr-0 mb-5 pb-3 border-bottom comments-item position-relative" @click="$router.push('/movie_details?id='+item.fkMovieId)"
                                    v-for='(item,index) in currentPageData'>
                                    <div class="col-2">
                                        <img class="img-fluid p-0" style="width: 60%" :src="item.movieImgUrl">
                                    </div>
                                    <div class="col-10">
                                        <div class="one-row ">
                                            <div class="row text-muted m-0">
                                                <div class="col text-left p-0">
                                                    <p class="">
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
                    <div v-if="commentsTotal==0">
                        <p class="p-2 text-muted text-center floor">
                            这人很懒，还没有人评论哦！！
                        </p>
                    </div>
                    <!-- 评论分页 -->
                    <div class="text-right" :class="commentsTotal==0?'d-none':''">
                        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                            :page-sizes="[6, 8, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>

            <!-- 订单列表 -->
            <div class="col-sm-9" v-show='staticSty.ind==2'>
                <div class="profile row  mb-2 border p-1" v-for='item in myOrderArr'>
                    <div class="col-2">
                        <img :src="item.movieImgUrl" alt="" class="w-100">
                    </div>
                    <div class="col-8 d-flex justify-content-center flex-column">
                        <p>{{item.movieName}}</p>
                        <p>时间：{{item.startTime}}</p>
                        <p v-if='item.isCancel==1' style="color: #f00;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">订单已取消！</p>

                    </div>
                    <div class="col-2 d-flex justify-content-center flex-column" style="color: #f00">
                        {{item.presentPrice}}￥
                    </div>
                    <div class="col-8"></div>
                    <div class="col-4">
                        <!-- <span class="btn plain border" style='font-size: 12px;border-radius: 4px'></span> -->
                        <button class="h-btn" @click="checkOrderDetail(item.id)">详情</button>
                        <button class="h-btn" @click="cancelOrder(item.id,item.startTime)" :disabled='item.isCancel==1'>取消</button>
                        <button class="h-btn evaluation" @click=" scoreOpened=true" :disabled='item.isCancel==1'>评价</button>
                        <!-- 订单详情 -->
                        <Modal v-model="detailOpened" class="order-item-detail">
                            <div slot="header">详情</div>
                            <p>电影：{{myOrderItemDeatil.movieName}}</p>
                            <p>时间：{{myOrderItemDeatil.startTime}}</p>
                            <p>地址：{{myOrderItemDeatil.cinemaAddress}}{{myOrderItemDeatil.cinemaName}}{{myOrderItemDeatil.hallName}}</p>
                            <p>位置：
                                <span class="pr-2" v-for='i of orderSeatPosition'>{{i}}</span>
                            </p>
                            <div slot="footer">
                                <Button @click="detailOpened=false">取消</Button>
                            </div>
                        </Modal>
                        <!-- 评分 -->
                        <Modal v-model="scoreOpened">
                            <div slot="header">评分</div>
                            <p>
                                <Rate v-model="movieScore"></Rate>
                            </p>
                            <div slot="footer">
                                <Button color="primary" @click="scoreConfirm(item.id)">确认</Button>
                                <Button @click="scoreOpened=false">取消</Button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>

            <!-- 消费记录 -->
            <div class="col-sm-9" v-show='staticSty.ind==3'>
                <div class="profile row  mb-2 border p-1" v-for='item in expenciceRecode'>
                    <div class="col-8 d-flex justify-content-center flex-column">
                        <p>时间：{{item.createTime}}</p>

                        <p>订单号：{{item.orderNum}}</p>
                    </div>
                    <div class="col-2 d-flex justify-content-center flex-column" style="color: #f00">
                        <!-- {{item.balance}}￥ -->
                        <span style="color: #f00;font-family: 'Gill Sans',
                                'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" v-if='item.state==1'>消费：{{item.balance}}￥</span>
                        <span style="color: #f00;font-family: 'Gill Sans',
                                'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" v-if='item.state==2'>退款：{{item.balance}}￥</span>
                    </div>
                </div>
            </div>

            <!-- 账号安全 -->
            <div class="col-sm-9" v-show='staticSty.ind==4'>
                <div class="profile ">
                    <form class="form-group">
                        <div class="row m-2 mt-2">
                            <label for='password' class="col-2 control-label p-0 col-2">原密码：</label>
                            <div class="col-6 col-10">
                                <input type="password" class="form-control" id="password" v-model='originalPwd'>
                                <!-- <p class="tips" v-show='upwdAck.flag'>{{upwdAck.tip}}</p> -->
                            </div>
                        </div>
                        <div class="row m-2 mt-2">
                            <label for='password' class="col-2 control-label p-0 col-2">新密码：</label>
                            <div class="col-6 col-10">
                                <input type="password" class="form-control" id="password" @blur='ackUpwd' v-model='newPwd'>
                                <p class="tips" v-show='upwdAck.flag'>{{upwdAck.tip}}</p>
                            </div>
                        </div>

                        <div class="row m-2 mt-2">
                            <label for='askPass' class="col-2 control-label p-0 col-2">确认密码：</label>
                            <div class="col-6 col-10">
                                <input type="password" class="form-control" id="askPass" v-model='againPwd' @blur='ackUpwdAgain'>
                                <p class="tips" v-show='upwdAgainAck.flag'>{{upwdAgainAck.tip}}</p>
                            </div>
                        </div>

                        <div class="row m-2 mt-2 deleteMe" @mouseover='deleteUser=true' @mouseleave='deleteUser=false'>
                            <small class='text-muted '>注销账户？</small>
                            <small class='text-muted' v-show='deleteUser'>确定</small>
                        </div>

                        <div class="row mt-3 mb-5 pb-5">
                            <div class="col-12 text-center">
                                <button class=" btn btn-danger" :disabled="(upwdAck.flag||upwdAgainAck.flag)" @click="modifyPwd">确认修改</button>
                                <p class="tips" v-show='pwdSubAck.flag'>{{pwdSubAck.tip}}</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                staticSty: {
                    titleList: [
                        { icon: 'icon-wodexinxi', title: '我的信息' },
                        { icon: 'icon-youji1', title: '我的评论' },
                        { icon: 'icon-wodexinxi', title: '我的订单' },
                        { icon: 'icon-youji1', title: '消费记录' },
                        { icon: 'icon-zhanghaoanquan', title: '账号安全' },
                    ],
                    ifShow: false,
                    ind: 0,
                },
                info: {
                    infoList: { name: '', phone: '', imgUrl: '', id: '' },
                    originInfoList: { name: '', phone: '', imgUrl: '' },
                    count: 0
                },
                unameAck: { tip: '', flag: false },
                phoneAck: { tip: '', flag: false, },
                profileAck: { tip: '', flag: false },
                //提交按钮
                subAck: { tip: '', flag: false },
                upwdAck: { tip: '', flag: false },
                upwdAgainAck: { tip: '', flag: false },
                originalPwd: '',

                pwdSubAck: {
                    tip: '', flag: false
                },
                deleteUser: false,
                ackAllFlag: false,  //当为true时才可提交信息
                newPwd: '',
                againPwd: '',
                pwdAckAllFlag: false,  ////当为true时才可提交密码
                imageUrl: '',
                uploadAction: this.$store.state.url + 'filemodule/file/uploadFile',

                // 我的评论
                currentPageData: [],
                // 每页显示条数
                pageSize: 6,
                // 当前页
                currentPage: 1,
                // 总条数
                total: 0,
                commentsTotal: 0,
                myOrderArr: [],
                // 订单详情
                myOrderItemDeatil: {},
                orderSeatPosition: [],
                detailOpened: false,
                scoreOpened: false,
                movieScore: 0,
                // 消费记录
                expenciceRecode: []

            }
        },
        created() {
            // this.getInfo();
        },
        mounted() {
            this.getInfo();
            this.getMyComments(this.pageSize, this.currentPage);
            this.initMyOrders();
            this.getExpenciceRecode();
        },
        methods: {
            // 验证上传图片的格式
            beforeImgUpload(file) {
                // console.log(file)
                var suffix = file.name.substring(file.name.lastIndexOf('.'));
                var isCorr = /\.(jpg|jpeg|png|gif)/.test(suffix);
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isCorr) {
                    this.$message.error('上传图片格式只能是gif、jpg、jpeg、png!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isCorr && isLt2M;
            },
            // 移除图片
            beforeRemove(file) {
                this.$confirm(`确定移除${file.name}`, '提示', { type: 'warning' })
                    .then(() => {
                        this.$message.success('图片删除成功，可重新选择！');
                    })
                    .catch(() => {
                        this.$message.info('已经取消删除');
                    })
            },
            //上传成功后 客户端得到响应消息
            handleSuccess(res, file) {
                // console.log(res)
                this.$message.success(res.msg);
                this.info.infoList.imgUrl = res.row;
                this.imageUrl = this.$store.state.url + res.row;
            },

            tabChange(index) {
                this.staticSty.ind = index;
                this.staticSty.ifShow = false;
                this.unameAck.flag = false;
                this.phoneAck.flag = false;
                this.profileAck.flag = false;
                this.subAck.flag = false;
                this.upwdAck.flag = false;
                this.upwdAgainAck.flag = false;
                this.ackAllFlag = false;
                this.pwdAckAllFlag = false;

            },
            //基本信息
            getInfo() {
                var url = this.$store.state.url + "managemodule/user/selectMyInfo";
                this.axios({
                    method: 'GET',
                    url,
                    headers: { 'TLUSER': sessionStorage.getItem('token') }
                }).then(res => {
                    console.log(res)
                    this.info.infoList = res.data.row;
                    console.log(this.info.infoList.id)
                    if (res.data.row.imgUrl) {
                        this.imageUrl = this.$store.state.url + res.data.row.imgUrl;
                    }
                    // //记录原始值看是否被改变    
                    this.info.originInfoList.name = res.data.row.name;
                    this.info.originInfoList.phone = res.data.row.phone;
                    this.info.originInfoList.imgUrl = res.data.row.imgUrl;
                    // this.info.infoList = res.data.row;
                }).catch(err => {
                    console.log(err);
                })
            },
            //我的评论
            getMyComments(pageSize, currentPage) {
                var url = this.$store.state.url + "managemodule/comment/selectPageByUserId";
                this.axios({
                    method: 'GET',
                    url,
                    params: { pageSize: pageSize, currentPage: currentPage },
                    headers: { 'TLUSER': sessionStorage.getItem('token') }
                })
                    .then(res => {
                        console.log(res);
                        if (res.status == 200) {
                            if (res.data.rows) {
                                this.total = res.data.total;
                                for (var item of res.data.rows) {
                                    item.movieImgUrl = this.$store.state.url + item.movieImgUrl;
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
            // 分页
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
            ackUname() {
                this.subAck.flag = false;
                var reg = /^[a-zA-Z0-9_-]{2,16}$/;
                if (!this.info.infoList.name) {
                    this.unameAck.tip = '昵称不能为空！';
                    this.unameAck.flag = true;
                    this.ackAllFlag = false;
                } else if (reg.test(this.info.infoList.name)) {
                    this.unameAck.flag = false;
                    this.ackAllFlag = true;
                } else {
                    this.unameAck.tip = '昵称为2到16位（字母，数字，下划线，减号）！';
                    this.unameAck.flag = true;
                    this.ackAllFlag = true;
                }

                if ((!this.unameAck.flag) && (!(this.info.infoList.name === this.info.originInfoList.name))) {
                    //查询昵称是否被占用
                    this.axios.get(this.$store.state.url + "managemodule/user/checkName",
                        { params: { name: this.info.infoList.name } }).then(res => {
                            if (!res.data.state) {
                                this.unameAck.tip = res.data.msg + '!';
                                this.unameAck.flag = true;
                                this.ackAllFlag = false;
                            } else {
                                this.unameAck.tip = '';
                                this.unameAck.flag = false;
                                this.ackAllFlag = true;
                            }
                        })
                }
            },
            ackPhone() {
                this.subAck.flag = false;
                var reg = /^1[3-8]\d{9}$/;
                if (!this.info.infoList.phone) {
                    this.phoneAck.tip = '手机号不能为空！';
                    this.phoneAck.flag = true;
                    this.ackAllFlag = false;
                } else if (reg.test(this.info.infoList.phone)) {
                    //    this.phoneAck.tip='手机号格式正确！';
                    this.phoneAck.flag = false;
                    this.ackAllFlag = true;
                } else {
                    this.phoneAck.tip = '请输入正确的手机号格式！';
                    this.phoneAck.flag = true;
                    this.ackAllFlag = true;
                }
                if (!this.phoneAck.flag && (!(this.info.infoList.phone === this.info.originInfoList.phone))) {
                    //查询手机是否被占用
                    this.axios.get(this.$store.state.url + "managemodule/user/checkPhone",
                        { params: { phone: this.info.infoList.phone } }).then(res => {
                            if (!res.data.state) {
                                this.phoneAck.tip = res.data.msg + '！';
                                this.phoneAck.flag = true;
                                this.ackAllFlag = false;
                            }
                        })
                }

            },
            submitInfo() {
                if (this.ackAllFlag) {
                    this.axios({
                        method: 'post',
                        url: this.$store.state.url + "managemodule/user/updateUser",
                        data: {
                            name: this.info.infoList.name,
                            phone: this.info.infoList.phone,
                            imgUrl: this.info.infoList.imgUrl,
                            id: this.info.infoList.id
                        }
                    }).then(res => {
                        console.log(res.data.state)
                        if (res.data.state) {
                            this.subAck.flag = true;
                            this.subAck.tip = res.data.msg;
                            if (this.info.infoList.phone == this.info.originInfoList.phone) {
                                // this.$router.push('/'); 
                                this.getInfo();
                            } else {
                                this.$store.commit("signout");
                                this.$router.push('/');
                            }

                        } else {
                            this.subAck.flag = true;
                            this.subAck.tip = res.data.msg;
                        }
                        console.log(res)
                    })
                }
            },
            //修改密码
            ackUpwd() {
                console.log(this.newPwd)
                var reg = /^\w{6,14}$/;
                if (reg.test(this.newPwd)) {
                    this.upwdAck.flag = false;
                    this.pwdAckAllFlag = true;
                } else {
                    this.upwdAck.tip = '密码为6~14位数字、字母或下划线！';
                    this.upwdAck.flag = true;
                    this.pwdAckAllFlag = false;
                }
            },
            ackUpwdAgain() {
                if (!(this.againPwd === this.newPwd)) {
                    this.upwdAgainAck.tip = '两次密码请保持一致!';
                    this.upwdAgainAck.flag = true;
                    this.pwdAckAllFlag = false;
                } else {
                    this.upwdAgainAck.flag = false;
                    this.pwdAckAllFlag = true;
                }
            },
            modifyPwd() {
                if (this.pwdAckAllFlag) {
                    this.axios({
                        method: 'POST',
                        url: this.$store.state.url + "managemodule/user/updatePassWordUser",
                        data: {
                            originalPassword: this.originalPwd,
                            currentPassword: this.newPwd
                        },
                        headers: { 'TLUSER': sessionStorage.getItem('token') }
                    }).then(res => {
                        if (res.data.state) {
                            this.pwdSubAck.flag = true;
                            this.pwdSubAck.tip = res.data.msg;
                            this.$router.push('/login_register');
                        } else {
                            this.pwdSubAck.flag = true;
                            this.pwdSubAck.tip = res.data.msg;
                        }

                    })
                }
            },
            // 订单列表
            initMyOrders() {
                this.axios({
                    method: 'GET',
                    url: this.$store.state.url + "managemodule/orders/userSelectPageOrder",
                    headers: { 'TLUSER': sessionStorage.getItem('token') }
                }).then(res => {
                    //    console.log(res)
                    for (var item of res.data.rows) {
                        item.movieImgUrl = this.$store.state.url + item.movieImgUrl;
                    }
                    this.myOrderArr = res.data.rows;

                }).catch(err => {
                    console.log(err);
                })
            },
            //   订单详情
            checkOrderDetail(id) {
                this.detailOpened = true;
                this.axios({
                    method: 'GET',
                    url: this.$store.state.url + "managemodule/orders/selectOrdersById?id=" + id,
                    headers: { 'TLUSER': sessionStorage.getItem('token') }
                }).then(res => {
                    // console.log(res)
                    for (var item of res.data.row.positions) {
                        this.orderSeatPosition.push(item.lineNum + '行' + item.colNum + '列');
                        console.log(this.orderSeatPosition)
                    }

                    this.myOrderItemDeatil = res.data.row;
                }).catch(err => {
                    console.log(err);
                })

            },
            //取消订单
            cancelOrder(id, startTime) {
                var thisTime = startTime.replace(/-/g, '/');
                thisTime = new Date(thisTime).getTime();
                var now=new Date().getTime();
                if((thisTime-now)<3600000){
                    this.$message.error('已过取消订单时间！');
                    return;
                }
                this.$confirm('删除操作不可撤销，您确定吗？', '提示', { type: 'warning' })
                    .then(() => {
                        this.axios({
                            method: 'POST',
                            url: this.$store.state.url + "managemodule/orders/cancelOrders",
                            data: { id },
                            headers: { 'TLUSER': sessionStorage.getItem('token') }
                        }).then(res => {
                            if (res.data.state) {
                                this.$message.success('订单取消成功');
                                this.initMyOrders();
                                this.getInfo();
                            }

                        }).catch(err => {
                            console.log(err);
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            },
            //评价
            scoreConfirm(id) {
                if (this.movieScore != 0) {
                    this.axios({
                        method: 'POST',
                        url: this.$store.state.url + "managemodule/orders/score",
                        data: { id: id, score: this.movieScore * 2 },
                        headers: { 'TLUSER': sessionStorage.getItem('token') }
                    }).then(res => {
                        // console.log(res)
                        if (res.data.state) {
                            this.scoreOpened = false;
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    this.$message.error('请添加评分！');
                    return;
                }
            },
            // 消费记录
            getExpenciceRecode() {
                this.axios({
                    method: 'GET',
                    url: this.$store.state.url + "managemodule/record/selectPageRecord",
                    headers: { 'TLUSER': sessionStorage.getItem('token') }
                }).then(res => {
                    console.log('消费记录')
                    console.log(res)
                    this.expenciceRecode = res.data.rows;
                }).catch(err => {
                    console.log(err);
                })
            }

        }
    }
</script>
<style>
    @import '../assets/css/personal.css';
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .evaluation {
        font-size: 12px;
        border-radius: 4px;
        border: 1px solid #FF9800;
        display: inline-block;
        color: #FF9800;
    }

    .order-item-detail p {
        padding-top: 6px;
    }
</style>