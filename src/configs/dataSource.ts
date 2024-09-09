import { DataSource } from 'typeorm';
import { User } from '../entities/user/User';
import { UserRole } from '../entities/user/UserRole';
import { UserSession } from '../entities/user/UserSession';
import config from './config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const params = {
    user: config.mysql.user,
    password: config.mysql.pass,
    host: config.mysql.host,
    database: config.mysql.database
};
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: params.host,
    port: 3306,
    username: params.user,
    password: params.password,
    database: params.database,
    synchronize: true,
    timezone: 'Z', // UTC
    logging: false,
    entities: [User, UserRole, UserSession],
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy()
});
