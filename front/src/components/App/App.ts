import { Component, Vue } from "vue-property-decorator";
import Header from "../Header/Header.vue";
import Footer from "../Footer/Footer.vue";
import ChatWindow from "../ChatWindow/ChatWindow.vue";

@Component({
  components: {
    Header,
    ChatWindow,
    Footer
  }
})
export default class App extends Vue {}
