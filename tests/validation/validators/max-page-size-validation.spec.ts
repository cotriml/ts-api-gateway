import { MaxPageSizeValidation } from '@/validation/validators'
import { GeneralError } from '@/presentation/errors'
import env from '@/main/config/env'
import faker from 'faker'

const field = faker.random.word()

const makesut = (): MaxPageSizeValidation => {
  return new MaxPageSizeValidation(field)
}

describe('MaxPageSizeValidation', () => {
  test('Should return an GeneralError if validation fails', () => {
    const sut = makesut()
    const error = sut.validate({
      [field]: faker.random.number({
        min: +env.maxPageSizePagination
      })
    })
    expect(error).toEqual(new GeneralError(`${field} must be less than 100`))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makesut()
    const value = faker.random.number({
      max: +env.maxPageSizePagination
    })
    const error = sut.validate({ [field]: value })
    expect(error).toBeFalsy()
  })
})
