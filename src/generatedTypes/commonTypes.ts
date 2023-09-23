import { Request, Response } from 'express'

export interface ExpressType {
    req: Request,
    res: Response
}

export type MutationChangeUserPasswordArgs = {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
};
