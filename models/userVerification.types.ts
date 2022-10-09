import { Document } from 'mongoose'

interface IUserVerification {
    phoneNumber: string,
    country: string,
    nip: string,
    companyName: string,
}

export interface IUserVerificationModel extends IUserVerification, Document {}