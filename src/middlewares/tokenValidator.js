import jwt from "jsonwebtoken";

export default async function auth(req, res, next) {
    const authorization = req.headers.authorization || "";
    const token = authorization.split("Bearer ")[1];

    if (!token) {
        return res.sendStatus(401);
    }

    let user;

    try {
        user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return res.sendStatus(401);
    }

    req.locals = user;

    next();
}
