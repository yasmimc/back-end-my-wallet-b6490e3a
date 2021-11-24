import * as FinancesRepository from "../repositories/financesRepository.js";

async function createEvent({ userId, value, type }) {
    if (!["INCOME", "OUTCOME"].includes(type)) {
        return null;
    }

    if (value < 0) {
        return null;
    }

    return await FinancesRepository.createEvent({ userId, value, type });
}

async function getEvents(userId) {
    return await FinancesRepository.getEvents(userId);
}

async function getEventsSum(userId) {
    const events = await FinancesRepository.getEvents(userId);

    const sum = events.reduce(
        (total, event) =>
            event.type === "INCOME" ? total + event.value : total - event.value,
        0
    );

    return sum;
}

export { createEvent, getEvents, getEventsSum };
