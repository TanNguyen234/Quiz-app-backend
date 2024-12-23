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
const function_socket_1 = require("./function.socket");
const updateStatusUser_1 = __importDefault(require("../../../../../helpers/updateStatusUser"));
const usersSocket = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const io = global._io;
    io.once('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = user;
        try {
            (0, updateStatusUser_1.default)(id, 'online');
            socket.emit('SERVER_RETURN_USER_STATUS_ONLINE', {
                userId: id,
                status: 'online'
            });
            socket.removeAllListeners("CLIENT_ADD_FRIEND");
            socket.on('CLIENT_ADD_FRIEND', (userId) => __awaiter(void 0, void 0, void 0, function* () {
                console.log('CLIENT_ADD_FRIEND');
                yield (0, function_socket_1.handleAddFriend)(id, userId);
            }));
            socket.removeAllListeners("CLIENT_CANCEL_FRIEND");
            socket.on('CLIENT_CANCEL_FRIEND', (userId) => __awaiter(void 0, void 0, void 0, function* () {
                console.log('CLIENT_CANCEL_FRIEND');
                yield (0, function_socket_1.handleCancelRequest)(id, userId);
            }));
            socket.removeAllListeners("CLIENT_DENY_FRIEND");
            socket.on('CLIENT_DENY_FRIEND', (userId) => __awaiter(void 0, void 0, void 0, function* () {
                console.log('CLIENT_DENY_FRIEND');
                yield (0, function_socket_1.handleDenyFriend)(id, userId);
            }));
            socket.removeAllListeners("CLIENT_ACCEPT_FRIEND");
            socket.on('CLIENT_ACCEPT_FRIEND', (userId) => __awaiter(void 0, void 0, void 0, function* () {
                console.log('CLIENT_ACCEPT_FRIEND');
                yield (0, function_socket_1.handleAcceptFriend)(id, userId);
            }));
            socket.removeAllListeners("CLIENT_DELETE_FRIEND");
            socket.on('CLIENT_DELETE_FRIEND', (userId) => __awaiter(void 0, void 0, void 0, function* () {
                console.log('CLIENT_DELETE_FRIEND');
                yield (0, function_socket_1.handleDeleteFriend)(id, userId);
            }));
        }
        catch (error) {
            console.log("error: ", error);
        }
        socket.on("disconnect", () => {
            (0, updateStatusUser_1.default)(id, 'offline');
            socket.emit('SERVER_RETURN_USER_STATUS_ONLINE', {
                userId: id,
                status: 'offline'
            });
            socket.removeAllListeners('CLIENT_ADD_FRIEND');
            socket.removeAllListeners('CLIENT_CANCEL_FRIEND');
            socket.removeAllListeners('CLIENT_DENY_FRIEND');
            socket.removeAllListeners('CLIENT_ACCEPT_FRIEND');
            socket.removeAllListeners('CLIENT_DELETE_FRIEND');
        });
        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });
    }));
});
exports.default = usersSocket;
