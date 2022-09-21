const message = require('../../utils/message')
const flightService = require('../../services/flight')

exports.getAllFlights = async (req, res) => {
  try {
    const flights = await flightService.getAllFlights()

    res.send(message.success(flights))
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}
