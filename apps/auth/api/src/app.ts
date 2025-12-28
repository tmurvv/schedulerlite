import dotenv from "dotenv";

import { createServer } from "./create-server";
import { dbConnect } from "./db-connect";

dotenv.config();
const port: number = parseInt(<string>process.env.PORT, 10) || 4050;

const startServer = async () => {
  const app = await createServer();
  await dbConnect();

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer()
  .then()
  .catch((err) => console.log(err));
