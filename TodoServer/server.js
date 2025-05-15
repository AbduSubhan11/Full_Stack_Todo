import express from "express";
import "dotenv/config";
import connections from "./src/db/connection.js";
import router from "./src/routes/todos.route.js";
import authRouter from "./src/routes/userAuth.route.js"
import cors from "cors";
import cookieParser from "cookie-parser";

const port = 4000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/v1", router);
app.use("/api/v1", authRouter)


app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Todo List",
    todos,
  });
});

app.post("/addItems", (req, res) => {
  const { item } = req.body;
  if (!item) {
    return res.status(400).send({ error: "Please enter a valid item" });
  }
  const newTodo = {
    id: todos.length + 1,
    item: item,
  };
  todos.push(newTodo);
  res.json({
    message: "Item Added Succesfully",
    todos,
  });
});

app.put("/edit/:id", (req, res) => {
  const { newItem } = req.body;
  if (!newItem) {
    return res.status(400).send({ error: "Please enter a valid item" });
  }

  const index = todos.findIndex(
    (index) => index.id === parseInt(req.params.id)
  );
  if (index == -1) return res.status(404).json("Item Not Found");

  todos.splice(index, 1, {
    id: parseInt(req.params.id),
    item: newItem,
  });

  res.json({
    message: "Item Edit successfully",
    todos,
  });
});

app.delete("/delete/:id", (req, res) => {
  const index = todos.findIndex((item) => item.id === parseInt(req.params.id));
  if (index == -1) return res.status(404).json("Item Not Found");

  todos.splice(index, 1);

  res.json({
    message: "Item Deleted successfully",
    newItem: todos,
  });
});

connections()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
