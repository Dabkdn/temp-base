import mongoose from 'mongoose';

export const swagger = {
    options: {
        info: {
            title: 'API Documentation',
            version: 'v1.0.0',
            contact: {
                name: 'EnableStartup',
                email: 'vuong.pham@enablestartup.io',
            },
        },
        grouping: 'tags',
        sortEndpoints: 'ordered',
    },
};

export const status = {
    options: {
        path: '/status',
        title: 'API Monitor',
        routeConfig: {
            auth: false,
        },
    },
};

const DATABASE_HOSTNAME = process.env.DATABASE_HOSTNAME;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;
export const databaseConnection = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOSTNAME}:${DATABASE_PORT}/${DATABASE_NAME}`;
export const connectDatabase = async () => {
    console.log(databaseConnection);
    await mongoose.connect(databaseConnection);
};

export const jwtConfig = {
    jwtAdminSecret: 'aU7h3GiHb2o8H!q!ndwSqYqh&K$LCeyI',
    ttlSec: 2592000, // 1 month
};
