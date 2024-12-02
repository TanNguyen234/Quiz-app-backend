import { Socket } from "socket.io"
import User from "../../models/user.model";

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
                    //Thêm id của người gửi vào acceptFriend của B
                    await User.updateOne({
                        _id: userId
                    },{
                        $addToSet: { acceptFriends: id }
                    })
                    //Thêm id của người gửi vào requestFriends của người gửi(A)
                    await User.updateOne({
                        _id: id
                    },{
                        $addToSet: { requestFriends: userId }
                    })
                })
            }
            if (socket.listenerCount('CLIENT_CANCEL_FRIEND') === 0) {
                socket.on('CLIENT_CANCEL_FRIEND', async (userId) => {
                    //Xóa id của người gửi trong acceptFriend của B
                    console.log('CLIENT_CANCEL_FRIEND')
                    await User.updateOne({
                        _id: userId
                    },{
                        $pull: {
                            acceptFriends: id
                        }
                    })
                    //Xóa id của người gửi trong requestFriends của người gửi(A)
                    await User.updateOne({
                        _id: id
                    },{
                        $pull: {
                            requestFriends: userId
                        }
                    })
                })
            }
    
        } catch (error) {
            console.log("error: ", error)
        }

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });

        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });
    })
}

export default usersSocket