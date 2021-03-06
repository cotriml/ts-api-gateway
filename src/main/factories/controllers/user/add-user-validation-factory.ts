
import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidatorAdapter } from '@/infra/validators'

export const makeAddUserValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'role', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
