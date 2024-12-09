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

//[GET] /chat
export const index = async (req: CustomRequest, res: Response): Promise<void> => {
    const user = req.user as any
    //Soket
    chatSocket(user)
    //End Socket
    try {
        const chats = await Chat.find({
            deleted: false
        })

        for (let chat of chats) {
            var chatBlock: any = chat

            const infoUser = await User.findOne({
                _id: chatBlock.user_id
            }).select('fullName')
    
            chatBlock.infoUser = infoUser
        }

        if(!chats) {
            throw new Error('No chat')
        }

        res.json({
            code: 200,
            chats: chats
        })
    } catch (error) {
        res.json({
            code: 400,
            message: 'No chat'
        })
    }
}