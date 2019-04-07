import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        url:"http://127.0.0.1:8082/",
        islogin: false,
    },
    mutations:{
        signin(state){
            state.islogin = true;
        },
        signout(){
            this.state.islogin = false;
            window.sessionStorage.removeItem('token');
        }
    },
    actions:{

    }

})