import { Router } from "express";
import EpisodesController from "../controller/EpisodesController";

const router = Router();

router.get("/episodes", EpisodesController.indexEpisodes);

router.get("/episodes/:id", EpisodesController.showEpisodes);

router.post("/episodes", EpisodesController.handle);


export default router;