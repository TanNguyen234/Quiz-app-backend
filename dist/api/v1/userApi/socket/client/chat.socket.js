"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_function_1 = require("./chat-function");
const chatSocket = (user, roomChatId) => __awaiter(void 0, void 0, void 0, function* () {
    const io = global._io;
    const { id, fullName } = user;
    io.once("connection", (socket) => {
        socket.join(roomChatId);
        socket.removeAllListeners("CLIENT_SEND_MESSAGE");
        socket.on("CLIENT_SEND_MESSAGE", (content) => __awaiter(void 0, void 0, void 0, function* () {
            const message = yield (0, chat_function_1.handleSendMessage)(id, fullName, content, roomChatId);
            io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", message);
        }));
        socket.removeAllListeners("CLIENT_SEND_TYPING");
        socket.on("CLIENT_SEND_TYPING", (type) => {
            socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
                id,
                fullName,
                type
            });
        });
        socket.on("disconnect", () => {
            socket.removeAllListeners("CLIENT_SEND_MESSAGE");
            socket.removeAllListeners("CLIENT_SEND_TYPING");
        });
        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });
    });
});
exports.default = chatSocket;
