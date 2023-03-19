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
    const [percentagem, setPercentagem] = useState()
    const [num, setNum] = useState(0)
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

    useEffect(() => {
        setPercentagem(100 / habitos.length)
    }, [habitos])

    function concluido(i) {
        if (!check.includes(i)) {
            setCheck([...check, i])
            setNum(num + percentagem)
            axios.post(`${URL_base}/habits/${habitos.id}/check`, vazio, config)
                .then(res => console.log(res.data))
                .catch(err => console.log(err.response))
        } else {
            const newList = check.filter((h) => h !== i)
            setCheck(newList)
            setNum(num - percentagem)
            if (num === 0) {
                setNum(0)
            }
        }

        console.log(habitos)

    }
    return (
        <Container>
            {TopFooter}
            <Topo color={num === 0 ? "#BABABA" : "#8FC549"}>
                <h1 data-test="today">{d}</h1>
                <h2 data-test="today-counter">{num === 0 ? "Nem um habito concluido ainda" : `${num.toFixed(0)}% dos hábitos concluídos`}</h2>
            </Topo>

            {habitos.map((h, i) => (
                <BoxContainer data-test="today-habit-container" key={h.id}>
                    <TituloHabito>
                        <h1 data-test="today-habit-name">{h.name}</h1>
                        <h2 data-test="today-habit-sequence">Sequência atual: 3 dias</h2>
                        <h2 data-test="today-habit-record">Seu recorde: 5 dias</h2>
                    </TituloHabito>
                    <Check data-test="today-habit-check-btn" background={check.includes(i) ? "#8FC549" : "#EBEBEB"} onClick={() => concluido(i)}><GoCheck /></Check>
                </BoxContainer>
            ))
            }

        </Container >
    )
}