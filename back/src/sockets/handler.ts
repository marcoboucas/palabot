import {
  addMessage,
  getAllMessagesFromConversation
} from "../database/functions";
import { MessageBDD } from "../database/models/Message";
import { Message } from "../types";

const handler = async (socket: any) => {
  socket.user = "Marco";
  socket.conversationId = 1;

  // Check if there is already some messages in the database for him
  let docs: MessageBDD[] = await getAllMessagesFromConversation(
    socket.conversationId
  );
  if (docs.length > 0) {
    let messages: Message[] = docs.map(
      (ele: MessageBDD): Message => {
        return {
          id: ele.id,
          content: ele.content,
          author: ele.author,
          timestamp: ele.timestamp,
          conversationId: socket.conversationId
        };
      }
    );
    socket.emit("message", messages);
  }

  socket.on("message", async (content: string) => {
    console.log(socket.user, content);
    /*

    Data treatment for the message received by the server
    
    */

    let messageReceived: Message = {
      id: "",
      content: content,
      author: socket.user,
      timestamp: Date.now(),
      conversationId: socket.conversationId
    };
    messageReceived.id = await addMessage(messageReceived);

    socket.emit("message", [messageReceived]);

    /*

    Data treatment for the message sent by the server
    
    */

    let response: string = "Salut !";

    let messageSent: Message = {
      id: "",
      content: response,
      author: "PalaBot",
      timestamp: Date.now(),
      conversationId: socket.conversationId
    };
    messageSent.id = await addMessage(messageSent);

    socket.emit("message", [messageSent]);
  });
};
export default handler;
