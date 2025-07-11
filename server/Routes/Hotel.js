let express = require('express')

let router = express.Router()

let { AllHotel,  postHotel, deletehotel, updateHotel } = require('../Controller/Hotel.js')
router.get('/',AllHotel)
router.post('/',postHotel)
router.delete('/:id',deletehotel)
router.patch('/:id',updateHotel)

module. exports = router