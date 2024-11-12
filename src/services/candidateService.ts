import Candidate, { ICandidate } from "../models/candidateModel";

const sead1 = new Candidate ({ name: "Pinchas", image: "../images/panda profile.png", votes: 0 });
const sead2 = new Candidate ({ name: "Gamliel", image: "../images/camel profile.png", votes: 0 });
const sead3 = new Candidate ({ name: "Yaanki", image: "../images/ostrich profile.png", votes: 0 });

const createCandidate = async (candidateData: ICandidate): Promise<ICandidate> => {
    const candidate = new Candidate(candidateData);
    return await candidate.save();
};

// createCandidate(sead1);
// createCandidate(sead2);
// createCandidate(sead3);

export const getAllCandidatesService = async (): Promise<ICandidate[]> => {
  return await Candidate.find();
};

export const getCandidateByIdService = async (id: string): Promise<ICandidate | null> => {
  return await Candidate.findById(id);
}

export const updateCandidateService = async (id: string, candidate: ICandidate): Promise<ICandidate | null> => {
  return await Candidate.findByIdAndUpdate(candidate._id, candidate, { new: true });
}