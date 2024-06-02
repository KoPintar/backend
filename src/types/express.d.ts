import { UserAttributes } from "../Models/User"; // Import the attributes interface from your User model

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes; // Add the user property
    }
  }
}