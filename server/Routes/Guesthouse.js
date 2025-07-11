let express = require('express')

let router = express.Router()

let { getAllGuestHouses,  postGuestHouse,deleteGuestHouse,  updateGuestHouse } = require('../Controller/Guesthouse.js')
router.get('/',getAllGuestHouses)
router.post('/',postGuestHouse)
router.delete('/:id',deleteGuestHouse)
 router.patch('/:id', updateGuestHouse)

module. exports = router