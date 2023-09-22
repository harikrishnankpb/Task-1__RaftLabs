import { QueryLoginUserWithEmailArgs, TokenResponse } from "@generatedTypes";
import User from "../../../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

interface UserData {
    _id: string;
    name: string;
    email: string;
    role: string;
    password: string;
}

export default {
    async loginUserWithEmail(_: void, data: QueryLoginUserWithEmailArgs): Promise<TokenResponse> {
        try {
            let dbUser: UserData | null = await User.findOne({ email: data.email })
            if (!dbUser)
                return {
                    success: false,
                    msg: "Invalid email or password"
                }
            console.log(dbUser)
            if (!await bcrypt.compare(data.password, (dbUser.password || '')))
                return {
                    success: false,
                    msg: "Invalid email or password"
                }
            let maxExp = '10d'
            let token = jwt.sign({ _id: dbUser._id, logged: 'email', email: dbUser.email, role: dbUser.role }, process.env.JWT_SECRET || '', { expiresIn: maxExp })
            return {
                success: true,
                token,
            }
        } catch (error) {
            console.log("Error:", error);
            return {
                success: false,
                msg: "Something went wrong"
            }
        }
    }
}