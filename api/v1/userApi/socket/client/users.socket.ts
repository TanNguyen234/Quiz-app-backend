import { Socket } from "socket.io"
import { handleAcceptFriend, handleAddFriend, handleCancelRequest, handleDenyFriend } from "./function.socket";

const usersSocket = async (user: any): Promise<void> => {
    const io = (global as any)._io;
    io.once('connection', (socket: Socket) => {
        console.log("New client connected:", socket.id);
        console.log('Listener count for CLIENT_ADD_FRIEND:', socket.listenerCount('CLIENT_ADD_FRIEND'));
        try {
            const { id } = user
            if (socket.listenerCount('CLIENT_ADD_FRIEND') === 0) {
                socket.on('CLIENT_ADD_FRIEND', async (userId) => {
                    console.log('CLIENT_ADD_FRIEND')
                    await handleAddFriend(id, userId)
                })
            }
            if (socket.listenerCount('CLIENT_CANCEL_FRIEND') === 0) {
                socket.on('CLIENT_CANCEL_FRIEND', async (userId) => {
                    console.log('CLIENT_CANCEL_FRIEND')
                    await handleCancelRequest(id, userId)
                })
            }
            if (socket.listenerCount('CLIENT_DENY_FRIEND') === 0) {
                socket.on('CLIENT_DENY_FRIEND', async (userId) => {
                    console.log('CLIENT_DENY_FRIEND')
                    await handleDenyFriend(id, userId)
                })
            }
            if (socket.listenerCount('CLIENT_ACCEPT_FRIEND') === 0) {
                socket.on('CLIENT_ACCEPT_FRIEND', async (userId) => {
                    console.log('CLIENT_ACCEPT_FRIEND')
                    await handleAcceptFriend(id, userId)
                })
            }
        } catch (error) {
            console.log("error: ", error)
        }

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
            socket.removeAllListeners('CLIENT_ADD_FRIEND')
            socket.removeAllListeners('CLIENT_CANCEL_FRIEND')
            socket.removeAllListeners('CLIENT_DENY_FRIEND')
            socket.removeAllListeners('CLIENT_ACCEPT_FRIEND')
        });

        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });
    })
}

export default usersSocket