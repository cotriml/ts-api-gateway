import { adaptRoute } from '@/main/adapters'
import {
  makeHttpDeleteController,
  makeHttpGetController,
  makeHttpPatchController,
  makeHttpPostController,
  makeHttpPutController
} from '@/main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('(/*)?', adaptRoute(makeHttpGetController()))
  router.post('(/*)?', adaptRoute(makeHttpPostController()))
  router.put('(/*)?', adaptRoute(makeHttpPutController()))
  router.patch('(/*)?', adaptRoute(makeHttpPatchController()))
  router.delete('(/*)?', adaptRoute(makeHttpDeleteController()))
}
