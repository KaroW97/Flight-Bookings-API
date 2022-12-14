const { flightService } = require('../../services/index')
const { message } = require('../../utils/index')

exports.deleteFlight = async ({ body }, res) => {
  try {
    // Find and delete
    const flight = await flightService.deleteFlight(body)

    res.send(message.success(flight))
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}
