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
exports.check = exports.index = void 0;
const room_chat_model_1 = __importDefault(require("../models/room-chat.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { id } = req.user;
    const rooms = yield room_chat_model_1.default.find({
        "users.user_id": id,
        deleted: false,
    });
    const newRooms = [];
    for (var room of rooms) {
        if (room.typeRoom === "friend") {
            const userOther = ((_a = room.users[0]) === null || _a === void 0 ? void 0 : _a.user_id) !== id
                ? (_b = room.users[0]) === null || _b === void 0 ? void 0 : _b.user_id
                : (_c = room.users[1]) === null || _c === void 0 ? void 0 : _c.user_id;
            if (userOther) {
                const user = yield user_model_1.default.findOne({ _id: userOther }).select("fullName avatar");
                newRooms.push(Object.assign(Object.assign({}, room), { info: user }));
            }
        }
    }
    if (!id || rooms.length === 0) {
        res.json({
            code: 400,
            message: "No Data",
        });
        return;
    }
    res.json({
        code: 200,
        data: newRooms,
    });
});
exports.index = index;
const check = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.json({
            code: 400,
            message: "Invalid ID",
        });
        return;
    }
    try {
        const room = yield room_chat_model_1.default.findOne({
            _id: id,
            deleted: false,
        });
        if (!room) {
            throw new Error("Could not find room");
        }
        else {
            res.json({
                code: 200,
                data: room,
            });
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Invalid ID",
        });
    }
});
exports.check = check;
