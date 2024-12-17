import { Request, Response } from 'express';
import Chat from '../models/chat.model';
import User from '../models/user.model';
import chatSocket from '../socket/client/chat.socket';

interface CustomRequest extends Request {
    user?: {
        id: string;
        fullName: string;
    };
}

interface Chat {      
    user_id: string,
    content: string,
    images?: string,
    fullName?: string
}

//[GET] /chat/:roomChatId
export const index = async (req: CustomRequest, res: Response): Promise<void> => {
    const user = req.user as any
    const roomChatId = req.params.roomChatId
    //Soket
    chatSocket(user)
    //End Socket
    try {
        const chats = await Chat.find({
            room_chat_id: roomChatId,
            deleted: false
        })

        const updatedChats = await Promise.all(
            chats.map(async (chat) => {
                const infoUser = await User.findOne({
                    _id: chat.user_id
                }).select('fullName')

                if(infoUser) {
                    return {
                        ...chat,
                        fullName: infoUser.fullName
                    }
                } else {
                    return {
                        ...chat,
                        fullName: ''
                    }
                }
            }) 
        )

        if(!chats) {
            throw new Error('No chat')
        }

        res.json({
            code: 200,
            data: updatedChats
        })
    } catch (error) {
        res.json({
            code: 400,
            message: 'No chat'
        })
    }
}