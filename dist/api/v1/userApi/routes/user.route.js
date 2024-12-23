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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const multer = require('multer');
const router = (0, express_1.Router)();
const controller = __importStar(require("../controllers/user.controller"));
const validate = __importStar(require("../validates/user.validate"));
const middleware = __importStar(require("../middlewares/auth.middleware"));
const upload = multer();
router.post('/password/otp', controller.otp);
router.post('/password/checkOTP', controller.checkOTP);
router.patch('/password/change', controller.change);
router.get('/detail', middleware.Auth, controller.detail);
router.post('/login', validate.login, controller.login);
router.post('/register', validate.register, controller.register);
router.get('/logout', middleware.Auth, controller.logout);
router.post('/changeInfo', upload.single('avatar'), middleware.Auth, controller.changeInfo);
exports.userRoutes = router;
