import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeDeleteServiceValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['serviceId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
