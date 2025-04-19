import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import contactsRouter from "./routes/contactsRouter.js";
import { connectDB } from "./db/Sequelize.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  console.warn(`Route not found: ${req.originalUrl}`);
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { PORT = 3000 } = process.env;
const port = Number(PORT);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running. Use our API on port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

start();
