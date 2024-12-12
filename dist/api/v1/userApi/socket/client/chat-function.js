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
exports.handleSendMessage = void 0;
const chat_model_1 = __importDefault(require("../../models/chat.model"));
const io = global._io;
const handleSendMessage = (id, fullName, content) => __awaiter(void 0, void 0, void 0, function* () {
    if (content.message) {
        const chat = new chat_model_1.default({
            user_id: id,
            content: content.message
        });
        yield chat.save();
    }
    return {
        user_id: id,
        fullName: fullName,
        content: content
    };
});
exports.handleSendMessage = handleSendMessage;
