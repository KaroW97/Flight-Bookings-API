exports.createUpdateQuery = (filter) => {
  const query = { filter: {}, update: {} }

  if (filter.$plain) query.filter = filter.$plain
  if (filter.$or) query.filter = { $or: filter.$or }
  if (filter.$and) query.filter = { $and: filter.$and }
  if (filter.$set) query.update = { $set: filter.$set }
  if (filter.$push) query.update = { $push: filter.$push }

  return query
}

exports.createInvalidCustomerResponse = (data, { vin, location }) =>
  data.map(({ rentingDriver }) => ({
    vin,
    location,
    driver: {
      firstName: rentingDriver.firstName,
      lastName: rentingDriver.lastName,
      licenseNumber: rentingDriver.licenseNumber,
      cardValidTill: rentingDriver.creditCard.validThrough
    }
  }))
