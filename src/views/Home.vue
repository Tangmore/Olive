<template>
  <div  v-cloak class="position-relative">
    <Header></Header>
    <router-view v-if="reloadable"></router-view>
    <!-- <Animation></Animation> -->
    <Footer></Footer>
  </div>
</template>

<script>

// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
// import toTop from '@/components/toTop.vue'
import Animation from '@/components/animation.vue'
export default {
  provide(){
      return {
          reload:this.reload
      }
  },
  data(){
    return {
      reloadable:true,
    }
  },
  methods: {
    reload() {
			this.reloadable = false;
			this.$nextTick(function(){
				this.reloadable = true;
			})
    }
  },
  components: {
    Header,
    Footer,
    Animation
  }
}
</script>
<style>
[v-cloak] {
display: none;
}
</style>