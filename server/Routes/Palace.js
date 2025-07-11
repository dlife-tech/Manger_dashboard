let express = require('express')

let router = express.Router()
let {  GetAllPalace,postPalace, deletePalace,updatePalace,  } = require('../Controller/Palace.js')

router.get('/', GetAllPalace)
router.post('/',postPalace)
router.delete('/:id',deletePalace)
router.patch("/:id",updatePalace)

module.exports = router