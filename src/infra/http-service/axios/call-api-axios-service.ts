import {
  CallApiService
} from '@/data/protocols/http-service'

import axios from 'axios'

export class CallApiAxiosService implements CallApiService {
  async call (params: CallApiService.Params): Promise<CallApiService.Result> {
    switch (params.method) {
      case 'GET':
        return await axios.get(params.uri, params.headers)
      case 'POST':
        return await axios.post(params.uri, params.body, params.headers)
      case 'PUT':
        return await axios.put(params.uri, params.body, params.headers)
      case 'PATCH':
        return await axios.patch(params.uri, params.body, params.headers)
      case 'DELETE':
        return await axios.delete(params.uri)
      default:
        return null
    }
  }
}
