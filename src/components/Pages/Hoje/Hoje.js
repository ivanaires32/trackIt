import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Context from "../../../contexts/Context";
import Dados from "../../../contexts/Dados";
import { URL_base } from "../../../URL";
import { GoCheck } from "react-icons/go"
import { BoxContainer, Check, Container, TituloHabito, Topo } from "./style";
import dayjs from "dayjs"

export default function Hoje() {
    const TopFooter = useContext(Context)
    const [habitos, setHabitos] = useState([])
    const [check, setCheck] = useState([])
    const vazio = {}
    const dados = useContext(Dados)
    const d = dayjs().format('dddd - DD/MM')
    let data = require('dayjs/plugin/customParseFormat')
    dayjs.extend(data)
    const config = {
        headers: {
            "Authorization": `Bearer ${dados.userDados.token}`
        }
    }

    useEffect(() => {
        axios.get(`${URL_base}/habits/today`, config)
            .then(res => setHabitos(res.data))
            .catch(err => console.log(err.response.data))
    }, [])

    function concluido(i) {
        if (!check.includes(i)) {
            setCheck([...check, i])
            axios.post(`${URL_base}/habits/${habitos.id}/check`, vazio, config)
                .then(res => console.log(res.data))
                .catch(err => console.log(err.response))
        } else {
            const newList = check.filter((h) => h !== i)
            setCheck(newList)
        }


    }
    return (
        <Container>
            {TopFooter}
            <Topo>
                <h1>{d}</h1>
                <h2>Nem um habito concluido ainda</h2>
            </Topo>

            {habitos.map((h, i) => (
                <BoxContainer key={h.id}>
                    <TituloHabito>
                        <h1>Ler 1 capitulo do livro</h1>
                        <h2>Sequência atual: 3 dias</h2>
                        <h2>Seu recorde: 5 dias</h2>
                    </TituloHabito>
                    <Check background={check.includes(i) ? "#8FC549" : "#EBEBEB"} onClick={() => concluido(i)}><GoCheck /></Check>
                </BoxContainer>
            ))}

        </Container>
    )
}