import { adaptRoute } from '@/main/adapters'
import { makeHttpGetController } from '@/main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('(/*)?', adaptRoute(makeHttpGetController()))
}
