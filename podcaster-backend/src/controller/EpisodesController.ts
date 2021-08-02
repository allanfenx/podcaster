import { Request, Response } from "express";
import EpisodeServices from "../services/EpisodeServices";


class EpisodesController {

    async handle(request: Request, response: Response) {

        const { title, description, members, thumbnail, published_at, file } = request.body;

        const episode = await EpisodeServices.execute({
            title,
            description,
            members,
            thumbnail,
            published_at,
            file
        });

        return response.json({ episode });
    }

    async indexEpisodes(request: Request, response: Response){

        const episodes = await EpisodeServices.index();

        return response.json({episodes});
    }

    async showEpisodes(request: Request, response: Response){

        const {id} = request.params;

        const episode = await EpisodeServices.show(id)

        return response.json({episode});
    }
}

export default new EpisodesController();