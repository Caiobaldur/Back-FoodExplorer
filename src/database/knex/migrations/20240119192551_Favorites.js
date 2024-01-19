exports.up = (knex) =>
  knex.schema.createTable("favorites", (table) => {
    table.increments("id").primary();
    table
      .integer("dish_id")
      .references("id")
      .inTable("dishes")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.datetime("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("favorites");
