import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../services/api";
import Link from "next/link";
import { convertDurationToTimeString } from "../../services/convertDurationToTimeString";
import Image from "next/image";

import styles from "../../styles/episodes.module.scss";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";

type EpisodeType = {
    id: string,
    title: string,
    thumbnail: string,
    members: string,
    duration: number,
    published_at: string,
    url: string
    description: string
}

type EpisodeProps = {
    episode: EpisodeType;
}

export default function Episode({ episode }: EpisodeProps) {

    const { play } = useContext(PlayerContext);

    return (
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <Link href="/">
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar" />
                    </button>
                </Link>
                <Image width={700} height={168}
                    src={episode.thumbnail} objectFit="cover"
                    alt={episode.title} />
                <button type="button">
                    <img src="/play.svg" alt="Tocar episódio" />
                </button>

                <button type="button" onClick={() => play(episode)}>
                    <img src="/play.svg" alt="Tocar episódio" />
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.published_at}</span>
                <span>{episode.duration}</span>
            </header>

            <div className={styles.description}>
                {episode.description}
            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

    return {
        paths: [],
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async (context) => {

    const { slug } = context.params;

    const { data } = await api.get(`/episodes/${slug}`)


    const episode = {
        id: data.episode.id,
        title: data.episode.title,
        thumbnail: data.episode.thumbnail,
        members: data.episode.members,
        published_at: format(parseISO(data.episode.published_at), 'd MMM yy', { locale: ptBR }),
        duration: convertDurationToTimeString(Number(data.episode.file.duration)),
        description: data.episode.description,
        url: data.episode.file.url
    }

    return {
        props: {
            episode
        },
        revalidate: 60 * 60 * 24 //24hours
    }
}