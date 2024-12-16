import { Router } from "express"
const router: Router = Router();

import * as controller from '../controllers/room-chat.controller'

router.get('/', controller.index)

export const roomChatRoutes: Router = router;