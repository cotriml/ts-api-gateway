export interface DeleteUserRepository {
  delete: (userId: string) => Promise<DeleteUserRepository.Result>
}

export namespace DeleteUserRepository {
  export type Result = boolean
}
