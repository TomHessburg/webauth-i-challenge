
const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {username: "random_name_1", password: bcrypt.hashSync("jashdjashd", 4)},
    {username: "random_name_2", password: bcrypt.hashSync("asfasdfas", 4)},
    {username: "random_name_3", password: bcrypt.hashSync("asdcsad", 4)},
    {username: "random_name_4", password: bcrypt.hashSync("asdfascasd", 4)},
    {username: "random_name_5", password: bcrypt.hashSync("asdffasdcasd", 4)},
  ]);
};
