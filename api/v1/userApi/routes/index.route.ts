import { Express } from 'express';
import { topicRoutes } from './topic.route';
import { questionRoutes } from './question.route';
import { userRoutes } from './user.route';

const userApiRoute = (app: Express): void =>{
    const version: String = '/api/v1';
    app.use(version + '/topics', topicRoutes)
    app.use(version + '/questions', questionRoutes)
    app.use(version + '/user', userRoutes)
}

export default userApiRoute;