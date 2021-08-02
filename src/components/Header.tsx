import { format } from "date-fns";
import { ptBR } from "date-fns/locale";


import styles from "../styles/header.module.scss";

export function Header() {

    const curentDate = format(new Date(), "EEE, d MMMM", {
        locale: ptBR
    })

    return (
        <header className={styles.headerContainer}>
            <img src="logo.svg" alt="Podcast" />

            <p>O melhor para ouvir</p>

            <span>{curentDate}</span>
        </header>
    )
}