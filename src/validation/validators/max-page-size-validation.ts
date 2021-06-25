import { GeneralError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import env from '@/main/config/env'

export class MaxPageSizeValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error {
    if (input[this.fieldName] && +input[this.fieldName] > +env.maxPageSizePagination) {
      return new GeneralError(`${this.fieldName} must be less than ${env.maxPageSizePagination}`)
    }
  }
}
