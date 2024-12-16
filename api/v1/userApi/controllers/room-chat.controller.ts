import { Request, Response } from "express"
import RoomChat from "../models/room-chat.model";
import User from "../models/user.model";

//[GET] /api/v1/rooms/
export const index = async (req: Request | any, res: Response): Promise<void> => {
    const { id } = req.user;

    const rooms = await RoomChat.find({
        "users.user_id": id,
        deleted: false
    })

    for (const room of rooms) {
        if(room.typeRoom === "friend" && room.users.length === 2) {
            if(room.users[0].user_id !== id) {
                (room as any).info = await User.findOne({ _id: room.users[0].user_id}).select('fullName avatar')
            } else if (room.users[1].user_id !== id) {
                (room as any).info = await User.findOne({ _id: room.users[1].user_id}).select('fullName avatar')
            }
            console.log(room)
        }
    }

    if(!id || rooms.length === 0) {
        res.json({
            code: 400,
            message: "No Data"
        })
        return;
    }

    res.json({
       code: 200,
       data: rooms
    })
}