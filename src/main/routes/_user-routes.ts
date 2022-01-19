import { adaptRoute } from '@/main/adapters'
import { makeAddUserController, makeSigninController, makeLoadUsersController, makeDeleteUserController } from '@/main/factories'
import { adminAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/users', adminAuth, adaptRoute(makeAddUserController()))
  router.get('/users', adminAuth, adaptRoute(makeLoadUsersController()))
  router.delete('/users/:userId', adminAuth, adaptRoute(makeDeleteUserController()))
  router.post('/users/signin', adaptRoute(makeSigninController()))
}
