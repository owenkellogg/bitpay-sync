'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('invoices', function(t) {
    t.string('id').unique();
    t.string('state');
    t.string('url');
    t.string('data');
    t.decimal('amount');
    t.datetime('createdAt');
    t.datetime('updatedAt');
    t.boolean('paid');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('invoices');
};

