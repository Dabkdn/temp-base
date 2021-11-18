import * as bcrypt from 'bcryptjs';
var crypto = require('crypto');

const bcryptSalt = 10;

const salt = bcrypt.genSaltSync(bcryptSalt);

export const createHash = (password: string) => {
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

export const comparePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
};

export const createResetPasswordToken = () => {
    var str = crypto.randomBytes(64).toString('hex');
    return str;
};
