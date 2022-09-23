const { message } = require('../../utils/index')
const { flightService } = require('../../services/index')

exports.getAvailableFlights = async (req, res) => {
  try {
    const flights = await flightService.getAvailableFlights()

    res.send(message.success(flights))
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}
