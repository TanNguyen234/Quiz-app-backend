import { Socket } from "socket.io"
import User from "../../models/user.model";
import { request } from "express";

const usersSocket = async (): Promise<void> => {
    const req: any = request
    const io = (global as any)._io;
    io.on('connection', (socket: Socket) => {
        console.log("New client connected:", socket.id);
        try {
            const { id } = req?.user
            socket.on('CLIENT_ADD_FRIEND', async (userId) => {
                console.log('CLIENT_ADD_FRIEND')
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
            socket.on('CLIENT_CANCEL_FRIEND', async (userId) => {
                //Xóa id của người gửi trong acceptFriend của B
                console.log('CLIENT_CANCEL_FRIEND')
                const existinB = await User.findOne({
                    _id: userId,
                    acceptFriends: [id]
                })
                console.log(existinB)
                if(existinB) {
                    await User.updateOne({
                        _id: userId
                    },{
                        $pull: {
                            acceptFriends: id
                        }
                    })
                }
                //Xóa id của người gửi trong requestFriends của người gửi(A)
                const existinA = await User.findOne({
                    _id: id,
                    requestFriends: [userId]
                })
                console.log(existinA)
                if(existinA) {
                    await User.updateOne({
                        _id: id
                    },{
                        $pull: {
                            requestFriends: userId
                        }
                    }
                )
                }
            })
    
        } catch (error) {
            
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