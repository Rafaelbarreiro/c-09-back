const express = require("express");
const {getCards, getCardById, postCards, updateCards, deleteCards, PayCard} = require ("../controllers/cards")
const router = express.Router()

router
    .route('/')
    .get(getCards)
    .post(postCards)
    .put(updateCards)
router
    .route('/:id')
    .get(getCardById)
    .delete(deleteCards)
/* router.route('/:title')
    .put(updateCards)
 */
router
    .route('/buy/:id')
    .post(PayCard)

module.exports = router;