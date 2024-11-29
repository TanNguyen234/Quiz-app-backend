import { Request } from "express"
import { Socket } from "socket.io"

const usersSocket = async (): Promise<void> => {
    const io = (global as any)._io;
    io.once('connection', (socket: Socket) => {
        console.log("New client connected:", socket.id);

        socket.on('CLIENT_ADD_FRIEND', async (userId) => {
            console.log(userId);
        })

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
          });
    })
}

export default usersSocket