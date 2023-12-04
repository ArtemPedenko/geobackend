import * as express from "express";
import myDataSource from "./app-data-source";
import "dotenv/config";
import router from "./routes/postsRouter";

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
const PORT = process.env.PORT;
app.use("/api", router);

async function startApp() {
	try {
		app.listen(PORT, () => console.log("server is working", PORT));
	} catch (e) {
		console.log(e.message);
	}
}

startApp();
