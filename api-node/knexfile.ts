import API_CNF from './src/config/config';
import path from 'path';

module.exports = {
    development: {
        client: 'pg',
        connection: {
            database: API_CNF.API.getInstance().Database.Database,
            user: API_CNF.API.getInstance().Database.User,
            password: API_CNF.API.getInstance().Database.Password,
            port: API_CNF.API.getInstance().Database.Port
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: path.resolve(__dirname, 'db/migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, 'db/seeds')
        }
    },
    production: {
        client: 'pg',
        connection: {
            database: API_CNF.API.getInstance().Database.Database,
            user: API_CNF.API.getInstance().Database.User,
            password: API_CNF.API.getInstance().Database.Password,
            port: API_CNF.API.getInstance().Database.Port
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: path.resolve(__dirname, 'db/prod_migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, 'db/prod_seeds')
        }
    }
};

// staging: {
//   client: "postgresql",
//   connection: {
//     database: "my_db",
//     user: "username",
//     password: "password"
//   },
//   pool: {
//     min: 2,
//     max: 10
//   },
//   migrations: {
//     tableName: "knex_migrations"
//   }
// },

// production: {
//   client: "postgresql",
//   connection: {
//     database: "my_db",
//     user: "username",
//     password: "password"
//   },
//   pool: {
//     min: 2,
//     max: 10
//   },
//   migrations: {
//     tableName: "knex_migrations"
//   }
// }
