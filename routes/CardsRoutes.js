const express = require("express");
const {getCards, getCardById, postCards, updateCards, deleteCards} = require ("../controllers/cards")
const router = express.Router()

router
    .route('/')
    .get(getCards)
    .post(postCards)
    

router
    .route('/:id')
    .get(getCardById)
    .delete(deleteCards)
    .put(updateCards)

module.exports = router;