import { Router } from "express";
import UserController from "../controllers/UserController.js";

const userRouter = Router();
userRouter.post('/register', UserController.registerUser);
userRouter.post('/login', UserController.loginUser);
userRouter.post('/logout', UserController.logoutUser);

userRouter.get('/admin',UserController.authenticateToken,UserController.authorizeRoles(['admin']),
    (req, res) => {
        res.status(200).json({ message: "Admin autenticado", role: req.user.role });
    }
);


export default userRouter;