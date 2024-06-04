import express, { Request, Response } from "express";
import { response404 } from "./Helpers/Response";
import cors from "cors";
import { profileRoasting, daun } from "./Helpers/LoadModel";
import dotenv from "dotenv";
dotenv.config();

import SampleRoute from "./Routes/SampleRoute";
import AuthRoute from "./Routes/AuthRoute";
import PredictRoute from "./Routes/PredictRoute";
import { authenticate } from "./Middlewares/Authenticate";
// import UserRoute from "./Routes/UserRoute"; // Import the UserRoute

(async () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set("view engine", "ejs");

  // Allow all CORS
  app.use(
    cors({
      origin: "*",
      methods: "GET,POST,PUT", // Add PUT method to allow profile updates
    })
  );

  // Load model
  const modelProfileRoasting = await profileRoasting();
  const modelDaun = await daun();
  app.set("model.profileRoasting", modelProfileRoasting);
  app.set("model.daun", modelDaun);

  // Predict route
  app.use("/sample", SampleRoute);
  app.use("/auth", AuthRoute);
  app.use("/predict", authenticate, PredictRoute);
  // app.use("/user", UserRoute); // Add the new UserRoute

  // 404 handler
  app.use((req: Request, res: Response) => {
    return response404(res, "Resource not found");
  });
  
  app.listen(4000, () =>
    console.log(`⚡️ Server is running at http://localhost:4000`)
  );
})();
