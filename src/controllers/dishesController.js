const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController {
  async create(req, res) {
    const { name, description, image, price, category, ingredients } = req.body;
    
    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      image,
      price,
      category,
    });

    const insertIngredients = ingredients.map((name) => {
      return {
        dish_id,
        name,
      };
    });
    await knex("ingredients").insert(insertIngredients);

    return res
      .status(201)
      .json({ message: "O prato foi cadastrado com sucesso!" });
  }
}

module.exports = DishesController;
