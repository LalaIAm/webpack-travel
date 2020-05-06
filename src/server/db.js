const { Stitch, RemoteMongoClient } = require('mongodb-stitch-server-sdk');

const appId = process.env.MONGODB_APPID;

const stitch = Stitch.initializeDefaultAppClient(appId);

const mongo = stitch.getServiceClient(
  RemoteMongoClient.factory,
  'mongodb-atlas'
);

const trips = mongo.db('travels').collection('trips');
const users = mongo.db('travels').collection('users');

module.exports = { trips, users, stitch };
