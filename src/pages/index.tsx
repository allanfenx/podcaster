import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { api } from "../services/api";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { convertDurationToTimeString } from "../services/convertDurationToTimeString";

import styles from "../styles/home.module.scss";
import { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";

type Episode = {
  id: string,
  title: string,
  thumbnail: string,
  members: string,
  duration: number,
  published_at: string,
  url: string
}

type HomeProps = {
  lastEpisodes: Episode[],
  allEpisodes: Episode[]
}

export default function Home({ allEpisodes, lastEpisodes }: HomeProps) {

  const { playList } = useContext(PlayerContext);

  const episodeList = [...lastEpisodes, ...allEpisodes];

  return (
    <div className={styles.homepage}>
      <section className={styles.lastEpisodes}>
        <h2>Ultimos Lançamentos</h2>

        <ul>
          {lastEpisodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <Image width={192} height={192} objectFit="cover"
                  src={episode.thumbnail} alt={episode.title} />

                <div className={styles.episodeDatails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a >{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.published_at}</span>
                  <span>{episode.duration}</span>
                </div>
                <button type="button">
                  <img src="play-green.svg" alt="Tocar episodio" onClick={() => playList(episodeList, index)} />
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episodios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td>
                    <Image width={120} height={120}
                      objectFit="cover"
                      alt={episode.title}
                      src={episode.thumbnail} />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a >{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td>{episode.published_at}</td>
                  <td>{episode.duration}</td>
                  <td>
                    <button type="button">
                      <img src="play-green.svg" alt="Tocar episódio" onClick={() => playList(episodeList, index + lastEpisodes.length)} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc"
    }
  });

  const episodes = data.episodes.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      published_at: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url
    }
  })

  const lastEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      allEpisodes,
      lastEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}