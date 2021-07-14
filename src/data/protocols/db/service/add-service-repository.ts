import { AddService } from '@/domain/usecases';

export interface AddServiceRepository {
  add: (params: AddServiceRepository.Params) => Promise<AddServiceRepository.Result>
}

export namespace AddServiceRepository {
  export type Params = AddService.Params
  export type Result = AddService.Result
}
