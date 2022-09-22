const queries = {
  GTE: (data) => ({ $gte: data }),
  LTE: (data) => ({ $lte: data }),
  IN: (data) => ({ $in: data }),
  PAIR: (name, data) => ({ $inc: { [name]: data } })
}

class MongoQuery {
  constructor() {
    this.orQuery = []
    this.andQuery = []
    this.setQuery = []
    this.pushQuery = []
    this.plainQuery = []
    this.tempArray = []
    this.pullQuery = []
  }

  createPairedObject([firstArg, secArg]) {
    this.tempArray.push(queries.PAIR(firstArg, secArg.size))

    return this.tempArray.reduce(
      (prev, curr) => ({
        ...prev,
        ...curr.$inc
      }),
      {}
    )
  }

  constructQuery(data, queryType) {
    const [firstArg, secArg] = data
    let query = {}

    if (secArg && secArg.operationType === 'PAIR') {
      const paired = this.createPairedObject(data)

      if (secArg.final) queryType.push({ $inc: paired })
    } else {
      query[firstArg] = secArg
      queryType.push(query)
    }
  }

  checkIfOneElement(queryType, type = undefined) {
    if (queryType.length > 1 && type !== 'SET') return queryType

    if (queryType.length > 1) {
      return queryType.reduce((prev, curr) => {
        const [key, value] = Object.entries(curr)[0]
        return {
          ...prev,
          [key]: value
        }
      })
    }

    return queryType[0]
  }

  clear() {
    this.andQuery = []
    this.setQuery = []
    this.pushQuery = []
    this.orQuery = []
    this.plainQuery = []
    this.tempArray = []
    this.pullQuery = []
  }

  queryOr(data) {
    this.constructQuery(data, this.orQuery)
    return this
  }

  queryAnd(data) {
    this.constructQuery(data, this.andQuery)
    return this
  }

  querySet(data) {
    this.constructQuery(data, this.setQuery)
    return this
  }

  queryPull(data) {
    this.constructQuery(data, this.pullQuery)
    return this
  }

  queryPush(data) {
    this.constructQuery(data, this.pushQuery)
    return this
  }

  queryPlain(data) {
    this.constructQuery(data, this.plainQuery)
    return this
  }

  build() {
    let filters = {}

    if (this.orQuery.length) filters.$or = this.checkIfOneElement(this.orQuery)
    if (this.andQuery.length)
      filters.$and = this.checkIfOneElement(this.andQuery)
    if (this.setQuery.length)
      filters.$set = this.checkIfOneElement(this.setQuery, 'SET')
    if (this.pullQuery.length)
      filters.$pull = this.checkIfOneElement(this.pullQuery)
    if (this.pushQuery.length)
      filters.$push = this.checkIfOneElement(this.pushQuery)
    if (this.plainQuery.length)
      filters.$plain = this.checkIfOneElement(this.plainQuery)

    this.clear()

    return filters
  }
}

module.exports = {
  queries,
  MongoQuery
}
