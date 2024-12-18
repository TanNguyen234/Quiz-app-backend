import { Socket } from "socket.io";
import { handleSendMessage } from "./chat-function";

const chatSocket = async (user: any, roomChatId: string): Promise<void> => {
  const io = (global as any)._io;
  const { id, fullName } = user;

  io.once("connection", (socket: Socket) => {
    socket.join(roomChatId)
    
    //CLIENT_SEND_MESSAGE
    socket.removeAllListeners("CLIENT_SEND_MESSAGE");
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      const message = await handleSendMessage(id, fullName, content, roomChatId);
      io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", message);
    });

    //CLIENT_SEND_TYPING
    socket.removeAllListeners("CLIENT_SEND_TYPING");
    socket.on("CLIENT_SEND_TYPING", (type) => {

      socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
        id,
        fullName,
        type
      });
    });

    socket.on("disconnect", () => {
      socket.removeAllListeners("CLIENT_SEND_MESSAGE");
      socket.removeAllListeners("CLIENT_SEND_TYPING");
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });
  });
};

export default chatSocket;
