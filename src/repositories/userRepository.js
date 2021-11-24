import connection from "../database.js";

async function findUser(email) {
    const user = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
    );
    return user.rows[0];
}

async function create({ name, email, hashedPassword }) {
    return await connection.query(
        `INSERT INTO "users" ("name", "email", "password") 
            VALUES ($1, $2, $3)
            RETURNING *`,
        [name, email, hashedPassword]
    );
}

export { findUser, create };
