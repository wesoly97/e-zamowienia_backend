import bcrypt from 'bcryptjs'

export const encryptPassword = (password: string) => bcrypt.hashSync(password)
export const passwordCompare = (password: string, existingPassword: string) => bcrypt.compareSync(password, existingPassword)