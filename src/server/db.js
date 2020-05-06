const { Stitch, RemoteMongoClient } = require('mongodb-stitch-server-sdk');

const appId = process.env.MONGODB_APPID;

const stitch = Stitch.initializeDefaultAppClient(appId);

const mongo = stitch.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");

const trips = mongo.db("travel").collection('trips')

module.exports = { trips, stitch }
