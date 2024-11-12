import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: {
        username: string;
        isAdmin?: boolean;
    };
};

// הנקסט מעביר לפונקציה הבאה בראוטר
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "אין הרשאה" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { username: string; isAdmin: boolean };
        req.user = decoded;
        next();   
    } catch (err) {
        res.status(403).json({ message: "הטוקן לא בתוקף" });
    }
};

export const managerAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user?.isAdmin) {
        res.status(403).json({message: "הגישה למנהלים בלבד"})
    } else {
        next()
    }
}