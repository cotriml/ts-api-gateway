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
  router.get('(?!/test)(/*)?', adaptRoute(makeHttpGetController()))
  router.post('(?!/test)(/*)?', adaptRoute(makeHttpPostController()))
  router.put('(?!/test)(/*)?', adaptRoute(makeHttpPutController()))
  router.patch('(?!/test)(/*)?', adaptRoute(makeHttpPatchController()))
  router.delete('(?!/test)(/*)?', adaptRoute(makeHttpDeleteController()))
}
