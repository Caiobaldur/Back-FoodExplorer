const AppError = require("../utils/AppError.js");

const sqliteConnection = require("../database/sqlite");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExist = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExist) {
      throw new AppError("Esse email já está em uso!");
    }

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    return response.status(201).json();
    // if (!name) {
    //   throw new AppError("Nome é obrigatório!");
    // }

    // response.json({ name, email, password });
  }
}

module.exports = UsersController;
