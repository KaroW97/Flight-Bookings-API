const { flightService } = require('../../services/index')
const { message } = require('../../utils/index')

exports.addNewFlight = async ({ body, user }, res) => {
  try {
    const flight = await flightService.createFlight(body)

    res.send(message.success(flight))
  } catch (error) {
    res.send(message.error(error))
  }
}
