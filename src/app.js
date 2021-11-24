import express from "express";
import cors from "cors";
import * as UserController from "./controllers/userController.js";
import * as FinancesController from "./controllers/financesController.js";
import auth from "./middlewares/tokenValidator.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", UserController.signUp);
app.post("/sign-in", UserController.signIn);
app.post("/financial-events", auth, FinancesController.createEvent);
app.get("/financial-events", auth, FinancesController.getEvents);
app.get("/financial-events/sum", auth, FinancesController.sumEvents);

export default app;
