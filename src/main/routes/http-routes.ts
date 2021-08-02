import { adaptHttpRoute } from '@/main/adapters'
import {
  makeHttpDeleteController,
  makeHttpGetController,
  makeHttpPatchController,
  makeHttpPostController,
  makeHttpPutController
} from '@/main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('(?!/test)(/*)?', adaptHttpRoute(makeHttpGetController()))
  router.post('(?!/test)(/*)?', adaptHttpRoute(makeHttpPostController()))
  router.put('(?!/test)(/*)?', adaptHttpRoute(makeHttpPutController()))
  router.patch('(?!/test)(/*)?', adaptHttpRoute(makeHttpPatchController()))
  router.delete('(?!/test)(/*)?', adaptHttpRoute(makeHttpDeleteController()))
}
