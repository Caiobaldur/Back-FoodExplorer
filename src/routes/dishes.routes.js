const { Router } = require("express");
const DishesController = require("../controllers/dishesController");


const dishesRoutes = Router();

// function myMiddleware(request, response, next){
//   if(!request.body.isAdmin){
//     return response.json({message: "Usuário não autorizado!"})
//   }

//   next();
// }

const dishesController = new DishesController();

// usersRoutes.post("/", myMiddleware, usersController.create);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/:user_id", dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);

module.exports = dishesRoutes;
