import { DbLoadServices } from '@/data/usecases'
import { throwError } from '@/tests/domain/mocks'
import { LoadServicesRepositorySpy } from '@/tests/data/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadServices
  loadServicesRepositorySpy: LoadServicesRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadServicesRepositorySpy = new LoadServicesRepositorySpy()
  const sut = new DbLoadServices(loadServicesRepositorySpy)
  return {
    sut,
    loadServicesRepositorySpy
  }
}

describe('DbLoadServices', () => {
  test('Should call LoadServicesRepository', async () => {
    const { sut, loadServicesRepositorySpy } = makeSut()
    await sut.loadAll()
    expect(loadServicesRepositorySpy.count).toBe(1)
  })

  test('Should call LoadServicesRepository with correct filter parameter', async () => {
    const { sut, loadServicesRepositorySpy } = makeSut()
    const filter = { apiName: faker.random.word() }
    await sut.loadAll(filter)
    expect(loadServicesRepositorySpy.count).toBe(1)
    expect(loadServicesRepositorySpy.filter).toEqual(filter)
  })

  test('Should return a list of Services on success', async () => {
    const { sut, loadServicesRepositorySpy } = makeSut()
    const services = await sut.loadAll()
    expect(services).toEqual(loadServicesRepositorySpy.result)
  })

  test('Should call LoadServicesRepository with pagination', async () => {
    const { sut, loadServicesRepositorySpy } = makeSut()
    const pagination = { pageSize: 1, currentPage: 1 }
    await sut.loadAll(null, pagination)
    expect(pagination).toEqual(loadServicesRepositorySpy.pagination)
  })

  test('Should throw if LoadServicesRepository throws', async () => {
    const { sut, loadServicesRepositorySpy } = makeSut()
    jest.spyOn(loadServicesRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })
})
