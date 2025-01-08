import { User } from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export default class UserController {
    static async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Senha inválida" });
            }

            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });

            return res.status(200).json({
                message: "Login bem-sucedido",
                token,
                role: user.role,
            });
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }

    static async registerUser(req, res) {
        const { name, idade, email, password, confirmPassword, role = 'user' } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "As senhas não coincidem!" });
        }

        const allowedRoles = ['user', 'admin'];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: "Role inválida!" });
        }

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email já registrado!" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, idade, email, password: hashedPassword, role });
            const createdUser = await newUser.save();

            return res.status(201).json({
                message: "Usuário criado com sucesso!",
                user: {
                    id: createdUser._id,
                    name: createdUser.name,
                    email: createdUser.email,
                    role: createdUser.role,
                },
            });
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    static authenticateToken(req, res, next) {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Token não fornecido" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Token inválido" });
            }
            req.user = user;
            next();
        });
    }

    static authorizeRoles(allowedRoles) {
        return (req, res, next) => {
            const { role } = req.user;

            if (!allowedRoles.includes(role)) {
                return res.status(403).json({ message: "Acesso negado" });
            }
            next();
        };
    }

    static async logoutUser(req, res) {
        res.clearCookie('token');
        return res.status(200).json({ message: "Logout realizado com sucesso!" });
    }
}
