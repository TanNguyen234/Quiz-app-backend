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
const chatSocket = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const io = global._io;
    io.once("connection", (socket) => {
        console.log("New client connected:", socket.id);
        const { id, fullName } = user;
        socket.removeAllListeners("CLIENT_SEND_MESSAGE");
        socket.on("CLIENT_SEND_MESSAGE", (content) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("CLIENT_SEND_MESSAGE");
            const message = yield (0, chat_function_1.handleSendMessage)(id, fullName, content);
            io.emit("SERVER_RETURN_MESSAGE", message);
        }));
        socket.removeAllListeners("CLIENT_SEND_TYPING");
        socket.on("CLIENT_SEND_TYPING", (type) => {
            console.log("CLIENT_SEND_TYPING", type);
            socket.broadcast.emit("SERVER_RETURN_TYPING", {
                id,
                fullName,
                type
            });
        });
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
            socket.removeAllListeners("CLIENT_SEND_MESSAGE");
        });
        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });
    });
});
exports.default = chatSocket;
