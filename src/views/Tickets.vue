<template>
    <section>



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
        // created() {
        //     // this.loadCarousel();
        //     // this.carouselTask();
        //     // this.loadTab();
        //     // this.loadGuide();
        //     // this.loadpopTravels();
        // },
        computed: {
            ...mapState(['userMsg'])
        },

    }
</script>
<style>
    @import '../assets/css/index.css';
</style>