<template>
    <section class='' v-cloak>
    <div class="container-fulid banner" style="margin-bottom: 100px">
        <!-- 头部 -->
            <div class="wrapper container position-relative">
              <div class="celeInfo" >
                <div class="row mt-5">
                    <div class="col-3">
                         <img class="avatar w-100" 
                         src="https://p1.meituan.net/movie/d94e5c3054778f6f48bff3a813b0b7cd5300998.jpg@464w_644h_1e_1c" alt=""></div>
                    <div class="col-5">
                        <div class="movie-brief-container mt-4">
                            <h3 class="name">波西米亚狂想曲</h3>
                                <ul>
                                    <li class="pt-2">剧情,音乐,传记</li>
                                    <li class="ellipsis pt-1">主演</li>
                                    <li class="pt-1">131分钟</li>
                                    <li class="pt-1">2019-03-22大陆上映</li>
                                </ul>
                             </div>
                             <div class="mt-3">
                                 <p class="float-left">
                                     <span class="btn comment">评论</span>
                                     <span class="btn wanted">想看</span>
                                 </p>
                                <span class="btn buy" target="_blank">特惠购票</span>
                            </div>
                    </div> 
                    <div class="col-4 d-flex justify-content-center movie-praise flex-column" >
                        <p>用户评分：<p class="praise pt-1">9.5</p></p>
                        <p class="mt-3">累计观看：<p class="view-count" style="font-size: 30px">1200<span style="font-size: 12px">人次</span></p></p>
                    </div>
                </div>
              </div>
            </div>
        </div>

        <div class="container intro mb-4 ">
                <p class="tab-title">介绍</p>

        </div>
     </section>
</template>

<script>
import Toast from '@/components/toast.vue';
export default {
    data(){
        return {
            movieDetail:[],
        
            loginAlert:false,
            loginAlertMsg : "先请登录！",
            loginAlertBgcolor : "bg-dark position-fixed",
            tid:this.$route.query.tid,
            zanTotal:0,
            details:{
                title:"",
                html:"",
                time:"",
                author:""
            },
            loadComments:false,
            commentsTotal:0,
            myComment:"",
            commentsList:[],
            alertMsg:"",
            toastClass:"",
            toastMsg:""
        }
    },
    components:{
        Toast
    },
    methods: {
        initMovieInfoById(){
            var id = this.$route.params.id;
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'managemodule/movie/selectOneMovie?id=' + id)
          .then(res => {
            if (res.status == 200) {
              this.movieDetail = res.data.row;
              console.log(res.data.row)
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
          })
        },
        // getComments(){
        //     this.axios.get(this.$store.state.url+"/travels/get_comments",{params:{tid:this.tid}}).then((res)=>{
        //         // console.log(res.data);
        //     })
        // },
        // submitComment(){
        //     if(!this.$store.state.userMsg){
        //         this.toastMsg = "请先登录！";
        //         this.toastClass = "bg-dark position-absolute";
        //         setTimeout(()=>{
        //             this.toastMsg = "";
        //             this.toastClass = "";
        //         },1000)
        //         return;
        //     }
        //     if(!this.myComment.trim()){
        //         this.alertMsg = "您没有输入任何评论！";
        //         this.toastMsg = "发表失败！";
        //         this.toastClass = "bg-danger position-absolute";
        //         setTimeout(()=>{
        //             this.toastMsg = "";
        //             this.toastClass = "";
        //         },1000)
        //         return;
        //     }
        //     if(this.myComment.length>200){
        //         this.alertMsg = "您写的评论长度超过200字，请从新输入！";
        //         this.toastClass = "bg-danger position-absolute";
        //         this.toastMsg = "发表失败！";
        //         setTimeout(()=>{
        //             this.toastMsg = "";
        //             this.toastClass = "";
        //         },1000)
        //         return;
        //     }
        //     this.axios.post(this.$store.state.url+"/travels/add_comment",{
        //         txt:this.myComment,
        //         uid:this.$store.state.userMsg ? this.$store.state.userMsg.uid : 0,
        //         tid:this.tid
        //         }).then((res)=>{
        //         if(res.data.code===1){
        //             this.toastClass = "bg-success position-absolute";
        //             this.toastMsg = "发表成功！";
        //             setTimeout(()=>{
        //                 this.toastMsg = "";
        //                 this.toastClass = "";
        //             },1000);
        //             this.commentsList.unshift(res.data.data);
        //             this.commentsTotal++;
        //             this.bus.$emit("postCommentsTotal",this.commentsTotal);
        //         }
        //     })
        // },
        // resetAlertMsg(){
        //     this.alertMsg = "";
        // }
    },
    // created() {
    //     this.loadContent();  
         
    // },
    mounted() {
        this.initMovieInfoById();


    //     //显示或者隐藏评论区
    //     this.bus.$on("showComments",(style)=>{
    //         this.loadComments = !this.loadComments;
    //         if(style==1){     
    //             window.scrollTo(0,$("#travel-details")[0].offsetHeight);
    //         }    
    //     })   
    //     this.bus.$on("handleShowToast",()=>{          
    //         // console.log(123);
    //         this.loginAlert = true;
    //         setTimeout(()=>{
    //             this.loginAlert = false;
    //         },1000)
    //     })
    // },
    // destroyed() {
    //      this.bus.$emit("resetToTap");
    //      window.scrollTo(0,0);
    //      this.loadComments = false;
    }
}
</script>
<style>
   @import '../assets/css/movie_details.css';
   
</style>