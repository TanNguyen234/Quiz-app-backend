import { Router } from "express"
const router: Router = Router();

import * as controller from '../controllers/user.controller'
import * as validate from '../validates/user.validate'

router.post('/login', validate.login, controller.login)

// router.post('/login', controller.register)

export const userRoutes: Router = router;