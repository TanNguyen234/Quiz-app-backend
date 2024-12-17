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
exports.isAccess = void 0;
const room_chat_model_1 = __importDefault(require("../models/room-chat.model"));
const isAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomChat = req.params.roomChatId;
    const { id } = req.user;
    const existUserInRoomChat = yield room_chat_model_1.default.findOne({
        _id: roomChat,
        "users.user_id": id,
        deleted: false
    });
    if (existUserInRoomChat) {
        next();
    }
    else {
        res.json({
            code: 400,
            message: 'No Data'
        });
    }
});
exports.isAccess = isAccess;
