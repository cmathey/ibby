import * as express from 'express';
import {Express, Request, Response} from 'express';
import * as winston from 'winston';
import {json} from 'body-parser';
import * as morgan from 'morgan';
import * as path from 'path';
import {Sequelize} from 'sequelize-typescript';
import {appConfig, AppConfig} from './config/config';
import {initModelRoutes} from './routes/modelRoutes';

const PORT: number = 3001;

/**
 * Root class of your node server.
 * Can be used for basic configurations, for instance starting up the server or registering middleware.
 */
export class Server {

    private app: Express;
    private db: Sequelize;

    constructor(config?: AppConfig) {
        if (!config) {
            config = appConfig;
        }
        this.app = express();
        this.app.use(json());
        this.app.use(morgan('combined'));
        winston.warn('DB: ', JSON.stringify(config.db, null, 2));
        this.db = new Sequelize(Object.assign({}, config.db, {
            modelPaths: [
                path.resolve(__dirname, 'models')
            ]
        }));
        this.setupRoutes();
        this.app.listen(PORT, () => {
            winston.log('info', '--> Server successfully started at port %d', PORT);
        });
    }

    /**
     * Setup all endpoints of your API. You can extend this method or if there are many different routes,
     * it might be better to move this to a separate class.
     */
    private setupRoutes(): void {
        initModelRoutes(this.app, this.db);
        this.app.get('/', (req: Request, res: Response) => {
            res.status(200).send('Server running ...');
        });
    }

}

export const server = new Server();
