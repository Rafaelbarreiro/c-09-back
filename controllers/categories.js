const Categories = require ('../models/Categories')
const jsonCategories = require ('../json/category.json')

const populateCategories = async () => {
    for (p of jsonCategories){
       const category = new Categories(p)
       await category.save()
    }
};

const getCategories = async (req, res) =>{
  try {
    const allCategories = await Categories.find();
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(400).json(error.message)
  }
}

const postCategories = async (req,res) => {
  const category = new Categories(req.body)
  try{
    const newCategory = await category.save()
    res.status(201).json(newCategory)
  }
  catch (error){
    res.status(404).json(error.message)
  }
}

const deleteCategories = async (req, res) => {
  const id = req.params.id
 
  const allCategories = await Categories.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Category with id=${id}. Maybe the Category was not found!`
        });
      } else {
        res.send({
          message: "Category was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id
      })
    })

}

module.exports = {
    populateCategories,
    getCategories,
    postCategories,
    deleteCategories
}