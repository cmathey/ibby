import * as nconf from 'nconf';
import * as _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import * as sequelize from 'sequelize';
import {SequelizeConfig} from 'sequelize-typescript/lib/types/SequelizeConfig';

export interface AppConfig {
  db: SequelizeConfig & {
    sync: sequelize.SyncOptions;
  };
  auth: {
    admin: {
      userName: string;
      email: string;
      password: string;
    }
  };
}

function getConfiguration(type, currentEnvironment) {
  const config = nconf.stores[type];
  const defaults = config.get('defaults');
  const environmentOverrides = config.get(currentEnvironment);
  return _.extend(defaults, environmentOverrides);
}

function getLoadPaths(type, configDir) {
  // 'eg config/db.defaults.json'
  const defaults = path.join(configDir, type + '.json');
  // 'eg' ./db.json
  const overrides = path.join(process.cwd(), type + '.json');
  const loadPaths = [];
  if (fs.existsSync(defaults)) {
    loadPaths.push(defaults);
  }
  if (fs.existsSync(overrides)) {
    loadPaths.push(overrides);
  }
  return loadPaths;
}

export function loadConfiguration(type, configDir = __dirname) {
  nconf.add(type, {
    type: 'memory',
    loadFrom: getLoadPaths(type, configDir)
  });
  return getConfiguration(type, process.env.NODE_ENV || 'development');
}

const dbConfig = loadConfiguration('db');
const authConfig = loadConfiguration('auth');

export const appConfig: AppConfig = {
  db: dbConfig,
  auth: authConfig
};
