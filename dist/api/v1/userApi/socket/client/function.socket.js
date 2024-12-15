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
exports.handleDeleteFriend = exports.handleAcceptFriend = exports.handleDenyFriend = exports.handleCancelRequest = exports.handleAddFriend = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const room_chat_model_1 = __importDefault(require("../../models/room-chat.model"));
const handleAddFriend = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.updateOne({
        _id: userId,
    }, {
        $addToSet: { acceptFriends: id },
    });
    yield user_model_1.default.updateOne({
        _id: id,
    }, {
        $addToSet: { requestFriends: userId },
    });
});
exports.handleAddFriend = handleAddFriend;
const handleCancelRequest = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.updateOne({
        _id: userId,
    }, {
        $pull: {
            acceptFriends: id,
        },
    });
    yield user_model_1.default.updateOne({
        _id: id,
    }, {
        $pull: {
            requestFriends: userId,
        },
    });
});
exports.handleCancelRequest = handleCancelRequest;
const handleDenyFriend = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.updateOne({
        _id: id,
    }, {
        $pull: {
            acceptFriends: userId,
        },
    });
    yield user_model_1.default.updateOne({
        _id: userId,
    }, {
        $pull: {
            requestFriends: id,
        },
    });
});
exports.handleDenyFriend = handleDenyFriend;
const handleAcceptFriend = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const dataRoom = {
        typeRoom: "friend",
        users: [
            {
                user_id: userId,
                role: "superAdmin",
            },
            {
                user_id: id,
                role: "superAdmin",
            },
        ],
    };
    const roomChat = new room_chat_model_1.default(dataRoom);
    yield roomChat.save();
    const userBinA = yield user_model_1.default.findOne({
        _id: userId,
        "friendList.user_id": id,
    });
    if (!userBinA) {
        yield user_model_1.default.updateOne({
            _id: userId,
        }, {
            $pull: {
                requestFriends: id,
            },
            $addToSet: {
                friendList: {
                    user_id: id,
                    room_chat_id: roomChat.id,
                },
            },
        });
    }
    const userAinB = yield user_model_1.default.findOne({
        _id: id,
        "friendList.user_id": userId,
    });
    if (!userAinB) {
        yield user_model_1.default.updateOne({
            _id: id,
        }, {
            $pull: {
                acceptFriends: userId,
            },
            $addToSet: {
                friendList: {
                    user_id: userId,
                    room_chat_id: roomChat.id,
                },
            },
        });
    }
});
exports.handleAcceptFriend = handleAcceptFriend;
const handleDeleteFriend = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.updateOne({
        _id: userId,
    }, {
        $pull: {
            friendList: {
                user_id: id,
            },
        },
    });
    yield user_model_1.default.updateOne({
        _id: id,
    }, {
        $pull: {
            friendList: {
                user_id: userId,
            },
        },
    });
});
exports.handleDeleteFriend = handleDeleteFriend;
