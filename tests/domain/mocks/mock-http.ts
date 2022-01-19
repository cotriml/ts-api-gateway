import { CallServiceByHttp } from '@/domain/usecases'

export const mockCallServiceParams = (method: string = 'GET'): CallServiceByHttp.Params => ({
  uri: 'http://any-url.com',
  method: method,
  body: {},
  headers: {}
})
