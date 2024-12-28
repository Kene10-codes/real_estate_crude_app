import * as bcrypt from 'bcryptjs'


export function encodePassword(password: string) {
    const SALT = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, SALT)
}

export function checkPassword(password: string, hashPassword: string) {
    if (!password || !hashPassword) {
        throw new Error('Password and hashPassword must be provided');
    }
    return bcrypt.compare(password, hashPassword);
}