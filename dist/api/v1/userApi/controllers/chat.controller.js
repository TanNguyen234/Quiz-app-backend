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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const chat_model_1 = __importDefault(require("../models/chat.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const chat_socket_1 = __importDefault(require("../socket/client/chat.socket"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const roomChatId = req.params.roomChatId;
    (0, chat_socket_1.default)(user, roomChatId);
    try {
        const chats = yield chat_model_1.default.find({
            room_chat_id: roomChatId,
            deleted: false
        });
        const updatedChats = yield Promise.all(chats.map((chat) => __awaiter(void 0, void 0, void 0, function* () {
            const infoUser = yield user_model_1.default.findOne({
                _id: chat.user_id
            }).select('fullName');
            if (infoUser) {
                return Object.assign(Object.assign({}, chat), { fullName: infoUser.fullName });
            }
            else {
                return Object.assign(Object.assign({}, chat), { fullName: '' });
            }
        })));
        if (!chats) {
            throw new Error('No chat');
        }
        res.json({
            code: 200,
            data: updatedChats
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: 'No chat'
        });
    }
});
exports.index = index;
