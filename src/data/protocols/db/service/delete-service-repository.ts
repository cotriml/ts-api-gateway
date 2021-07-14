export interface DeleteServiceRepository {
  delete: (serviceId: string) => Promise<DeleteServiceRepository.Result>
}

export namespace DeleteServiceRepository {
  export type Result = boolean
}
