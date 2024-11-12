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

export const getCandidateById = async (req: Request, res: Response) => {
  try {
    const candidate = await candidateService.getCandidateByIdService( req.params.id );
    if (!candidate) {
      res.status(404).json({ error: "מועמד לא נמצא" });
    }
    res.status(200).json(candidate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "תקלה בהבאת מועמד" });
  }
};

export const updateCandidate = async (req: Request, res: Response) => {
  try {
    const candidate = await candidateService.updateCandidateService( req.params.id, req.body );
    if (!candidate) {
      res.status(404).json({ error: "מועמד לא נמצא" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "תקלה בעדכון מועמד" });
  }
};
