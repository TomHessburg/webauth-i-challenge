
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments();

        tbl
          .string('username', 280)
          .notNullable();

        tbl
          .string('password', 280)
          .notNullable();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema
            .dropTableIfExists('users');
};
