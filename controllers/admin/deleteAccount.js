const User = require("../../models/User")
const message = require("../../utils/message")

exports.deleteAccount = async ({ body }, res) => {
  try {
    const { id } = body

    const userDelete = await User.findOneAndDelete({ id })

    if (!userDelete)
      return res.send({ message: 'No user with given id was found' })

    res.send({
      message: 'User has been deleted',
      details: userDelete
    })
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}

