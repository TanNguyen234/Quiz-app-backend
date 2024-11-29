import { Router } from "express"
const router: Router = Router();

import * as controller from '../controllers/users.controller'
import * as middleware from "../middlewares/auth.middleware";

router.get('/not-friend',  middleware.Auth, controller.index);

router.get('/acceptFiend',  middleware.Auth, controller.accept);

router.get('/requestFiend',  middleware.Auth, controller.request);

export const usersRoutes: Router = router;