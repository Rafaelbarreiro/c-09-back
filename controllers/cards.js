const Cards = require ('../models/Cards')
const jsonAll = require ('../json/all.json')

const populateCards = async () => {
    for (p of jsonAll){
       const card = new Cards(p)
       await card.save()
    }
  };

const projection = { createdAt: 0, updatedAt: 0, __v: 0, avaliable: 0 }

const getCards = async (req, res, next) => {
  const {title, category, autor} = req.query;
  var allCards = await Cards.find({}, {projection});

  try {
    if(title){
      let cardByName = await allCards.filter(e =>
        e.title.toLowerCase().includes(title.toLowerCase())
        );
        cardByName.length > 0
        ? res.json (cardByName)
        : res.status(404).json({message: "Card not found"});
    }else{
      if(category){
        const cardByCategory = await Cards.find({ category: { $in: [`${category}`] } }, { projection })
        res.status(200).json(cardByCategory)
      }if(autor){
        const byAutor = await Cards.find ({ autor: {$eq: `${autor}` }} );
        res.status(200).json(byAutor)
      } else{
        allCards.length > 0
        ? res.status(200).json(allCards)
        : res.status(404).json({message: "No cards"})
      }
    }
  } catch (error) {
    next(error)
  }
  next();
};

const getCardById = async (req, res) => {
  const {id} = req.params;
  const card = await Cards.findById(id, projection)
  res.status(200).json(card)
}

const updateCards = async (req, res) => { 
  const id = req.params.id
  const info = req.body

  const allCards = await Cards.findByIdAndUpdate(id, info, {
    returnOriginal: false
  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Card with id=${id}. Maybe the Card was not found!`
        });
      } else {
        res.send({
          message: "Card was updated successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not update Card with id=" + id
      })
    })
}

const deleteCards = async (req, res) => {
  const id = req.params.id
  const info = {"status": "deleted"}

  const allCards = await Cards.findByIdAndUpdate(id, info, {
    returnOriginal: false
  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Card with id=${id}. Maybe the Card was not found!`
        });
      } else {
        res.send({
          message: "Card was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Card with id=" + id
      })
    })

}

const postCards = async (req, res) => {
  const card = new Cards(req.body)
  try{
    const newCard = await card.save()
    res.status(201).json(newCard)
  }
  catch (error){
    console.log(error.message)
    res.status(404).json(error.message)
  }
}



module.exports = {
    populateCards,
    getCards,
    getCardById,
    postCards, 
    updateCards, 
    deleteCards
}