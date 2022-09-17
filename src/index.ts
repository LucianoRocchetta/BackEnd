import app from "./app";
import { PORT } from "./config";

app
  .listen(PORT, () => {
    console.info(`Server running on port: ${PORT}`);
  })
  .on("error", (e: any) => console.error(e));