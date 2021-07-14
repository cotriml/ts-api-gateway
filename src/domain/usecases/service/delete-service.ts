export interface DeleteService {
  delete: (serviceId: string) => Promise<DeleteService.Result>
}

export namespace DeleteService {
  export type Result = boolean
}
