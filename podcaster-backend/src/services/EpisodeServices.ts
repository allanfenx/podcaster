import { getCustomRepository } from "typeorm"
import { EpisodeRepositories } from "../repositories/EpisodeRepositories"

type FileType = {
    url: string,
    type: string,
    duration: number
}


type EpisodeType = {
    title: string,
    members: string,
    published_at: string,
    thumbnail: string,
    description: string,
    file: FileType
}

class EpisodeService {

    async execute({ title, description, members, thumbnail, published_at, file }: EpisodeType) {

        const episodeRepositories = getCustomRepository(EpisodeRepositories);

        const episode = episodeRepositories.create({ title, description, members, thumbnail, published_at, file });

        await episodeRepositories.save(episode);



        return { episode };
    }

    async index(){

        const episodeRepositories = getCustomRepository(EpisodeRepositories);

        const episodes = await episodeRepositories.find({
            relations: ["file"]
        });

        return episodes;
    }

    async show(id: string){

        const episodeRepositories = getCustomRepository(EpisodeRepositories);

        const episode = await episodeRepositories.findOne(id,{ 
            relations: ["file"]
        });

        return episode;
    }
}

export default new EpisodeService();