
import { Request, Response, NextFunction } from "express"
import RoomChat from '../models/room-chat.model'

export const isAccess = async (req: Request | any, res: Response, next: NextFunction): Promise<void> => {
    const roomChat = req.params.roomChatId;
    const { id } = req.user

    const existUserInRoomChat = await RoomChat.findOne({
        _id: roomChat,
        "users.user_id": id,
        deleted: false
    })
    
    if(existUserInRoomChat) {
        next()
    } else {
        res.json({
            code: 400,
            message: 'No Data'
        })
    }
}