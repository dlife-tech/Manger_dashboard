let express = require('express')

let router = express.Router()

let { getAllHouseboats,createHouseboat, deleteHouseboat,  updateHouseboat, } = require('../Controller/Houseboat.js')
router.get('/',getAllHouseboats)
router.post('/',createHouseboat)
router.delete('/:id',deleteHouseboat)
router.patch('/:id',updateHouseboat)

module. exports = router