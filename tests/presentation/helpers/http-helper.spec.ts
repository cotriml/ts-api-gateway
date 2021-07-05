import { serverError } from '@/presentation/helpers'

describe('serverError test', () => {
  test('Should return axios response', async () => {
    const axiosError = {
      message: 'an error',
      isAxiosError: true,
      response: {
        status: 400
      }
    }
    expect(serverError(axiosError).statusCode).toBe(400)
    expect(serverError(axiosError).body).toEqual({
      message: 'an error',
      isAxiosError: true,
      response: {
        status: 400
      }
    })
  })
})
