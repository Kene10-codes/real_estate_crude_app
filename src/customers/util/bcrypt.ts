import * as bcrypt from 'bcryptjs'


export function encodePassword(password) {
    const SALT = bcrypt.genSalt(10)
    return bcrypt.hash(password, SALT)
}