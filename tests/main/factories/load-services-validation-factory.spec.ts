import { makeLoadServicesValidation } from '@/main/factories'
import { MaxPageSizeValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('LoadServicesValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoadServicesValidation()
    const validations: Validation[] = []
    validations.push(new MaxPageSizeValidation('pageSize'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
