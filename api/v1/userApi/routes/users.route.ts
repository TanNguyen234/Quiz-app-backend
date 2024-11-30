import { Router } from "express"
const router: Router = Router();

import * as controller from '../controllers/users.controller'
import * as middleware from "../middlewares/auth.middleware";

router.get('/not-friend',  middleware.Auth, controller.index);

router.get('/inviteToFriend',  middleware.Auth, controller.invite);

export const usersRoutes: Router = router;