import { MessageBDD } from "./database/models/Message";

interface Message {
  content: string;
  author: string;
  id: string;
  timestamp: number;
  conversationId: number;
}

export { Message };
