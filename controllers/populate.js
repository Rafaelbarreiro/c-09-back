const { populateUser } = require("./users");
const {populateCategories} = require("./categories")
const {populateCards} = require ("./cards")

const Users = require('../models/Users');

const populateDB = async (req, res) => {
    try {
      const count = await Users.find();
      if (count.length === 0) {
        await populateUser();
        await populateCategories();
        await populateCards()

        return res.status(200).send("Database populated");
      }
      res.status(200).send("Database already populated");
    } catch (error) {
      console.log('error')
      res.status(400).send(error.message);
    }
  }
  
  
  module.exports = { populateDB };