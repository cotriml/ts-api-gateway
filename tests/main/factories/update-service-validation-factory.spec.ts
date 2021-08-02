import { makeUpdateServiceValidation } from '@/main/factories'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('UpdateServiceValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateServiceValidation()
    const validations: Validation[] = []
    for (const field of ['serviceId']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
