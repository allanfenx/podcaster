import { EntityRepository, Repository } from "typeorm";
import Episode from "../models/Episode";

@EntityRepository(Episode)
class EpisodeRepositories extends Repository<Episode>{ }

export { EpisodeRepositories }