exports.generateQuery = (filter) => {
  const query = { filter: {}, update: {} }

  if (filter.$plain) query.filter = filter.$plain
  if (filter.$pull) query.update = { $pull: filter.$pull }
  if (filter.$or) query.filter = { $or: filter.$or }
  if (filter.$and) query.filter = { $and: filter.$and }
  if (filter.$set) query.update = { $set: filter.$set }
  if (filter.$push) query.update = { $push: filter.$push }

  return query
}
