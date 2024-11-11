import { Request, Response } from "express";
import * as candidateService from "../services/candidateService";

export const getAllCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await candidateService.getAllCandidatesService();
    res.status(200).json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "תקלה בהבאת מועמדים" });
  }
};
