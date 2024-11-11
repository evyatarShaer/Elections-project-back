import user, { IUser } from '../models/userModel';

// יצירת יוזר פונקציה שיכולה לקבל גם חלק מהמידע ואת ההצבעה שלו
export const createUserService = async (userData: Partial<IUser>): Promise<IUser> => {
    const newUser = new user({...userData});
    return await newUser.save();
}

// פונקציה שמוצאת משתמש ע"פ איי די  ומשתמשת בפונקציה של מונגוס ומשמיטה את הסיסמה וכוללת את הבחירה
export const getUserByIdService = async (id: string): Promise<IUser | null> => {
    return await user.findById(id).select('-password').populate('votedFor')
}


export const getAllUsersService = async (): Promise<IUser[]> => {
    return await user.find().select('-password').populate('votedFor')
}

export const updateUserService = async (id: string, updatedData: Partial<IUser>): Promise<IUser | null> => {
    return await user.findByIdAndUpdate(id, updatedData, { new: true }).select('-password').populate('votedFor');
}

export const deleteUserService = async (id: string): Promise<IUser | null> => {
    return await user.findByIdAndDelete(id).select('-password').populate('votedFor');
}