const Ticket = require('../../models/Ticket')
const User = require('../../models/User')
const message = require('../../utils/message')

exports.deleteAccount = async ({ body }, res) => {
  try {
    const { id } = body

    await Ticket.find({ user: id })

    const userDelete = await User.findByIdAndDelete(id)

    if (!userDelete)
      return res.send({ message: 'No user with given id was found' })

    res.send(message.success(userDelete))
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}
