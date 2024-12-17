import Chat from "../../models/chat.model";
import * as uploadToCloudinary from '../../../../../helpers/uploadToCloudinary'

const io = (global as any)._io;

interface content {
    message: string;
    file: any;
    files: any;
    room: string
}
interface Chat {
    user_id: string,
    content?: string,
    images?: String[],
    room_chat_id: string
}
export const handleSendMessage = async (
  id: string,
  fullName: string,
  content: content
) => {
    let saveObj: Chat = {
        user_id: id,
        room_chat_id: content.room
    }

    if(content.files) {
        let images = []
        for (const imageBuffer of content.files) {
            const { type, originFileObj } = imageBuffer
            const link: String = await uploadToCloudinary.uploadToCloudinary(originFileObj, type)
            images.push(link)
        }
        saveObj["images"] = images
    }

    if(content.file) {
        let images = []
        const { type, originFileObj } = content.file
        const link: String = await uploadToCloudinary.uploadToCloudinary(originFileObj, type)
        images.push(link)
        saveObj["images"] = images
    }

    if(content.message) {
        saveObj["content"] = content.message;
    }

    const chat = new Chat(saveObj);
    await chat.save();
    console.log(chat)

    return {
        ...saveObj,
        fullName
    }
};