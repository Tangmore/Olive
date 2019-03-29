import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        url:"http://127.0.0.1:82",
        imgUrl:"http://127.0.0.1:83",
        islogin: false,
        // userMsg: sessionStorage.getItem('userMsg')?
        // JSON.parse(sessionStorage.getItem('userMsg')):null
    },
    mutations:{
        signin(state){
            state.islogin = true;
            // state.userMsg = userMsg;
            // window.sessionStorage.setItem('userMsg', JSON.stringify(state.userMsg));
        },
        signout(){
            this.state.islogin = false;
            this.state.userMsg = null;
            window.sessionStorage.removeItem('userMsg');
        }
    },
    actions:{

    }

})