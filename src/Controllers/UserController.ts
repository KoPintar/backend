// import { Request, Response } from "express";
// import { response200, response400, response500 } from "../Helpers/Response";
// import { User } from "../Models/User";
// import { validationResult } from "express-validator";
// import { genSaltSync, hashSync } from "bcryptjs";

// export async function updateUser(req: Request, res: Response) {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       const error = errors.array()[0].msg;
//       return response400(res, error);
//     }

//     const userId = req.user?.id; // Ensure user is defined
//     if (!userId) {
//       return response400(res, "User not authenticated");
//     }

//     const { name, email, username, password, profileImg } = req.body;

//     const user = await User.findByPk(userId);
//     if (!user) {
//       return response400(res, "User not found");
//     }

//     if (password) {
//       const salt = genSaltSync(10);
//       user.password = hashSync(password, salt);
//     }

//     user.name = name || user.name;
//     user.email = email || user.email;
//     user.username = username || user.username;
//     user.profileImg = profileImg || user.profileImg;

//     await user.save();

//     return response200(res, "Profile updated successfully", user);
//   } catch (error: any) {
//     console.error(error);
//     return response500(res, "Internal server error");
//   }
// }
