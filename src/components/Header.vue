<template>
    <header class="header fixed-top  pb-md-2 bg-white">
      <div class="container">
          <!--导航栏start-->
          <nav id="header-nav" class="row align-items-center pt-md-2">
              <!--导航按钮-->
              <div class="col d-md-none">
                  <ul class="nav-icon m-0" data-trigger="navIcon" data-status=0>
                      <li class="nav-icon-top"></li>
                      <li class="nav-icon-bottom"></li>
                  </ul>
              </div>
              <!--logo-->
              <a href="/">
                  <img id="brand" :src="this.$store.state.url+'systemImg/'+'lemon_logo_black.png'">
              </a>
              <!--个人中心-->
              <div v-if="isLogin" class="col col-md-auto order-md-4 position-relative iconfont  text-right p-md-0 personal" :class="avatar?'':'icon-login1_1'" data-trigger="toggle">
                 <img v-if='avatar' :src="avatar" alt="" style="border-radius: 100%;">
                  <div class="position-absolute flex-column pr-3 p-md-0 d-none" data-target="toggleItem">
                      <div class="align-self-end mr-2"></div>
                      <ul class="pl-3 pr-3 speed">
                           <li class="text-left border-bottom" v-cloak>{{this.$store.state.userMsg?this.$store.state.userMsg.user:''}}</li>
                          <li class="text-left border-bottom"><router-link to="/personal" class="iconfont icon-touxiang">&nbsp;个人中心</router-link> </li>
                          <!-- <li class="text-left border-bottom"><router-link to="/add_travel" class="iconfont icon-fabiaoyouji">&nbsp;发表游记</router-link></li> -->
                          <li class="text-left border-bottom"><a  class="iconfont icon-tuichu" @click="signout">&nbsp;退出</a></li>
                      </ul>
                  </div>
              </div>
              <router-link v-else class="col iconfont icon-login1_0 text-right col-md-auto order-md-4 p-md-0" to="/login_register"></router-link>
              <div class="col-12 d-md-none"></div>
              <!--导航/搜索-->
              <div class="col-12 col-md order-md-2 d-md-flex border-dark">
                  <!-- 下拉选项 -->
                  <div id="collapse-navbar" class="p-0 collapse-navbar collapse-navbar-0
                    d-md-inline-flex justify-content-md-around align-items-md-center" data-target="collapse_navbar">
                      <div class="d-md-none">
                          <form>
                            
                              <Search style='width:100%' @search="searchAll" v-model="searchText1"></Search>
                          </form>
                      </div>
                      <ul id="nav-items" class="d-md-inline-flex justify-content-md-around m-0">
                          <li><router-link class="iconfont icon-shouyefill" to="/index" data-target="item"></router-link></li>
                          <li><router-link to="/movies" data-target="item">电影</router-link></li>
                          <li><router-link to="/order" data-target="item">排行榜</router-link></li>
                          <!-- <li><router-link to="/tickets" data-target="item">购票</router-link></li> -->
                          <li><router-link to="/comments"  data-target="item">影评</router-link></li>
                          <li><router-link class="iconfont icon-some" to="/" data-target="item"></router-link></li>
                      </ul>
                  </div>
              </div>
            <!--搜索icon-->
              <div class="d-none col-auto d-md-inline order-md-3   h-input-prefix-icon">
                    <Search @search="searchAll" v-model="searchText1"></Search>
                  </div>
          </nav>
      
      </div>   
    </header>
</template>

<script>
    import $ from 'jquery'
    import {getHeaderEffect} from '../../src/assets/js/header.js'
    export default {
        data(){
            return {
               searchText1: null,
               isLogin:sessionStorage.getItem('token')?sessionStorage.getItem('token'):'',
               avatar:''
            }
        },
        props:[],//接收来自父子件的数据
        mounted() {
            getHeaderEffect();
            this.initUserInfo();
        },
   
        methods:{
            signout(){
                this.$store.commit("signout");
                this.$router.push('/login_register');
            },
            // 全局搜索
            searchAll(data) { 
                this.$router.push('/search?content='+data);
             },

            // 获取头像
            initUserInfo(){
                let _this = this;
                var url = _this.$store.state.url + 'managemodule/user/selectMyInfo';
                this.axios({
                    method: 'GET',
                    url,
                    headers: { 'TLUSER': sessionStorage.getItem('token') }
                }).then(res => {
                    if (res.status == 200) {
                        if (res.data.state) {
                         this.avatar=this.$store.state.url+res.data.row.imgUrl;
                    }
                    }
                })
                .catch(err => {
                        console.log(err);
                 })
            }
        }
    }
</script>
<style>
  @import '../assets/css/header.css';
  [v-cloak] {
display: none;
}
</style>
    