const router = require('express').Router()
const authRouter = require('./auth.route')
const checklistRouter = require('./checklist.routes')

router.use('/', authRouter)

router.use('/checklist', checklistRouter)

module.exports = router