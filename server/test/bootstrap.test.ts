import {Server} from '../src/server';
import * as update from 'immutability-helper';
import {appConfig, AppConfig} from '../src/config/config';
import * as sinon from 'sinon';

let checkAuthenticated: sinon.SinonSpy;
before(async function () {
    // Override app config: use test database with reset
    const config: AppConfig = update(appConfig,
        {
            db: {
                name: {$set: 'g2c-seq-test'},
                sync: {$set: {force: true, hooks: false}}
            }
        });
    // NOTE: the stub must be set before the middleware is used (before createApp)
    // Need to find a way to have tests that use the stub and others that do not use it.
    // checkAuthenticated = sinon.stub(Policies, 'checkAuthenticated').callsFake((req, res, next) => {
    //     return next();
    // });

    const server = new Server(config);
    // return createApp(config);
});

after(() => {
    // checkAuthenticated.restore();
});
