
import { MaxPageSizeValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeLoadUsersValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new MaxPageSizeValidation('pageSize'))

  return new ValidationComposite(validations)
}
