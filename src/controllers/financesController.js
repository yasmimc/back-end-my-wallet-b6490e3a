import * as FinancesServices from "../services/financesServices.js";

async function createEvent(req, res) {
    try {
        const user = req.locals;

        const { value, type } = req.body;

        if (!value || !type) {
            return res.sendStatus(400);
        }

        const event = await FinancesServices.createEvent({
            userId: user.id,
            value,
            type,
        });

        if (!event) {
            return res.sendStatus(400);
        }

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getEvents(req, res) {
    try {
        const user = req.locals;

        const events = await FinancesServices.getEvents(user.id);

        res.send(events);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function sumEvents(req, res) {
    try {
        const user = req.locals;

        const sum = await FinancesServices.getEventsSum(user.id);

        res.send({ sum });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export { createEvent, getEvents, sumEvents };
