const { getChecklists, addChecklist, deleteChecklist } = require('../controller/checklist.controller')
const { getItems, getItemById, updateStatusItem, deleteItem, updateNameItem, addItem } = require('../controller/item.controller')
const { authMiddleware } = require('../middleware/auth.middleware')

const router = require('express').Router()
/**
 * checklist
 */

router.use(authMiddleware)

router.get('/', getChecklists)

router.post('/', addChecklist)

router.delete('/:checklistId', deleteChecklist)

/**
 * Item
 */
router.get('/:checklistId/item', getItems)

router.post('/:checklistId/item', addItem)

router.get('/:checklistId/item/:checklistItemId', getItemById)

router.put('/:checklistId/item/:checklistItemId', updateStatusItem)

router.delete('/:checklistId/item/:checklistItemId', deleteItem)

router.put('/:checklistId/item/rename/:checklistItemId', updateNameItem)

module.exports = router
