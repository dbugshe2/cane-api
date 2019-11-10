const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/user')

router.get('/:usersId', (req,res, next) => {
  res.status(200).json({
    message: 'seen a user'
  })
})

router.patch('/:usersId', (req,res, next) => {
  res.status(200).json({
    message: 'edit a user'
  })
})

module.exports = router