import { Response, Request, request, response } from "express";
import { getRepository } from "typeorm";
import Episode from "../models/Episode";
import File from "../models/File";

class FileController {

    async handle(request: Request, response: Response) {


    }

    async store(request: Request, response: Response, params: number) {

        const { id, url, type, duration } = request.body;

        const episode = await getRepository(Episode).findOne(id);

        const repository = getRepository(File);

        const file = repository.create({ url, type, duration, episodeId: params });

        try {

            await repository.save(file);

            return response.json({ file });
        } catch (error) {

            return response.status(400).json({ erro: "Falha ao salvar file" });
        }
    }

    async saveParams(params: number) {

        const { url, type, duration } = request.body.file;

        const repository = getRepository(File);

        const file = repository.create({ url, type, duration, episodeId: params });

        try {
            await repository.save(file);

            return response.json({ file });
        } catch (error) {

            return response.status(400).json({ erro: "Falha ao salvar file " + error });
        }
    }
}

export default new FileController();