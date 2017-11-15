import * as express from 'express';
import * as _ from 'lodash';
import {Sequelize} from 'sequelize-typescript';
import {API_PREFIX} from '../../../common/types';
import User from '../models/User';

const epilogue = require('epilogue');
const ForbiddenError = epilogue.Errors.ForbiddenError;

// It seeps we must wrap the traditional Express middlewares ...
function wrapMiddleware(middleware, ErrorClass, ...controllers: string[]) {
    if (_.isEmpty(controllers)) {
        controllers = ['create', 'read', 'list', 'update', 'delete'];
    }

    function next(err) {
        if (err) {
            throw new ErrorClass();
        }
    }

    return controllers.reduce((acc, controller) => {
        acc[controller] = {
            start(req, res, context) {
                middleware(req, res, next);
                if (res.statusCode == null) {
                    return context.continue;
                }
                return context.skip;
            }
        };
        return acc;
    }, {});
}

export function initModelRoutes(app: express.Application, db: Sequelize): void {
    const authMiddleware = {
        read: {
            start(req, __, context) {
                if (!req.session.authenticated) {
                    throw new ForbiddenError();
                }
                return context.continue;
            }
        },
        list: {
            start(req, __, context) {
                if (!req.session.authenticated) {
                    throw new ForbiddenError();
                }
                return context.continue;
            }
        }
    };
    epilogue.initialize({
        app: app,
        base: API_PREFIX,
        sequelize: db
    });

    // const entityResource = epilogue.resource({
    //   model: Entity,
    //   endpoints: ['/entity', '/entity/:id']
    // });
    // entityResource.use(wrapMiddleware(Policies.checkAuthenticated, ForbiddenError));
    // app.get(`${API_PREFIX}/entity-tree`, (req, res) => EntityController.tree(req, res));
    //
    // const accountResource = epilogue.resource({
    //   model: Account,
    //   endpoints: ['/account', '/account/:id']
    // });
    // accountResource.use(wrapMiddleware(Policies.checkAuthenticated, ForbiddenError));

    const userResource = epilogue.resource({
        model: User,
        endpoints: ['/user', '/user/:id']
    });
    // userResource.use(wrapMiddleware(Policies.checkAuthenticated, ForbiddenError));
    userResource.read.fetch.before((req, __, context) => {
        if (req.param('id') === 'me') {
            context.instance = req.user;
            return context.skip;
        }
        return context.continue;
    });

}
