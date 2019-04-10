<template>

    <div class="app footerBox">

        <button @click="showMenu" class="btn ">{{text}}</button>

        <transition name="move">
            <div class="menu" v-show="show">

                <a href="" class="inner inner-1 toTop">顶部</a>

                <div class="inner inner-2">分享</div>

                <div class="inner inner-3">...</div>
            </div>
        </transition>
    </div>
</template>
<script>
     export default {
          data() {
               return {
                    show: false
               };
          },
          methods: {
               showMenu() {
                    this.show = !this.show;
               },
          },
        mounted() {

        },
          computed: {
               text() {
                    return this.show ? 'Close' : 'Open';
               }
          }
     };
</script>
<style lang="css">
    .app .btn {
        position: fixed;
        bottom: 40px;
        right: 30px;
        z-index: 10;
        width: 50px;
        height: 50px;
        text-align: center;
        border-radius: 50%;
        border: none;
        outline: none;
        color: #1F2D3D;
        font-size: 12px;
        background: #fff;
        border: 1px solid #1F2D3D;
    }

    .app .menu {
        position: fixed;
        bottom: 50px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        transition: all .7s ease-in;
    }

    .app .move-enter-active inner {
        transform: translate3d(0, 0, 0);
        transition-timing-function: cubic-bezier(0, .57, .44, 1.97);
    }

    .app .move-enter-active .inner-1 {
        transition-delay: .1s;
    }

    .app .move-enter-active .inner-2 {
        transition-delay: .2s;
    }

    .app .move-enter-active .inner-3 {
        transition-delay: .3s;
    }

    .app .move-enter,
    .app .move-leave-active inner {
        transition-timing-function: ease-in-out;
    }

    .app .move-enter,
    .app .move-leave-active .inner-1 {
        transform: translate3d(0, 60px, 0);
        transition-delay: .3s;
    }

    .app .move-enter,
    .app .move-leave-active.inner-2 {
        transform: translate3d(40px, 40px, 0);
        transition-delay: .2s;
    }

    .app .move-enter,
    .app .move-leave-active .inner-3 {
        transform: translate3d(40px, 40px, 0);
        transition-delay: .1s;
    }

    .app .inner {
        display: inline-block;
        position: absolute;
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 50%;
        border: 1px solid #1F2D3D;
        font-size: 10px;
        text-align: center;
        color: #1F2D3D;
        transition: all .1s;
    }

    .app .inner-1 {
        position: absolute;
        top: -50px;
        left: 10px;
        background: #fff;
    }

    .app .inner-2 {
        position: absolute;
        top: -30px;
        left: -30px;
        background: #fff;
    }

    .app .inner-3 {
        position: absolute;
        top: 10px;
        left: -50px;
        background: #fff;
    }
</style>