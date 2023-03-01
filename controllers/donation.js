const Donations = require ('../models/Donations')
const Cards = require ('../models/Cards')


const projection = { createdAt: 0, updatedAt: 0, __v: 0, avaliable: 0 }

const postDonation = async (req, res) => {
    const donation = new Donations(req.body)
    var allCards = await Cards.find({}, {projection});
    //console.log(donation)
    let cardByName = allCards.filter(e =>
      e.title.includes(donation.cardId)
      );
      //console.log(cardByName)
    try{
        const newDonation = await donation.save()
        
        const data = {
          parcialAmount : parseInt (donation.amount) + parseInt(cardByName[0].parcialAmount)
        } 
        //console.log(data)
        const forUpdateCards = await Cards.findByIdAndUpdate(
          {_id : cardByName[0]._id} , 
          data, {
          new: true
        })

        res.status(201).json(newDonation)
    }
    catch(error){
      console.log(error.message)
        res.status(404).json(error.message)
    }
}
const getDonations = async (req, res) => {
  //cardId es el titulo del proyecto
  //donor es el mail del user
  const {cardId, donor}  = req.query;
  var allDonations = await Donations.find({}, {projection})
  try {
    if(cardId){
      let donationByName = allDonations.filter(e =>
        e.cardId.includes(cardId)
        );
      donationByName.length > 0
      ? res.status(200).json(donationByName)
      : res.status(404).json({message: "don't hace donations in this project"})
    }
    else if(donor){
      const donationByDonor = allDonations.filter(e =>
        e.donor.includes(donor)
        );
      donationByDonor.length > 0
      ? res.status(200).json(donationByDonor)
      : res.status(404).json({message: "this user don't make any donation"}) 
    }
    else{
      allDonations.length > 0
      ? res.status(200).json(allDonations)
      : res.status(404).json({message: "No donations"})
    }
  } catch (error) {
    console.log(error.message)
  }
}
//hacer el get por id y todas


module.exports = {
    postDonation,
    getDonations
}