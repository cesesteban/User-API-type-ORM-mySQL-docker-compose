import JwtSecretConfig from './IJwtSecretConfig';
import MysqlConfig from './IMySqlConfig';
import ServerConfig from './IServerConfig';

export default interface IConfig {
    mysql: MysqlConfig;
    server: ServerConfig;
    jwtSecret: JwtSecretConfig;
}
