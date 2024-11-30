import { Socket } from "socket.io"
import User from "../../models/user.model";

const usersSocket = async (user: any): Promise<void> => {
    const io = (global as any)._io;
    const { id } = user;
    io.once('connection', (socket: Socket) => {
        console.log("New client connected:", socket.id);

        socket.on('CLIENT_ADD_FRIEND', async (userId) => {
            //Thêm id của người gửi vào acceptFriend của B
            const existinB = await User.findOne({
                _id: userId,
                acceptFriends: [id]
            })
            if(!existinB) {
                await User.updateOne({
                    _id: userId
                },{
                    $push: {
                        acceptFriends: id
                    }
                })
            }
            //Thêm id của người gửi vào requestFriends của người gửi(A)
            const existinA = await User.findOne({
                _id: id,
                requestFriends: [userId]
            })
            if(!existinA) {
                await User.updateOne({
                    _id: id
                },{
                    $push: {
                        requestFriends: userId
                    }
                }
            )
            }
        })

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });

        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });
    })
}

export default usersSocket