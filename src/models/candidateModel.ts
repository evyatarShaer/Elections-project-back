import mongoose, { Schema, Document } from "mongoose";

export interface ICandidate extends Document {
  name: string;
  image: string;
  votes: number;
}

const candidateSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    votes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ICandidate>("Candidate", candidateSchema);
