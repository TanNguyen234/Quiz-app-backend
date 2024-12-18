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
exports.friend = exports.invite = exports.index = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const convertToSlug_1 = require("../../../../helpers/convertToSlug");
const mongoose_1 = __importDefault(require("mongoose"));
const users_socket_1 = __importDefault(require("../socket/client/users.socket"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const friendList = req.user.friendList.map((item) => item.user_id);
    const keyword = req.query.keyword;
    (0, users_socket_1.default)(user);
    if (keyword && typeof keyword === 'string') {
        try {
            const slug = (0, convertToSlug_1.convertToSlug)(keyword);
            const slugRegex = new RegExp(slug, 'i');
            const searchConditions = {
                $or: [
                    { fullName: slugRegex },
                    { email: slugRegex },
                    { slug: slugRegex },
                ],
                deleted: false,
                status: "active",
            };
            if (mongoose_1.default.Types.ObjectId.isValid(slug)) {
                searchConditions.$or.push({ _id: slug });
            }
            const users = yield user_model_1.default.find(searchConditions).select("-email -password -token");
            console.log(users);
            res.json({
                code: 200,
                data: users
            });
        }
        catch (error) {
            console.log(error);
            res.json({
                code: 400,
                message: "Invalid"
            });
        }
    }
    else {
        try {
            const users = yield user_model_1.default.find({
                $and: [
                    { _id: { $ne: user.id } },
                    { _id: { $nin: user.requestFriends } },
                    { _id: { $nin: user.acceptFriends } },
                    { _id: { $nin: friendList } }
                ],
                deleted: false,
                status: "active",
            }).select("-email -password -token");
            console.log('not key', users);
            res.json({
                code: 200,
                data: users
            });
        }
        catch (err) {
            res.json({
                code: 400,
                message: "user is not exist"
            });
        }
    }
});
exports.index = index;
const invite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.query.type;
    const user = req.user;
    (0, users_socket_1.default)(user);
    if (type === 'request') {
        try {
            const users = yield user_model_1.default.find({
                _id: { $in: user.requestFriends },
                deleted: false,
                status: 'active'
            }).select('-email -password -token');
            res.json({
                code: 200,
                data: users
            });
        }
        catch (error) {
            console.log(error);
            res.json({
                code: 400,
                message: "Invalid"
            });
        }
    }
    else if (type === 'accept') {
        try {
            const user = req.user;
            const users = yield user_model_1.default.find({
                _id: { $in: user.acceptFriends },
                deleted: false,
                status: 'active'
            }).select('-email -password -token');
            res.json({
                code: 200,
                data: users
            });
        }
        catch (error) {
            console.log(error);
            res.json({
                code: 400,
                message: "Invalid"
            });
        }
    }
    else {
        res.json({
            code: 400,
            message: "Invalid type"
        });
    }
});
exports.invite = invite;
const friend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const friendList = user.friendList;
    const friends = friendList.map((item) => item.user_id);
    (0, users_socket_1.default)(user);
    try {
        if (friendList.length > 0) {
            const users = yield user_model_1.default.find({
                _id: { $in: friends },
                deleted: false,
                status: 'active'
            }).select('-email -password -token');
            res.json({
                code: 200,
                data: users,
                user
            });
        }
        else {
            res.json({
                code: 400,
                message: "None"
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            code: 400,
            message: "Invalid"
        });
    }
});
exports.friend = friend;
