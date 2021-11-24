import connection from "../database.js";

async function createEvent({ userId, value, type }) {
    return await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") 
        VALUES ($1, $2, $3)`,
        [userId, value, type]
    );
}

async function getEvents(userId) {
    const events = await connection.query(
        `SELECT * FROM "financialEvents" 
            WHERE "userId"=$1 ORDER BY "id" DESC`,
        [userId]
    );

    return events.rows;
}

export { createEvent, getEvents };
