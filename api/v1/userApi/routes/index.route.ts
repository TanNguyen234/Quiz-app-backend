import { Express } from 'express';
import { topicRoutes } from './topic.route';
import { questionRoutes } from './question.route';
import { userRoutes } from './user.route';
import { answerRoutes } from './answer.route';
import { usersRoutes } from './users.route';

import * as middleware from '../middlewares/auth.middleware';
import { chatRoutes } from './chat.route';
import { roomChatRoutes } from './room-chat.route'

const userApiRoute = (app: Express): void =>{
    const version: String = '/api/v1';

    app.use(version + '/topics', topicRoutes)
    app.use(version + '/questions', questionRoutes)
    app.use(version + '/answers', answerRoutes)

    app.use(version + '/user', userRoutes)

    app.use(version + '/users', usersRoutes)

    app.use(version + '/chat', middleware.Auth , chatRoutes)

    app.use(version + '/rooms', middleware.Auth , roomChatRoutes)
}

export default userApiRoute;