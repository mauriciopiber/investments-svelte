import app from "./server";
import dotenv from "dotenv";

dotenv.config();
app.listen(4000, () => console.info("Server started"));
