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
             
        <!-- <div class="container">
                <div class="row mt-5 pt-4">
                    <div class=" col-sm-12 col-md-9">
                        <div class="row ">
                            <div class="text-left pb-4 ">
                                <span class="pop_title">正在热映</span>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-3 col-sm-4 col-4  mb-2" v-for="item in  guide.imgList">
                                    <div class="">
                                        <img :src="item.img" alt="" class="w-100" @click="$router.push('/movie_details?pid='+item.pid)">
                                        <p>名称{{item.spot}}
                                            <span>评分{{item.tview}}</span>
                                        </p>
                                        <button>购票</button>
                                    </div>
                                </div>
                            </div>
    
                            <div class="btn btn-light p-2 bordered w-100">
                                <router-link class="text-center" to="/Spots"> 查看更多&gt;</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
            <!--全部类型end-->

                <div class="row">
                    <div class="btn btn-light p-2 bordered w-100">
                        <router-link class="text-center primary-color" to="/Spots"> 查看更多&gt;</router-link>
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
                //电影类型
                selected: 'module1',
                   typeId: 1,
                    typeArr: [],
                //电影排序
                orderById: '',
                orderArr: [{ name: '按热度排序', id: 0 }, { name: '按时间排序', id: 1 }]
            }
        },
        methods: {    
            //初始化电影类型下拉
            initMovieType() {
                this.axios.get(this.$store.state.url + 'managemodule/type/selectAllType')
                    .then(res => {
                        console.log(res);
                        this.typeArr = res.data.rows;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            changeMovieType(data){
                this.typeId=data.id;
            },
            changeOrderType(data){
                this.orderById=data.id;
            },
           
        },
        mounted(){
           this.initMovieType();
        },
        created() {
          
        },
     
        destroyed() {
            
        }
    }
</script>
<style>
    @import '../assets/css/Movies.css';
    [v-cloak] {
        display: none;
    }
    .app-spots #body #all-spots>div>div>div {
        border: none;
    }
    .h-tabs-default {
        border-bottom: none;
    }
</style>