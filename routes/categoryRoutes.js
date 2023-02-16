const express = require("express");
const {getCategories, postCategories, deleteCategories} = require ("../controllers/categories")

const router = express.Router()


router
    .route('/')
    .get(getCategories)
    .post(postCategories)

router
    .route('/:id')
    .delete(deleteCategories)

module.exports = router;