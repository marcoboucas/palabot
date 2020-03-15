import { Component, Vue } from "vue-property-decorator";

import store from "@/store";

@Component
export default class Footer extends Vue {
  messageUtilisateur = "";

  sendMessage = (event: any) => {
    store.state.socket.emit("message", event.explicitOriginalTarget.value);

    event.target.reset();
    event.preventDefault();
  };
}
