import { MutationCreateAdminArgs, MutationRegisterUserWithEmailArgs, Status } from "@generatedTypes";
import User from "../../../models/user";
import bcrypt from 'bcrypt'

export default {
    async registerUserWithEmail(_: void, data: MutationRegisterUserWithEmailArgs): Promise<Status> {
        try {
            let email = data.email;
            let exist = await User.exists({ email })
            if (exist)
                return {
                    success: false,
                    msg: 'Email already been taken'
                }
            let userData: any = data
            userData.role = 1;
            userData.password = await bcrypt.hash(data.password, 10);
            let newUser = await new User(userData).save()
            return {
                success: true,
                msg: "User registered successfully"
            }
        } catch (error) {
            console.log("Error:", error);
            return {
                success: false,
                msg: "Something went wrong"
            }
        }
    },
    async createAdmin(_: void, data: MutationCreateAdminArgs): Promise<Status> {
        try {
            let email = data.email;
            if (!process.env.ADMIN_SECRET_KEY || data.secretKey != process.env.ADMIN_SECRET_KEY) return ({
                success: false,
                msg: "Invalid secret key"
            })
            let exist = await User.exists({ email })
            if (exist)
                return {
                    success: false,
                    msg: 'Email already been taken'
                }
            let userData: any = data
            userData.role = 2;
            userData.password = await bcrypt.hash(data.password, 10);
            let newUser = await new User(userData).save()
            return {
                success: true,
                msg: "User registered successfully"
            }
        } catch (error) {
            console.log("Error:", error);
            return {
                success: false,
                msg: "Something went wrong"
            }
        }
    },
}