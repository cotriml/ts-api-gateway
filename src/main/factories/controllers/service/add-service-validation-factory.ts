import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddServiceValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['baseUrl', 'hostName', 'apiName', 'isActive']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
