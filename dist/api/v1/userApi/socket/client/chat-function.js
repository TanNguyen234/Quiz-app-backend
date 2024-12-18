"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.handleSendMessage = void 0;
const chat_model_1 = __importDefault(require("../../models/chat.model"));
const uploadToCloudinary = __importStar(require("../../../../../helpers/uploadToCloudinary"));
const io = global._io;
const handleSendMessage = (id, fullName, content, roomChatId) => __awaiter(void 0, void 0, void 0, function* () {
    let saveObj = {
        user_id: id,
        room_chat_id: roomChatId
    };
    if (content.files) {
        let images = [];
        for (const imageBuffer of content.files) {
            const { type, originFileObj } = imageBuffer;
            const link = yield uploadToCloudinary.uploadToCloudinary(originFileObj, type);
            images.push(link);
        }
        saveObj["images"] = images;
    }
    if (content.file) {
        let images = [];
        const { type, originFileObj } = content.file;
        const link = yield uploadToCloudinary.uploadToCloudinary(originFileObj, type);
        images.push(link);
        saveObj["images"] = images;
    }
    if (content.message) {
        saveObj["content"] = content.message;
    }
    const chat = new chat_model_1.default(saveObj);
    yield chat.save();
    console.log(chat);
    return Object.assign(Object.assign({}, saveObj), { fullName });
});
exports.handleSendMessage = handleSendMessage;
