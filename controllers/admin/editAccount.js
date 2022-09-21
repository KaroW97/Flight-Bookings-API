const User = require('../../models/User')
const { hashPassword } = require('../../services/hash')
const message = require('../../utils/message')
const { updateUser } = require('../../services/mongo/queryUtils')

exports.editAccount = async ({ body }, res) => {
  try {
    const { name, phone, email, password, id } = body || {}

    const data = body

    if (!name && !phone && !email && !password)
      throw new Error('No data to update')

    const userToUpdate = await User.findById(id)

    if (body.password) {
      data.password = await hashPassword(body, userToUpdate)
    }

    const { update } = updateUser({ data })

    const userUpdate = await userToUpdate.updateOne(update)

    if (!userUpdate) throw new Error('No user with given id was found')

    res.send(message.success({ ...userToUpdate._doc, ...data }))
  } catch (error) {
    if (error.codeName === 'DuplicateKey') {
      res.status(400).json({ error: new Error('Duplication') })
    }

    res.json(message.error(error))
  }
}
