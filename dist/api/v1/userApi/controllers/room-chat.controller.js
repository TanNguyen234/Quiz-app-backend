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
const room_chat_model_1 = __importDefault(require("../models/room-chat.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const rooms = yield room_chat_model_1.default.find({
        "users.user_id": id,
        deleted: false
    });
    for (const room of rooms) {
        if (room.typeRoom === "friend" && room.users.length === 2) {
            if (room.users[0].user_id !== id) {
                room.info = yield user_model_1.default.findOne({ _id: room.users[0].user_id }).select('fullName avatar');
            }
            else if (room.users[1].user_id !== id) {
                room.info = yield user_model_1.default.findOne({ _id: room.users[1].user_id }).select('fullName avatar');
            }
            console.log(room);
        }
    }
    if (!id || rooms.length === 0) {
        res.json({
            code: 400,
            message: "No Data"
        });
        return;
    }
    res.json({
        code: 200,
        data: rooms
    });
});
exports.index = index;
