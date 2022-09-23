const { message } = require('../../utils/index')
const { flightService } = require('../../services/index')

exports.getAllFlights = async (req, res) => {
  try {
    const flights = await flightService.getAllFlights()

    res.send(message.success(flights))
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}
