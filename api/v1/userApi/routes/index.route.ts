import { Express } from 'express';
import { topicRoutes } from './topic.route';
import { questionRoutes } from './question.route';
import { userRoutes } from './user.route';
import { answerRoutes } from './answer.route';
import { usersRoutes } from './users.route';

const userApiRoute = (app: Express): void =>{
    const version: String = '/api/v1';
    app.use(version + '/topics', topicRoutes)
    app.use(version + '/questions', questionRoutes)
    app.use(version + '/user', userRoutes)
    app.use(version + '/answers', answerRoutes)
    app.use(version + '/users', usersRoutes)
}

export default userApiRoute;