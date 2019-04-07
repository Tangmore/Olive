<template>
    <section class="strategy mt-5 p-5">
        <div class="info text-center" style="font-size: 12px;color: #999">
            <p>{{date}}
                <span style="color:#ffb400;margin-left: 10px">已更新</span>
            </p>
            <p>榜单规则：将热映的影片，按照评分从高到低排列取前10名，每天更新。相关数据来源于“Olive”。</p>
        </div>
        <div id="top10" class="pt-4 pl-2 pr-2 container">
            <div class="row ml-0 mr-0 mb-3  position-relative" @click="jumpToDetail(item.id,$event)"
             v-for='(item,index) in top10MovieArr'>
                <div class="col-1 d-flex flex-column justify-content-center moviename" >{{index+1}}</div>
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
    </section>
</template>
<script>
    export default {
        data() {
            return {
                date:new Date().toLocaleDateString().split('/').join('-'),
                rate:'',
                top10MovieArr:[]
            }
        },
        methods: {
            //获取排行数据
            initNextTen() {
                this.axios.get(this.$store.state.url + 'managemodule/movie/selectTop5ImgUrl').then(res => {
                    if (res.status == 200) {
                        console.log(res)
                        for(var item of res.data.rows){
                            item.imgUrl=this.$store.state.url+item.imgUrl;
                        }
                        this.top10MovieArr=res.data.rows;
                    }
                })
            },

            jumpToDetail(id) {
                this.$router.push("/movie_details?id=" + id);   //跳转至movie_details.vue
            }
        },
        mounted(){
            this.initNextTen();

        }
    }
</script>
<style scoped>
    .moviename{
        color:#f00;
        font-size: 24px;
    }
   .score{
    color:#ffb400;
    font-size: 36px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   }
</style>