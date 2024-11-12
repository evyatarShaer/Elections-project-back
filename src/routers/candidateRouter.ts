import express from 'express';
import { getAllCandidates, updateCandidate, getCandidateById } from '../controllers/candidateController';

const router = express.Router();

router.get('/candidates', getAllCandidates);
router.get('/candidates/:id', getCandidateById);
router.put('/candidates/:id', updateCandidate);

export default router;