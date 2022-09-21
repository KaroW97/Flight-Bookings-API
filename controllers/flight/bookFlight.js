const message = require('../../utils/message')
const ticketService = require('../../services/ticket')
const flightService = require('../../services/flight')

const getRandomFlight = (flights) => Math.floor(Math.random() * flights.length)

const createDetails = (flight, tickets) => ({
  id: flight._id,
  departure_point: flight.departure_point,
  destination_point: flight.destination_point,
  start_date_time: flight.start_date_time,
  end_date_time: flight.end_date_time,
  tickets
})

exports.bookFlight = async ({ user: { _id }, body }, res) => {
  try {
    const { tickets } = body

    const flights = await flightService.getAvailableFlightsToBook(tickets)

    // Get random flight
    const randomIndex = getRandomFlight(flights)

    // Create ticket for each
    const newTickets = await ticketService.createNewTicket({
      tickets,
      flights,
      _id,
      randomIndex
    })

    await flightService.updateFlightAccessibility(tickets, flights[randomIndex])

    const details = createDetails(flights[randomIndex], newTickets)

    res.send(message.success(details))
  } catch (error) {
    res.send(message.error(error))
  }
}
