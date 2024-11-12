import { Router } from "express"
const router: Router = Router();

import * as controller from '../controllers/question.controller'

router.get('/:id', controller.index)

export const questionRoutes: Router = router;