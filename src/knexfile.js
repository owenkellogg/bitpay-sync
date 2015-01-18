// Update with your config settings.

module.exports = {

  development: {
    client: process.env['DATABASE_DIALECT'],
    connection: {
      host     : process.env['DATABASE_HOST'],
      user     : process.env['DATABASE_USER'],
      password : process.env['DATABASE_PASSWORD'],
      database : process.env['DATABASE_NAME'],
      charset  : 'utf8'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
