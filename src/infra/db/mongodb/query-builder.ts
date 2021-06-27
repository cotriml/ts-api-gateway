export class QueryBuilder {
  private readonly query = []

  private addStep (step: string, data: any): QueryBuilder {
    this.query.push({
      [step]: data
    })
    return this
  }

  limit (data: number): QueryBuilder {
    return this.addStep('$limit', data)
  }

  skip (data: number): QueryBuilder {
    return this.addStep('$skip', data)
  }

  project (data: object): QueryBuilder {
    return this.addStep('$project', data)
  }

  group (data: object): QueryBuilder {
    return this.addStep('$group', data)
  }

  addFields (data: object): QueryBuilder {
    return this.addStep('$addFields', data)
  }

  build (): object[] {
    return this.query
  }
}
