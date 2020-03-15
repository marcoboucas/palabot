import mongoose from "mongoose";

let messageSchema = new mongoose.Schema({
  author: String,
  content: String,
  timestamp: { type: Number, default: Date.now },
  conversationId: Number
});

export interface MessageBDD extends mongoose.Document {
  author: string;
  content: string;
  timestamp: number;
  conversationId: number;
}
let MessageModel = mongoose.model<MessageBDD>("Message", messageSchema);

export default MessageModel;
