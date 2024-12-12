import Chat from "../../models/chat.model";

const io = (global as any)._io;

interface content {
    message: string;
    file: any;
    files: any;
}
export const handleSendMessage = async (
  id: string,
  fullName: string,
  content: content
) => {
    if(content.message) {
        const chat = new Chat({
            user_id: id,
            content: content.message
        });
        await chat.save();
    }

    return {
        user_id: id,
        fullName: fullName,
        content: content
    }
};