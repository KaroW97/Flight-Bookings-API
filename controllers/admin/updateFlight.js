const message = require('../../utils/message')
const flightService = require('../../services/flight')

exports.updateFlight = async ({ body, user }, res) => {
  try {
    const flight = await flightService.getFlightById(body)

    await flightService.updateFlight(body, flight._id)

    const updatedFlight = await flightService.getFlightById(body)

    res.send(message.success(updatedFlight))
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}
