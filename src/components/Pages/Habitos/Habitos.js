import { useContext, useEffect, useState } from "react";
import Context from "../../../contexts/Context";
import { Container, MeusHabitos } from "./styles";
import NovoHabito from "./NovoHabito";
import axios from "axios";
import { URL_base } from "../../../URL";
import Habs from "./Habs";

export default function Habitos({ userDados }) {
    const TopFooter = useContext(Context)
    const [display, setDisplay] = useState("none")
    const [habitos, setHabitos] = useState([])
    const [post, setPost] = useState([])
    const config = {
        headers: {
            "Authorization": `Bearer ${userDados.token}`
        }
    }

    useEffect(() => {
        axios.get(`${URL_base}/habits`, config)
            .then(res => {
                setPost(res.data)
                setHabitos(post)
            })
            .catch(err => console.log(err.response.data))
    }, [habitos])
    return (
        <>
            {TopFooter}
            <Container>
                <MeusHabitos>
                    <h1>Meus hábitos</h1>
                    <button data-test="habit-create-btn" onClick={() => setDisplay("flex")}>+</button>
                </MeusHabitos>

                <NovoHabito data-test="habit-create-container" userDados={userDados} display={display} setDisplay={setDisplay} />

                <div>
                    {habitos.length === 0 ?
                        "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!"
                        : <Habs post={post} setPost={setPost} token={userDados.token} />}
                </div>
            </Container>
        </>
    )
}