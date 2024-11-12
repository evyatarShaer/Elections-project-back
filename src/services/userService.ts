import user, { IUser } from '../models/userModel';

// יצירת יוזר פונקציה שיכולה לקבל גם חלק מהמידע ואת ההצבעה שלו
export const createUserService = async (userData: Partial<IUser>): Promise<IUser> => {
    const newUser = new user({...userData});
    const checkUsername = await user.findOne({ username: userData.username });
    if (checkUsername) throw new Error('שם המשתמש כבר קיים');
    return await newUser.save();
}

// פונקציה שמוצאת משתמש ע"פ שם ומשתמשת בפונקציה של מונגוס ומשמיטה את הסיסמה וכוללת את הבחירה
export const getUserByNameService = async (name: string): Promise<IUser | null> => {
    return await user.findOne({ username: name }).select('-password').populate('votedFor');
}

export const getAllUsersService = async (): Promise<IUser[]> => {
    return await user.find().select('-password').populate('votedFor')
}

export const updateUserService = async (id: string, updatedData: Partial<IUser>): Promise<IUser | null> => {
    // if (updatedData.votedFor) updatedData.hasVoted = true;
    return await user.findByIdAndUpdate(id, updatedData, { new: true }).select('-password').populate('votedFor');
}
