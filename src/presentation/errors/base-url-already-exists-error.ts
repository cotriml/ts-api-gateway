export class BaseUrlAlreadyExistsError extends Error {
  constructor () {
    super('The received BaseUrl already exists')
    this.name = 'BaseUrlAlreadyExistsError'
  }
}
