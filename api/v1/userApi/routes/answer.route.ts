import { Router } from "express"
const router: Router = Router();

import * as controller from '../controllers/answer.controller'
import * as validate from '../validates/answer.validate'

router.post('/submit', validate.answer, controller.index)
router.post('/check', controller.index)

export const answerRoutes: Router = router;