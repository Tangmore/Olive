<template>
    <section class="container info pt-4 mt-5 mb-5">
        <div class="row">
            <div class="col-sm-3 border-right catalog">
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
            <div class="col-sm-9" v-show='staticSty.ind==0'>
                <div class="profile ">

                    <p>
                        <span class="title pr-4">我的信息</span>
                        <!-- <span>资料完善度</span>
                        <b>{{comProgress}}%</b> -->
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
                                    <input type="text " class="form-control" disabled id="balance" style='text-indent:6px' v-model='info.infoList.balance' @blur="ackUname">
                                    <!-- <p class="tips" v-show='unameAck.flag'>{{unameAck.tip}}</p> -->
                                </div>
                            </div>

                            <div class="row m-2 mt-3">
                                <label for='phone' class="col-2 control-label p-0">手机号:</label>
                                <div class="col-10">
                                    <input type="text" class="form-control" id="phone" v-model='info.infoList.phone' @blur='ackPhone'>
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


            <div class="col-sm-9" v-show='staticSty.ind==1'>
                <div class="profile ">
                    <form class="form-group">
                        我的评论列表
                    </form>
                </div>
            </div>


            <div class="col-sm-9" v-show='staticSty.ind==2'>
                <div class="profile ">
                    <form class="form-group">
                        我的订单列表
                    </form>
                </div>
            </div>

            <div class="col-sm-9" v-show='staticSty.ind==3'>
                <div class="profile ">
                    <form class="form-group">
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
                        { icon: 'icon-zhanghaoanquan', title: '账号安全' },
                    ],
                    ifShow: false,
                    ind: 0,
                },
                info: {
                    infoList: { name: '', phone: '', imgUrl: '' ,id:''},
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
                pwdSubAck: {
                    tip: '', flag: false
                },
                deleteUser: false,
                ackAllFlag: false,  //当为true时才可提交信息
                newPwd: '',
                againPwd: '',
                pwdAckAllFlag: false,  ////当为true时才可提交密码
                myTravelList: [],
                imageUrl: '',
                uploadAction: this.$store.state.url + 'filemodule/file/uploadFile',
            }
        },
        created() {
            this.getInfo();
        },
        mounted() {
            this.getInfo();
        },
        computed: {
            comProgress: function () {
                var i = 0, j = 0;
                for (var item in this.info.infoList) {
                    i++;
                    if (this.info.infoList[item] !== '') {
                        j++;
                    }
                }
                return Math.floor(((j - 2) / i) * 100);
            }
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
            myTravel() {
                this.staticSty.ifShow = this.staticSty.ifShow ? false : true;
                this.staticSty.ind = 0;
                this.axios.get(this.$store.state.url + "/personal/getOwntravel",
                    { params: { uid: this.$store.state.userMsg.uid } }).then(res => {
                        this.myTravelList = res.data;
                        // console.log(res)
                    })
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

            //  ackEvent(reg,cur,obj,text){
            //           if(!cur){
            //              obj.tip=text[0];         
            //              obj.flag=true;
            //              this.ackAllFlag=false; 
            //            }else if(reg.test(cur)){
            //              obj.tip=text[1];
            //              obj.flag=true;
            //              this.ackAllFlag=true; 
            //           }else{
            //              obj.tip=text[2];
            //              obj.flag=true;
            //              this.ackAllFlag=true;
            //           }
            //      },
            //      ackUname(){
            //         var text=['昵称不能为空！','昵称可用！','昵称为4到16位（字母，数字，下划线，减号）！'];
            //         this.ackEvent(/^[a-zA-Z0-9_-]{4,16}$/,this.info.infoList.uname,
            //            this.unameAck,text);  
            //      }, this.unameAck.tip,this.unameAck.flag,text[0],text[1],text[2]);  
            //      },
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
                            // if (res.data.code == 1) {
                            //     this.unameAck.tip = res.data.msg;
                            //     this.unameAck.flag = true;
                            //     this.ackAllFlag = false;
                            // }
                            // if (res.data.code == -1) {
                            //     this.unameAck.tip = '';
                            //     this.unameAck.flag = false;
                            //     this.ackAllFlag = true;
                            // }
                            console.log(res);
                            if (!res.data.state) {
                                this.unameAck.tip = res.data.msg+'!';
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
                            id:this.info.infoList.id
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
                console.log(this.newPwd)
                if (this.pwdAckAllFlag) {
                    this.axios({
                        method: 'post',
                        url: this.$store.state.url + "/personal/modifyPwd",
                        data: {
                            uid: this.$store.state.userMsg.uid,
                            upwd: this.newPwd,
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.pwdSubAck.flag = true;
                            this.pwdSubAck.tip = res.data.msg;
                            this.$router.push('/index');
                        } else {
                            this.pwdSubAck.flag = true;
                            this.pwdSubAck.tip = res.data.msg;
                        }

                    })
                }
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
</style>