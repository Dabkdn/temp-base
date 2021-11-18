const moment = require('moment');
const mongoose = require('mongoose');
const { exit } = require('process');
const uuid = require('uuid');

const connectionString = 'mongodb://tracespace:password@127.0.0.1:27017/admin';
mongoose.connect(connectionString);

const RoleSchema = new mongoose.Schema({
    id: String,
    name: String,
    created_at: Date,
});

const UserSchema = new mongoose.Schema({
    id: String,
    role_id: String,
    username: String,
    password: String,
    email: String,
    reset_password_token: String,
    blocked: Boolean,
    created_at: Date,
});

const RoleModel = mongoose.model('roles', RoleSchema);
const UserModel = mongoose.model('users', UserSchema);

const seed = async () => {
    const role = await RoleModel.findOne();
    if (role) {
        await RoleModel.collection.drop();
    }
    const user = await UserModel.findOne();
    if (user) {
        await UserModel.collection.drop();
    }

    await RoleModel.insertMany([
        {
            id: 'b064e153-b9b5-494c-8279-122126e49816',
            name: 'admin',
            created_at: moment.now(),
        },
    ]);
    console.log('Done seeding roles');

    await UserModel.insertMany([
        {
            id: uuid.v4(),
            role_id: 'b064e153-b9b5-494c-8279-122126e49816',
            username: 'tracespace',
            password:
                '$2a$12$btoDt79UeARTa1Ef1rre1.nAYfKyWTr.QtjAEaxsb.MXgZdlg1lBC',
            email: 'tracespace.admin@gmail.com',
            reset_password_token: null,
            blocked: 0,
            created_at: moment.now(),
        },
    ]);
    console.log('Done seeding users');

    exit();
};

seed();
