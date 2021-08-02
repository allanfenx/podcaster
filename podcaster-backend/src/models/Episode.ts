import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import File from "./File";

@Entity("episodes")
export default class Episode {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    title: string;

    @Column()
    members: string;

    @Column()
    published_at: string;

    @Column()
    thumbnail: string;

    @Column()
    description: string;

    @OneToOne(() => File, {
        cascade: ["insert", "update", "remove"]
    })
    @JoinColumn()
    file: File;
}