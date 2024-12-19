import { Router } from "express"
const router: Router = Router();

import * as controller from '../controllers/answer.controller'
import * as validate from '../validates/answer.validate'
import * as middleware from '../middlewares/auth.middleware'

router.post('/submit', validate.answer, controller.index)
router.get('/result',  middleware.Auth, controller.result)

export const answerRoutes: Router = router;