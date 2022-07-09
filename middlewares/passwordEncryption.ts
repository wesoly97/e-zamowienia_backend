import bcrypt from 'bcryptjs'

export const encryptPassword = (password: string) => bcrypt.hashSync(password)