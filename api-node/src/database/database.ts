import API_CNF from '../config/config';
import knex from 'knex';

const initknex = knex({
    client: 'pg',
    version: '13',
    connection: {
        host: API_CNF.API.getInstance().Database.Host,
        port: API_CNF.API.getInstance().Database.Port,
        user: API_CNF.API.getInstance().Database.User,
        password: API_CNF.API.getInstance().Database.Password,
        database: API_CNF.API.getInstance().Database.Database
    }
});

export default initknex;
