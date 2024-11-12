import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { ICandidate } from "./candidateModel";

// הגדרת היוזר בטי אס שיורש מדוקיומנט ומקבל אופציות כמו שמירת איי די
export interface IUser extends Document {
  username: string;
  password: string;
  isAdmin: boolean;
  hasVoted: boolean;
  // מקבל רפרנס לאיי די של הנבחר או נל
  votedFor: ICandidate["_id"] | null;
  // פונקציה שמקבלת את הסיסמה שהמשתמש מכניס ובודקת אם היא שווה לסיסמה שלו
  comparePassword(userPassword: string): Promise<boolean>;
}

// הגדרת היוזר בשביל הדאטה בייס
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    hasVoted: {
      type: Boolean,
      default: false,
    },
    votedFor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Candidate'
    }
  },
  // יוצר שדות של שעה ותאריך של כל עדכון ע"י מונגוס
  { timestamps: true }
);

// פונקצייה שבודקת אם הסיסמה שונתה ואם כן היא מצפינה אותה
userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// הפונקציה מהאינטרפייס שמשווה בין הסיסמה שהמשתמש הכניס לסיסמה שלו ששמורה
userSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

// יצוא המודל בשם יוזר ויצירת המודל בדאטה בייס ע"י מונגוס
export default mongoose.model<IUser>("user", userSchema);
