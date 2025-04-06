import express from "express";
import contactsRouter from "./routes/contactsRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
