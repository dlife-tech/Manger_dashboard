let express = require('express')

let { GetAlllodge, postLodge, deletelodge, updatelodge } = require('../Controller/Lodge')

let router = express.Router()

router.get('/',GetAlllodge)
router.post('/',postLodge)
router.delete('/:id',deletelodge)
router.patch('/:id',updatelodge)

module.exports = router