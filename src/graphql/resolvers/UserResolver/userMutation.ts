import { MutationRegisterUserWithEmailArgs, Status } from "@generatedTypes";
import User from "../../../models/user";
import bcrypt from 'bcrypt'

export default {
    async registerUserWithEmail(_: void, data: MutationRegisterUserWithEmailArgs): Promise<Status> {
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
    },
}