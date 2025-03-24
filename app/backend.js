import express from "express";
import cors from "cors";

import first from "./first.js";
import second from "./second.js";

const app = express();
app.use(express.json());
app.use(cors("*"));
const port = 3000;

first(app);
second(app);

app.listen(port, () => {
  console.log(`Сервер запущено, прослуховуємо порт - ${port}`);
});
