import { User } from "./models/User";

export const createUser = async({username, name, email, password}) => {
    const user = await User.create({
        username,
        name,
        email,
        password,
    }).catch((dbError) => console.error(dbError.messge));
    return user;
};

export const findUser = async (username) => {
    const userFound = await User.find({ username }).catch((dbError) => console.error(dbError.messge));
    return userFound[0];
}

export const findUsers = async (name) => {
    return await User.find({ name }).sort({ name: 1 }).catch(( dbError) => console.error(dbError.message));
}