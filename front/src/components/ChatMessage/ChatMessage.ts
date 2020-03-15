import { Component, Prop, Vue } from "vue-property-decorator";

import { Message } from "../../types";

@Component
export default class ChatMessage extends Vue {
  @Prop() message!: Message;
}
