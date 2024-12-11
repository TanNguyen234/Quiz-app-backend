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
exports.register = exports.login = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../models/user.model"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({
            code: 400,
            message: "Please provide email and password"
        });
    }
    try {
        const user = yield user_model_1.default.findOne({
            email: email,
            password: (0, md5_1.default)(password)
        });
        if (user) {
            const userInfo = {
                id: user.id,
                fullName: user.fullName,
                token: user.token
            };
            req.user = userInfo;
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Invalid username or password"
        });
    }
    next();
});
exports.login = login;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        res.json({
            code: 400,
            message: "Please provide full of information"
        });
        return;
    }
    else {
        const userExist = yield user_model_1.default.findOne({
            email: email,
            deleted: false,
            status: "active"
        });
        if (userExist) {
            res.json({
                code: 400,
                message: "Email already registered"
            });
            return;
        }
        else {
            req.userRegister = {
                fullName: fullName,
                email: email,
                password: (0, md5_1.default)(password)
            };
        }
    }
    next();
});
exports.register = register;
