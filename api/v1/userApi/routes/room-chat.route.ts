import { Router } from "express"
const router: Router = Router();

import * as controller from '../controllers/room-chat.controller'

router.get('/', controller.index)

router.get('/:id', controller.check)

export const roomChatRoutes: Router = router;