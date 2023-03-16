import { Footer, Header } from "./stylesFixos";
import { Link } from "react-router-dom";

export default function Fixos({ userDados }) {
    return (
        <>
            <Header>
                <h1>TrackIt</h1>
                <img src={userDados.image} />
            </Header>

            <Footer>
                <Link to={"/habitos"}>
                    <h2>Hábitos</h2>
                </Link>
                <div>Hoje</div>
                <h2>Histórico</h2>
            </Footer>
        </>
    )
}