import Candidate, { ICandidate } from "../models/candidateModel";

const seads = new Candidate (
{     name: "po", image: "../images/A handsome and authoritative panda profile picture, suitable for a head of government.png", votes: 0 }
);

const createCandidate = async (candidateData: ICandidate): Promise<ICandidate> => {
    const candidate = new Candidate(candidateData);
    return await candidate.save();
};

createCandidate(seads);

export const getAllCandidatesService = async (): Promise<ICandidate[]> => {
  return await Candidate.find();
};
