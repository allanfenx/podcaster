import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Episode from "./Episode";

@Entity("file")
export default class File {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    url: string;

    @Column()
    type: string;

    @Column()
    duration: number;

}