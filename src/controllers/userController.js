import connection from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userServices from "../services/userServices.js";

async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.sendStatus(400);
        }

        const newUser = await userServices.create({ name, email, password });

        if (!newUser) {
            return res.sendStatus(409);
        }
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function signIn(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await connection.query(
            `SELECT * FROM "users" WHERE "email"=$1`,
            [email]
        );

        if (
            !user.rows[0] ||
            !bcrypt.compareSync(password, user.rows[0].password)
        ) {
            return res.sendStatus(401);
        }

        const token = jwt.sign(
            {
                id: user.rows[0].id,
            },
            process.env.JWT_SECRET
        );

        res.send({
            token,
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export { signUp, signIn };
