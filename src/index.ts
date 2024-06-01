import express, { Request, Response } from "express";
import { response404 } from "./Helpers/Response";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import SampleRoute from "./Routes/SampleRoute";
import AuthRoute from "./Routes/AuthRoute";

(async () => {
  const app = express();
  app.use(express.json());

	// allow all cors
	app.use(
    cors({
      origin: "*",
      methods: "GET,POST",
    })
  );

  // Predict route
  app.use("/sample", SampleRoute);
  app.use("/auth", AuthRoute);

  // 404 handler
  app.use((req: Request, res: Response) => {
    return response404(res, "Resource not found");
  });
  
  app.listen(4000, () =>
    console.log(`⚡️ Server is running at http://localhost:3000`)
  );
})();