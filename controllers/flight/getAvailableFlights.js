const message = require('../../utils/message')
const flightService = require('../../services/flight')

exports.getAvailableFlights = async (req, res) => {
  try {
    const flights = await flightService.getAvailableFlights()

    res.send(message.success(flights))
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}
