let express = require('express')

let { getAllHomestays,
  postHomestay,
  deleteHomestay,
  updateHomestay, } = require('../Controller/Homestay.js')

let router = express.Router()

router.get('/',getAllHomestays)
router.post('/',postHomestay)
router.delete('/:id',deleteHomestay)
router.patch('/:id',updateHomestay)

module.exports = router