const deleteUndefined = (data) => JSON.parse(JSON.stringify(data))

const creteCommonSchema = (type) => ({
  type,
  required: true
})

const setMinimalTime = (time = 0, data = undefined) => {
  if (data) {
    const newDate = new Date(data)

    newDate.setHours(newDate.getHours() + 2)

    return newDate
  }

  const date = new Date()

  date.setMinutes(date.getMinutes() + Math.abs(date.getTimezoneOffset()) + time)

  return date
}

const countTicketAmount = (ticket_prices) =>
  Object.values(ticket_prices).reduce((prev, { amount }) => prev + amount, 0)

/**
 * Creates details per flight
 * @param {Record<string, string | number>} param0
 * @returns {Record<string, string | number>}
 */
const createDetails = ({ rank, price, _id }, flightId) =>
  deleteUndefined({
    flightId,
    rank,
    amount: 1,
    price,
    AllTicketPrice: price,
    ticketIds: [_id]
  })

const sortString = (data) =>
  data.sort((first, sec) => (first.rank > sec.rank) - (first.rank < sec.rank))

module.exports = {
  creteCommonSchema,
  setMinimalTime,
  countTicketAmount,
  createDetails,
  sortString,
  deleteUndefined
}
