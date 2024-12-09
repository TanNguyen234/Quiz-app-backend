import Chat from "../../models/chat.model";

const io = (global as any)._io;

export const handleSendMessage = async (
  id: string,
  fullName: string,
  content: string
) => {
    const chat = new Chat({
        user_id: id,
        content: content
    });
    await chat.save();

    return {
        user_id: id,
        fullName: fullName,
        content: content
    }
};