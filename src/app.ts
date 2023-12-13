import express from "express";
import myDataSource from "./app-data-source";
import "dotenv/config";
import postsRouter from "./routes/postsRouter";
import imagesRouter from "./routes/imagesRouter";
import fileUpload from "express-fileupload";
import docsRouter from "./routes/docsRouter";
import usersRouter from "./routes/usersRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();

app.use(express.json());
app.use(fileUpload({}));
app.use(express.static("public"));

app.use("/api/posts", postsRouter);
app.use("/api/images", imagesRouter);
app.use("/api/docs", docsRouter);
app.use("/api/user", usersRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT;

async function startApp() {
  try {
    app.listen(PORT, () => console.log("server is working", PORT));
  } catch (e) {
    console.log(e.message);
  }
}

startApp();
