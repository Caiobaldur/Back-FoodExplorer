const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController {
  async create(req, res) {
    const { name, description, image, price, category, ingredients } = req.body;
    const {user_id} = req.params;
    
    const [dishes_id] = await knex("dishes").insert({
      name,
      description,
      image,
      price,
      category,
      user_id
    });

    const insertIngredients = ingredients.map((name) => {
      return {
        dishes_id,
        name,
        user_id
      };
    });
    await knex("ingredients").insert(insertIngredients);

    return res
      .status(201)
      .json({ message: "O prato foi cadastrado com sucesso!" });
  }

  async show(req, res){
    const  { id } = req.params;
    console.log(id);
    const dishes = await knex("dishes").where({id}).first();
    const ingredients = await knex("ingredients").where({ dishes_id: id }).orderBy("name");

    return res.json({...dishes, ingredients})
  }

  async delete (req, res) {
    const { id } = req.params;

    await knex("dishes").where({id}).delete()

    return res.json();
  }
}

module.exports = DishesController;
