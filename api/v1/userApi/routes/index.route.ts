import { Express } from 'express';
import { topicRoutes } from './topic.route';

const userApiRoute = (app: Express): void =>{
    const version: String = '/api/v1';
    app.use(version + '/topics', topicRoutes)
}

export default userApiRoute;