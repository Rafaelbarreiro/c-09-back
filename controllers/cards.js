const Cards = require ('../models/Cards')
const jsonAll = require ('../json/all.json');
const {mercadopago} = require('../utils/mercadoPago');

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
        ? res.status(200).json(cardByName[0])
        : res.status(404).json({message: "Card not found"});
    }
      else if(category){
        const cardByCategory = await Cards.find({ category: { $in: [`${category}`] } }, { projection })
        res.status(200).json(cardByCategory)
        
      }
      else if(autor){
        const byAutor = await Cards.find ({ autor: {$eq: `${autor}` }} );
        res.status(200).json(byAutor)
      } 
      else {
        allCards.length > 0
        ? res.status(200).json(allCards)
        : res.status(404).json({message: "No cards"})
      }
    
  } catch (error) {
    console.log(error.message)
  }
  next();
};

const getCardById = async (req, res) => {
  const {id} = req.params;
  const card = await Cards.findById(id, projection)
  res.status(200).json(card)
}

const updateCards = async (req, res) => { 
  const title = req.query.title
  const data = req.body
 //console.log(data)
  var allCards = await Cards.find({}, {projection});
  try {
    let cardByName = allCards.filter(e =>
      e.title.toLowerCase().includes(title.toLowerCase())
      );
      
      const forUpdateCards = await Cards.findByIdAndUpdate(
        {_id : cardByName[0]._id} , 
        data, {
        new: true
      })
      console.log(forUpdateCards)
     res.json(forUpdateCards)
  } catch (error) {
    console.log(err.message)
  }
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
/////////////////////mercado pago////////////////
const PayCard = async (req, res) => {
  const {id} = req.params
  const datos = req.body
  const card = await Cards.findById(id, projection)
 console.log(datos)
  let preference = {
    transaction_amount: parseInt(datos.amount*1.15), //sumo el 15% comision de ML
    items: [
      {
        id: card._id,
        title: card.title,
        unit_price: datos.amount,
        quantity: 1,
        payer:{
          email: datos.email,
          name: datos.nickname
        }
      },
    ],
    back_urls: {
      success: `${process.env.FRONT_URL}/ipayments/`,
      failure: `${process.env.FRONT_URL}/paymentsfail`,
      pending: `${process.env.FRONT_URL}/paymentspending`
    },
     auto_return: "approved" 
  };
  mercadopago.preferences
  .create(preference)
  .then(function (response) {
    // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
  //console.log(response)
  
    res.status(200).json(response.body.init_point);
  
  })
  .catch(function (error) {
    console.log(error.message);
  });
 }



module.exports = {
    populateCards,
    getCards,
    getCardById,
    postCards, 
    updateCards, 
    deleteCards,
    PayCard
}