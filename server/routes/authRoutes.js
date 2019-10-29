/* eslint-disable no-underscore-dangle */
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = mongoose.model('User')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body

  console.log(email, password, name)

  try {
    if (!email) throw new Error('Missing Email')
    if (!password) throw new Error('Missing Password')
    if (!name) throw new Error('Missing Name')

    const user = new User({ email, name, password })
    await user.save()

    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
    res.send({ token })
  } catch (err) {
    console.log(err)
    return res.status(422).send(err.message)
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' })
  }

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' })
  }

  try {
    await user.comparePassword(password)
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
    res.send({ token })
  } catch (err) {
    console.log(err)
    return res.status(422).send({ error: 'Invalid password or email' })
  }
})

module.exports = router
