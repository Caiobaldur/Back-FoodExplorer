exports.up = (knex) =>
  knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    table.integer("user_id").references("id").inTable("users");
    table.varchar("dishes_order").notNullable();
    table.text("status").notNullable();
    table.datetime("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("orders");
