let express = require('express')

let router = express.Router()
let { GetAllresort, postresort, deleteresort, updateResort } = require('../Controller/Resort.js')

router.get('/',GetAllresort)
router.post('/',postresort)
router.delete('/:id',deleteresort)
router.patch("/:id",updateResort)

module.exports = router