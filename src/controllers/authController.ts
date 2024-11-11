import { Request, Response } from 'express';
import user from '../models/userModel';
import { createUserService } from '../services/userService';
import { generateToken } from '../utils/token';

export const register = async (req: Request, res: Response) => {
    const { username, password, isAdmin } = req.body;
    try {
        const newUser = await createUserService({ username, password, isAdmin });
        if (newUser.isAdmin === true) {
            res.status(201).json({ message: 'נרשמת בהצלחה כמנהל' });
        } else {
            res.status(201).json({ message: 'נרשמת בהצלחה' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'תקלה בהרשמה' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const theUser = await user.findOne({ username });

    if (!theUser || !(await theUser.comparePassword(password))) {
        res.status(401).json({ message: "שם משתמש או סיסמה שגויים" })
        return
    };

    const token = generateToken(theUser.id, theUser.isAdmin);
    res.cookie('token', token, {
        httpOnly:true,
        secure: false,
        maxAge: 3600000
    })
    res.status(201).json({ message: "התחברת בהצלחה", token })
}