import { makeAddServiceValidation } from '@/main/factories'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('AddServiceValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddServiceValidation()
    const validations: Validation[] = []
    for (const field of ['baseUrl', 'hostName', 'apiName', 'isActive']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
