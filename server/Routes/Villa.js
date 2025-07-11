let express = require('express')

let router = express.Router()
let { getAllVillas, postVilla, deleteVilla, updateVilla } = require('../Controller/Villa.js')

router.get('/',getAllVillas)
router.post('/',postVilla)
 router.delete('/:id',deleteVilla)
router.patch("/:id",updateVilla)

module.exports = router