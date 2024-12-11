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
const topic_route_1 = require("./topic.route");
const question_route_1 = require("./question.route");
const user_route_1 = require("./user.route");
const answer_route_1 = require("./answer.route");
const users_route_1 = require("./users.route");
const middleware = __importStar(require("../middlewares/auth.middleware"));
const chat_route_1 = require("./chat.route");
const userApiRoute = (app) => {
    const version = '/api/v1';
    app.use(version + '/topics', topic_route_1.topicRoutes);
    app.use(version + '/questions', question_route_1.questionRoutes);
    app.use(version + '/answers', answer_route_1.answerRoutes);
    app.use(version + '/user', user_route_1.userRoutes);
    app.use(version + '/users', users_route_1.usersRoutes);
    app.use(version + '/chat', middleware.Auth, chat_route_1.chatRoutes);
};
exports.default = userApiRoute;
