import dotenv from "dotenv";
dotenv.config();

import app from "./server";
app.listen(4000, () => console.info("Server started"));
