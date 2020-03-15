import Vue from "vue";
import Vuex from "vuex";

import io from "socket.io-client";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: io(process.env.VUE_APP_BACK_LINK)
  }
});
