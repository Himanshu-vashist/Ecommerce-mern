import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgotb password || POST
router.post("/forgot-password", forgotPasswordController);



//protected routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

 //protected ADMIN routes
 router.get("/admin-auth", requireSignIn,isAdmin, (req, res) =>{
  res.status(200).send({ok: true});
 });

 //test routes
router.get("/test", requireSignIn, isAdmin, testController);
export default router;
