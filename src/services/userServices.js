import bcrypt from "bcrypt";
import * as UserRepository from "../repositories/userRepository.js";

async function create({ name, email, password }) {
    const existingUserWithGivenEmail = await UserRepository.findUser(email);

    if (existingUserWithGivenEmail) {
        return null;
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    return UserRepository.create({ name, email, hashedPassword });
}

export { create };
