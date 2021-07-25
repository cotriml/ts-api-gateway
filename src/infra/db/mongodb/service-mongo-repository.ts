import { MongoHelper, QueryBuilder } from '@/infra/db'
import {
  AddServiceRepository,
  LoadServicesRepository,
  DeleteServiceRepository,
  CheckServiceByBaseUrlRepository
} from '@/data/protocols/db'
import env from '@/main/config/env'
import { PaginationModel } from '@/domain/models'

import { ObjectId } from 'mongodb'

const servicesColletionName = 'services'
const defaultPageSize = +env.defaultPageSizePagination
const defaultCurrentPage = +env.defaultCurrentPagePagination

export class ServiceMongoRepository implements AddServiceRepository, LoadServicesRepository, DeleteServiceRepository, CheckServiceByBaseUrlRepository {
  async add (params: AddServiceRepository.Params): Promise<AddServiceRepository.Result> {
    const serviceCollection = await MongoHelper.getCollection(servicesColletionName)
    const result = await serviceCollection.insertOne(params)
    return MongoHelper.map(result.ops[0])
  }

  async loadAll (filter?: LoadServicesRepository.Filter, pagination?: PaginationModel): Promise<LoadServicesRepository.Result> {
    const serviceCollection = await MongoHelper.getCollection(servicesColletionName)
    const { pageSize, currentPage } = pagination || {}
    const filterObj = {}
    for (const element in filter) {
      filterObj[`${element}`] = filter[`${element}`]
    }

    const totalRecords = await serviceCollection.countDocuments(filterObj)
    const query = new QueryBuilder()
      .match(filterObj)
      .skip((pageSize || defaultPageSize) * ((currentPage || defaultCurrentPage) - 1))
      .limit(pageSize || defaultPageSize)
      .group({
        _id: 0,
        data: {
          $push: '$$ROOT'
        },
        total: {
          $sum: 1
        }
      })
      .addFields({
        metadata: {
          totalRecords: totalRecords,
          totalFiltered: '$total',
          pageSize: pageSize || defaultPageSize,
          currentPage: currentPage || defaultCurrentPage
        }
      })
      .project({
        _id: 0,
        data: 1,
        metadata: 1
      })
      .build()
    let services = await serviceCollection.aggregate(query).toArray()
    if (services.length === 0) {
      services = [{
        data: [],
        metadata: {
          totalRecords: totalRecords,
          totalFiltered: 0,
          pageSize: pageSize || defaultPageSize,
          currentPage: currentPage || defaultCurrentPage
        }
      }]
    }
    services[0].data = MongoHelper.mapCollection(services[0].data)
    return services[0]
  }

  async delete (serviceId: string): Promise<DeleteServiceRepository.Result> {
    const serviceCollection = await MongoHelper.getCollection(servicesColletionName)
    const result = await serviceCollection.deleteOne({ _id: new ObjectId(serviceId) })
    return result.deletedCount === 1
  }

  async checkByBaseUrl (baseUrl: string): Promise<CheckServiceByBaseUrlRepository.Result> {
    const serviceCollection = await MongoHelper.getCollection(servicesColletionName)
    const result = await serviceCollection.findOne({
      baseUrl
    }, {
      projection: {
        _id: 1
      }
    })
    return result !== null
  }
}
