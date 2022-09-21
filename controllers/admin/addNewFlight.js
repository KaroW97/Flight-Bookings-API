const message = require('../../utils/message')
const flightService = require('../../services/flight')

exports.addNewFlight = async ({ body, user }, res) => {
  try {
    const flight = await flightService.createFlight(body)

    res.send(message.success(flight))
  } catch (error) {
    console.log(error)
    res.send(message.error(error))
  }
}
