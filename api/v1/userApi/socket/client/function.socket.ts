import User from "../../models/user.model"

export const handleAddFriend = async (id: string, userId: string): Promise<void> => {
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
}

export const handleCancelRequest = async (id: string, userId: string): Promise<void> => {
    //Xóa id của người gửi trong acceptFriend của B
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
}

export const handleDenyFriend = async (id: string, userId: string): Promise<void> => {
    //Xóa id của người gửi trong acceptFriend của B
    await User.updateOne({
        _id: id
    },{
        $pull: {
            acceptFriends: userId
        }
    })
    //Xóa id của người gửi trong requestFriends của người gửi(A)
    await User.updateOne({
        _id: userId
    },{
        $pull: {
            requestFriends: id
        }
    })
}

export const handleAcceptFriend = async (id: string, userId: string): Promise<void> => {
    //Xóa id của người gửi trong acceptFriend của B
    await User.updateOne({
        _id: userId
    },{
        $pull: {
            acceptFriends: id
        },
        $addToSet: { friendList: {
            user_id: id,
            room_chat_id: '',
        }}
    })
    //Xóa id của người gửi trong requestFriends của người gửi(A)
    await User.updateOne({
        _id: id
    },{
        $pull: {
            requestFriends: userId
        },
        $addToSet: { friendList: {
            user_id: userId,
            room_chat_id: '',
        }}
    })
}