const { message } = require('../../utils/index')
const { flightService } = require('../../services/index')

exports.getFlight = async ({ body }, res) => {
  try {
    const flight = await flightService.getFlightById(body)

    res.send(message.success(flight))
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}
