import { Router } from "express"
const multer = require('multer')
const router: Router = Router();

import * as controller from '../controllers/user.controller'
import * as validate from '../validates/user.validate'
import * as middleware from "../middlewares/auth.middleware";

const upload = multer();

router.post('/password/otp', controller.otp)

router.post('/password/checkOTP', controller.checkOTP)

router.patch('/password/change', controller.change)

router.get('/detail', middleware.Auth, controller.detail)

router.post('/login', validate.login, controller.login)

router.post('/register', validate.register, controller.register)

router.get('/logout', middleware.Auth, controller.logout)

router.post('/changeInfo', upload.single('avatar'), middleware.Auth, controller.changeInfo)

export const userRoutes: Router = router;