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
exports.change = exports.checkOTP = exports.otp = exports.detail = exports.register = exports.login = exports.index = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../models/user.model"));
const generate_1 = require("../../../../helpers/generate");
const sendMail_1 = __importDefault(require("../../../../helpers/sendMail"));
const forgotPassword_model_1 = __importDefault(require("../models/forgotPassword.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.keyword) {
    }
    else {
        try {
            const users = yield user_model_1.default.find({
                deleted: false,
                status: "active"
            }).select("-email -password -token");
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
const login = (req, res) => {
    if (req.user) {
        res.json({
            code: 200,
            data: req.user
        });
    }
    else {
        res.json({
            code: 400,
            message: "Invalid email or password"
        });
    }
};
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSave = req.userRegister;
    if (userSave) {
        userSave.token = (0, generate_1.generateRandomString)(30);
        try {
            const user = new user_model_1.default(userSave);
            yield user.save();
            res.json({
                code: 200,
                data: {
                    id: user.id,
                    fullName: user.fullName,
                    token: user.token
                }
            });
            return;
        }
        catch (error) {
            res.json({
                code: 500,
                message: "Error saving user"
            });
            return;
        }
    }
    else {
        res.json({
            code: 400,
            message: "Invalid User's provided information"
        });
        return;
    }
});
exports.register = register;
const detail = (req, res) => {
    if (req.user) {
        const user = {
            id: req.user.id,
            fullName: req.user.fullName,
            email: req.user.email,
            token: req.user.token
        };
        res.json({
            code: 200,
            data: user
        });
    }
    else {
        res.json({
            code: 400,
            message: "Invalid token"
        });
    }
};
exports.detail = detail;
const otp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        res.json({
            code: 400,
            message: "Invalid email"
        });
        return;
    }
    try {
        const existEmail = yield user_model_1.default.findOne({
            email: email,
            deleted: false
        });
        if (existEmail) {
            const otp = (0, generate_1.generateRandomNumber)(8);
            const forgotPassword = new forgotPassword_model_1.default({
                email,
                otp
            });
            forgotPassword.save();
            const subject = "Mã xác minh lấy lại mật khẩu";
            const html = `
                <h1>Mã xác minh đổi mật khẩu</h1>
                <duv>Mã xác minh của bạn là: <b style='color: green'>${otp}<b></div>
                <p>Thời hạn sử dụng là 3 phút.</p>`;
            (0, sendMail_1.default)(email, subject, html);
            res.json({
                code: 200,
                message: "OTP sent successfully"
            });
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Invalid email"
        });
    }
});
exports.otp = otp;
const checkOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    if (!email || !otp) {
        res.json({
            code: 400,
            message: "Invalid email or OTP"
        });
        return;
    }
    try {
        const forgotPassword = yield forgotPassword_model_1.default.findOne({
            email: email,
            otp: otp,
            expireAt: new Date(),
            deleted: false
        });
        if (forgotPassword) {
            res.json({
                code: 200,
                id: forgotPassword.id,
                message: "success"
            });
        }
        else {
            throw new Error("Không tìm thấy");
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Invalid email or OTP"
        });
    }
});
exports.checkOTP = checkOTP;
const change = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({
            code: 400,
            message: "Email or password is required"
        });
    }
    else {
        try {
            const user = yield user_model_1.default.updateOne({
                email: email
            }, {
                password: (0, md5_1.default)(password)
            });
            if (!user) {
                throw new Error('error');
            }
            res.json({
                code: 200,
                message: "success"
            });
        }
        catch (error) {
            res.json({
                code: 400,
                message: "error"
            });
        }
    }
});
exports.change = change;
