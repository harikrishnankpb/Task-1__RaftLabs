import { UserData } from "@generatedTypes";
import { redisClient } from "../../../utilities/redis";
import User from "../../../models/user"

export const getUserDataFromRedis = async (email: string): Promise<UserData | null> => {
    const key = `user:${email}`;
    let data = await redisClient.get(key);
    if (!data) {
        console.log("Miss")
        const user: UserData | null = await User.findOne({ email }).select('-password').lean();
        if (!user) return null;
        redisClient.set(key, JSON.stringify(user), {
            EX: 3600,
            NX: true
        });
        return user
    }
    else {
        console.log("Hit")
        data = JSON.parse(data);
        return data;
    }
}
