import express, { Request, Response } from "express";
import { response404 } from "./Helpers/Response";
import cors from "cors";
import { profileRoasting, daun, biji } from "./Helpers/LoadModel";
import dotenv from "dotenv";
dotenv.config();

import { authenticate } from "./Middlewares/Authenticate";
import SampleRoute from "./Routes/SampleRoute";
import AuthRoute from "./Routes/AuthRoute";
import PredictRoute from "./Routes/PredictRoute";
import UserRoute from "./Routes/UserRoute";
import HistoryRoute from "./Routes/HistoryRoute";
import SugesstionRoute from "./Routes/SuggestionRoute";

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
  const modelBiji = await biji();
  
  app.set("model.profileRoasting", modelProfileRoasting);
  app.set("model.daun", modelDaun);
  app.set("model.biji", modelBiji);

  // Routes
  app.use("/sample", SampleRoute);
  app.use("/auth", AuthRoute);
  app.use("/predict", authenticate, PredictRoute);
  app.use("/user", authenticate, UserRoute);
  app.use("/history", authenticate, HistoryRoute);
  app.use("/suggestion", authenticate, SugesstionRoute);

  // 404 handler
  app.use((req: Request, res: Response) => {
    return response404(res, "Resource not found");
  });
  
  app.listen(4000, () =>
    console.log(`⚡️ Server is running at http://localhost:4000`)
  );
})();
