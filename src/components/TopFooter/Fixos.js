import { Footer, Header } from "./stylesFixos";
import { Link } from "react-router-dom";

export default function Fixos({ userDados }) {
    return (
        <>
            <Header data-test="header">
                <h1>TrackIt</h1>
                <img src={userDados.image} />
            </Header>

            <Footer data-test="menu">
                <Link data-test="habit-link" to={"/habitos"}>
                    <h2>Hábitos</h2>
                </Link>
                <div data-test="today-link">Hoje</div>
                <Link data-test="history-link" to={"/historico"}>
                    <h2>Histórico</h2>
                </Link>
            </Footer>
        </>
    )
}