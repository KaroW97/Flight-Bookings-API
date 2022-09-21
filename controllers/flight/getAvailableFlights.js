const Flight = require('../../models/Flight')
const message = require('../../utils/message')
const queries = require('../../services/mongo/queryUtils')

exports.getAvailableFlights = async (req, res) => {
  try {
    const query = queries.getAvailableFlights()

    const flights = await Flight.find(query)

    res.send(message.success(flights))
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}
