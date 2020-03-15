import { Component, Vue } from "vue-property-decorator";

import ChatMessage from "../ChatMessage/ChatMessage.vue";

import store from "@/store";

import { Message } from "../../types";

@Component({
  components: {
    ChatMessage
  }
})
export default class ChatWindow extends Vue {
  messages: Message[] = [];

  mounted() {
    store.state.socket.on("message", (data: Message[]) => {
      console.log(data);
      data.forEach((message: Message) => {
        this.messages.push({
          id: message.id,
          author: message.author || "PalaBot",
          content: message.content,
          isMe: !(message.author == "PalaBot"),
          timestamp: message.timestamp || Date.now()
        });
      });
    });
  }
  get orderedMessages() {
    return this.messages
      .sort((a, b) => {
        return b.timestamp - a.timestamp;
      })
      .slice(0, 6)
      .reverse();
  }
}
