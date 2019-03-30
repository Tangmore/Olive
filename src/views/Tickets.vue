<template>
    <section>

        <!-- 正在热映 -->
        <div class="container">
            <div class="row mt-5 pt-4">
                <div class=" col-sm-12 col-md-9">
                    <div class="row ">
                        <div class="text-left pb-4 ">
                            <span class="pop_title">正在热映</span>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 col-md-3 col-sm-4 col-4  mb-2" v-for="item in  guide.imgList">
                                <div class="">
                                    <img :src="item.img" alt="" class="w-100" @click="$router.push('/strategy_details?pid='+item.pid)">
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

                    <div class="row mb-5">
                        <div class="text-left pb-4">
                            <span class="pop_title">即将上映</span>
                        </div>

                        <div class="row">
                            <div class="col-lg-3 col-md-3 col-sm-4 col-4  mb-2" v-for="item in  guide.imgList">
                                <div class="">
                                    <img :src="item.img" alt="" class="w-100" @click="$router.push('/strategy_details?pid='+item.pid)">
                                    <p>名称{{item.spot}}
                                        <span>评分{{item.tview}}</span>
                                    </p>
                                    <button>预告片</button>
                                    <button>售票</button>
                                </div>
                            </div>
                        </div>
                        <div class="btn btn-light p-2 bordered w-100">
                            <router-link class="text-center" to="/Spots"> 查看更多&gt;</router-link>
                        </div>
                    </div>

                </div>
                <div class="col-md-3  orderWeekBox">
                    <p class="mb-4">热门推荐</p>
                    <div class="orderByWeek">

                    </div>
                </div>


            </div>
        </div>

        <Toast v-if="loginAlert" :toastMsg="loginAlertMsg" :toastClass="loginAlertBgColor"></Toast>
    </section>
</template>

<script>
    import { mapState } from 'vuex'
    import Toast from "@/components/toast.vue"
    export default {
        data() {
            return {

                guide: {
                    imgList: ['', '', '', '', '', '', '', '', '', '', '', '']
                },

                travel: {
                    travelList: ['', '', '', '']
                },
                loginAlert: false,
                loginAlertMsg: "请先登录 !",
                loginAlertBgColor: "bg-dark position-fixed"
            }
        },
        components: {
            Toast
        },
        methods: {
            carouselTask() {
                this.carousel.timer = setInterval(() => {
                    this.carousel.ind++;
                    if (this.carousel.ind > this.carousel.carouselList.length - 1) {
                        this.carousel.ind = 0;
                    }
                }, 4000)
            },
            loadCarousel() {
                this.axios.get(this.$store.state.url + '/index/carousel', {
                    params: { num1: 1, num2: 4, num3: 8, num4: 17, num5: 18 }
                }).then(res => {
                    this.carousel.carouselList = res.data;
                })
            },


            //http://localhost:3001/index/tab
            loadTab() {
                this.axios.get(this.$store.state.url + '/index/tab'
                ).then(res => {
                    this.tab.imgList = res.data;
                })
            },
            loadGuide() {
                this.axios.get(this.$store.state.url + '/index/guide'
                ).then(res => {
                    this.guide.imgList = res.data;
                    for (var item of this.guide.imgList) {
                        item.img = item.img.split('&')[0];
                    }
                    //  console.log(this.guide.imgList)
                })
            },

            loadpopTravels() {
                this.axios.get(this.$store.state.url + "/index/travel").then((res => {
                    //  console.log(res)
                    this.travel.travelList = res.data;
                }))
            },

            toAddtravel() {
                if (this.userMsg) {
                    this.$router.push('/add_travel')
                } else {
                    this.loginAlert = true;
                    setTimeout(() => {
                        this.loginAlert = false;
                    }, 2000)
                }
            }
        },
        created() {
            this.loadCarousel();
            this.carouselTask();
            this.loadTab();
            this.loadGuide();
            this.loadpopTravels();
        },
        computed: {
            ...mapState(['userMsg'])
        },

    }
</script>
<style>
    @import '../assets/css/index.css';
</style>