import * as bcrypt from 'bcryptjs'


export function encodePassword(password: string) {
    const SALT = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, SALT)
}

export async function checkPassword(password: string, hashPassword: string) {
   return await bcrypt.compareSync(password, hashPassword)
}