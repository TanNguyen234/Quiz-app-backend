import { Socket } from "socket.io"
import { handleSendMessage } from "./chat-function";

const chatSocket = async (user: any): Promise<void> => {
    const io = (global as any)._io;
    io.once('connection', (socket: Socket) => {
        console.log("New client connected:", socket.id);
        try {
            const { id, fullName } = user
            //CLIENT_ADD_FRIEND
            socket.removeAllListeners("CLIENT_SEND_MESSAGE");
            socket.on('CLIENT_SEND_MESSAGE', async (content) => {
                console.log('CLIENT_SEND_MESSAGE')
                const message = await handleSendMessage(id, fullName, content)
                io.emit("SERVER_RETURN_MESSAGE", message);
            })
            
        } catch (error) {
            console.log("error: ", error)
        }

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
            socket.removeAllListeners('CLIENT_SEND_MESSAGE')
        });

        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });
    })
}

export default chatSocket