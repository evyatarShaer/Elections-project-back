import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsersService();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'תקלה בהבאת המשתמשים' });
    }
}

export const getUserByName = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserByNameService(req.body.username);
        if (!user) {
            res.status(404).json({ error: 'משתמש לא נמצא' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'תקלה בהבאת המשתמש' });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await userService.updateUserService(req.params.id, req.body);
        if (!updatedUser) {
            res.status(404).json({ error: 'משתמש לא נמצא' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'תקלה בעדכון המשתמש' });
    }
}