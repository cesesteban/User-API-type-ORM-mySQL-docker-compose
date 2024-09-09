import dotenv from 'dotenv';
import MysqlConfig from '../interfaces/config/IMySqlConfig';
import ServerConfig from '../interfaces/config/IServerConfig';
import JwtSecretConfig from '../interfaces/config/IJwtSecretConfig';
import IConfig from '../interfaces/config/IConfig';

dotenv.config();

const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASS = process.env.MYSQL_PASS;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_PORT = process.env.SERVER_PORT;
const JWT_SECRET_SECRET = process.env.JWT_SECRET_SECRET;
const JWT_SECRET_HEADER = process.env.JWT_SECRET_HEADER;
const JWT_SECRET_HEADERS = process.env.JWT_SECRET_HEADERS;
const JWT_SECRET_EXPIRES = process.env.JWT_SECRET_EXPIRES;
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH;

const MYSQL: MysqlConfig = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
};
const SERVER: ServerConfig = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
const JWT_SECRET: JwtSecretConfig = {
    secret: JWT_SECRET_SECRET,
    header: JWT_SECRET_HEADER,
    headers: JWT_SECRET_HEADERS,
    expires: JWT_SECRET_EXPIRES,
    refresh: JWT_SECRET_REFRESH
};

const config: IConfig = {
    mysql: MYSQL,
    server: SERVER,
    jwtSecret: JWT_SECRET
};

export default config;
