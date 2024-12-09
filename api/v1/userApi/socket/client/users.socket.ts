import { Socket } from "socket.io"
import { handleAcceptFriend, handleAddFriend, handleCancelRequest, handleDeleteFriend, handleDenyFriend } from "./function.socket";

const usersSocket = async (user: any): Promise<void> => {
    const io = (global as any)._io;
    io.once('connection', (socket: Socket) => {
        console.log("New client connected:", socket.id);
        try {
            const { id } = user
            //CLIENT_ADD_FRIEND
            socket.removeAllListeners("CLIENT_ADD_FRIEND");
            socket.on('CLIENT_ADD_FRIEND', async (userId) => {
                console.log('CLIENT_ADD_FRIEND')
                await handleAddFriend(id, userId)
            })

            //CLIENT_CANCEL_FRIEND
            socket.removeAllListeners("CLIENT_CANCEL_FRIEND");
            socket.on('CLIENT_CANCEL_FRIEND', async (userId) => {
                console.log('CLIENT_CANCEL_FRIEND')
                await handleCancelRequest(id, userId)
            })

            //CLIENT_DENY_FRIEND
            socket.removeAllListeners("CLIENT_DENY_FRIEND");
            socket.on('CLIENT_DENY_FRIEND', async (userId) => {
                console.log('CLIENT_DENY_FRIEND')
                await handleDenyFriend(id, userId)
            })

            //CLIENT_ACCEPT_FRIEND
            socket.removeAllListeners("CLIENT_ACCEPT_FRIEND");
            socket.on('CLIENT_ACCEPT_FRIEND', async (userId) => {
                console.log('CLIENT_ACCEPT_FRIEND')
                await handleAcceptFriend(id, userId)
            })
            
             //CLIENT_DELETE_FRIEND
             socket.removeAllListeners("CLIENT_DELETE_FRIEND");
             socket.on('CLIENT_DELETE_FRIEND', async (userId) => {
                 console.log('CLIENT_DELETE_FRIEND')
                 await handleDeleteFriend(id, userId)
             })
        } catch (error) {
            console.log("error: ", error)
        }

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
            socket.removeAllListeners('CLIENT_ADD_FRIEND')
            socket.removeAllListeners('CLIENT_CANCEL_FRIEND')
            socket.removeAllListeners('CLIENT_DENY_FRIEND')
            socket.removeAllListeners('CLIENT_ACCEPT_FRIEND')
            socket.removeAllListeners('CLIENT_DELETE_FRIEND')
        });

        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });
    })
}

export default usersSocket