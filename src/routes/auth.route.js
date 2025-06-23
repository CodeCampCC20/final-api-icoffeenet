import express from "express"
import authController from "../controllers/auth.controller.js"
import authenticate from "../middlewares/authenticate.middleware.js"
import validatorMiddleware from "../middlewares/validator.middleware.js"
import { schemaRegister } from "../utils/schema-auth.js"

const authRouter = express.Router()

authRouter.post("/auth/register/user", validatorMiddleware(schemaRegister), authController.regsiterUser)
authRouter.post("/auth/register/doctor", validatorMiddleware(schemaRegister), authController.regsiterDoctor)
authRouter.post("/auth/login/user", authController.loginUser)
authRouter.post("/auth/login/doctor", authController.loginDoctor)
authRouter.post("/health-records", authController.createHealthRecord)
authRouter.get("/health-records", authController.viewHealthRecord)

export default authRouter