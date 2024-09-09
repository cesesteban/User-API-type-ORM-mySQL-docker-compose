import http, { Server } from 'http';
import { NAMESPACE_API_SERVER, SERVER_RUNNING_MESSAGE } from './commons/statics';
import logging from './configs/logging';
import config from './configs/config';
import router from './server';

const httpServer: Server = http.createServer(router());

httpServer.listen(config.server.port, () => logging.info(NAMESPACE_API_SERVER, `${SERVER_RUNNING_MESSAGE} ${config.server.port}`));
