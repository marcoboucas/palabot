import MessageModel, { MessageBDD } from "./models/Message";

let errorHandler = (err: any) => {
  if (err) console.error(err);
};

let addMessage = async (data: any): Promise<string> => {
  return new Promise(resolve => {
    if (
      Object.keys(data).includes("content") &&
      Object.keys(data).includes("author")
    ) {
      MessageModel.create(
        {
          author: data.author,
          content: data.content,
          conversationId: data.conversationId,
          timestamp: Date.now()
        },
        function(err: any, ele: any) {
          resolve(ele._id);
        }
      );
    }
  });
};

let deleteAllMessages = () => {
  MessageModel.deleteMany({}, errorHandler);
};

let getAllMessages = async (): Promise<MessageBDD[]> => {
  return new Promise(resolve => {
    MessageModel.find((err: any, docs: MessageBDD[]) => {
      resolve(docs);
    });
  });
};

let getAllMessagesFromConversation = async (
  conversationId: number
): Promise<MessageBDD[]> => {
  return new Promise(resolve => {
    MessageModel.find(
      { conversationId: conversationId },
      (err: any, docs: MessageBDD[]) => {
        resolve(docs);
      }
    );
  });
};

export {
  addMessage,
  deleteAllMessages,
  getAllMessages,
  getAllMessagesFromConversation
};
