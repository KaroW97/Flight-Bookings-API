const message = require('../../utils/message')
const flightService = require('../../services/flight')

exports.deleteFlight = async ({ body }, res) => {
  try {
    // Find and delete
    const flight = await flightService.deleteFlight(body)

    res.send(message.success(flight))
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}
