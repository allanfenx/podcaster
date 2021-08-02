import { EntityRepository, Repository } from "typeorm";
import File from "../models/File";


@EntityRepository(File)
class FilesRepositories extends Repository<File>{ }

export { FilesRepositories };