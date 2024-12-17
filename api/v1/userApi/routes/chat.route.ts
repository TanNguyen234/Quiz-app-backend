import { Router } from "express"
const router: Router = Router();

import * as controller from '../controllers/chat.controller'
import * as middleware from '../middlewares/chat.middleware'
import * as userMiddleware from '../middlewares/auth.middleware'

router.get('/:roomChatId', userMiddleware.Auth, middleware.isAccess, controller.index)

export const chatRoutes: Router = router;