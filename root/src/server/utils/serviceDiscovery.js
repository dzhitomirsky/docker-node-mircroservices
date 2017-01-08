"use strict";

const _ = require('lodash');
const CONSUL_HOST = process.env.CONSUL_HOST || 'consul';
const Promise = require('bluebird');
const retry = require('bluebird-retry');
const SERVICE_DISCOVERY_TIMEOUT = process.env.MYSQL_WAITING_TIMEOUT || 1000;
const SERVICE_DISCOVERY_RETRIES = process.env.MYSQL_RECONNECT_NUMBER || 3;
const SYSTEM_SERVICE_NAMES = ['consul', 'registrator', 'nginx', 'mysql']

const consul = require('consul')({
  promisify: true,
  host: CONSUL_HOST
});

const getServiceInfo = (serviceName) => {
  return () => {
    return consul.catalog.service.nodes(serviceName).catch((err) => {
      return new Promise((resolve, reject) => {
        console.log(
          `Failed to get '${serviceName}' info, waiting for ${SERVICE_DISCOVERY_TIMEOUT}ms, trying to reconnect`
        );
        reject(err);
      });
    })
  }
};

const getAvailableServiceNames = () => {
  return consul.catalog.service.list().then((result) => {
    let services = _.chain(result).keys().filter((serviceName) => {
      let result = true;
      _.each(SYSTEM_SERVICE_NAMES, (systemServiceName) => {
        if (_.startsWith(serviceName, systemServiceName)) {
          result = false;
        }
      });
      return result;
    }).value();
    return Promise.resolve(services);
  });
};

function discoverServiceAddress(serviceName) {
  console.log(`Trying to discover '${serviceName}' from consul...`);
  return retry(getServiceInfo(serviceName), {
    interval: SERVICE_DISCOVERY_TIMEOUT,
    max_tries: SERVICE_DISCOVERY_RETRIES
  }).then((serviceDiscoveryResult) => {
    let serviceInfo = _.chain(serviceDiscoveryResult).head().pick(['ServiceAddress', 'ServicePort']).value();
    console.log(`Service '${serviceName}' was successfully discovered:`);
    console.log(serviceInfo);
    return Promise.resolve(serviceInfo);
  }).catch((err) => {
    console.error(`Service '${serviceName}' wasn't discovered:`);
    console.error(err);
    return Promise.reject(err);
  })
}

module.exports = {
  discoverServiceAddress: discoverServiceAddress,
  getAvailableServiceNames: getAvailableServiceNames
};
