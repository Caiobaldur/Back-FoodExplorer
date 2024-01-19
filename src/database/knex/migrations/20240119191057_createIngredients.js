exports.up = (knex) =>
  knex.schema.createTable("ingredients", (table) => {
    table.increments("id").primary();
    table.string("name");
    table
      .integer("dish_id")
      .references("id")
      .inTable("dishes")
      .onDelete("CASCADE");
    table.string("image");

    table.datetime("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("ingredients");
