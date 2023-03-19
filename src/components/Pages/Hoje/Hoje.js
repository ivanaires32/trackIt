import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Context from "../../../contexts/Context";
import Dados from "../../../contexts/Dados";
import { URL_base } from "../../../URL";
import { GoCheck } from "react-icons/go"
import { BoxContainer, Check, Container, Span, TituloHabito, Topo } from "./style";
import dayjs from "dayjs"

export default function Hoje() {
    const TopFooter = useContext(Context)
    const [habitos, setHabitos] = useState([])
    const [check, setCheck] = useState([])
    const [percentagem, setPercentagem] = useState()
    const [num, setNum] = useState(0)
    const [atual, setAtual] = useState(0)
    const [inicial, setInicial] = useState(true)
    const [igual, setIgual] = useState(false)
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
        axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, config)
            .then(res => {
                setHabitos(res.data)
                { habitos.map(() => setNum(0 + 1)) }
            })
            .catch(err => console.log(err.response.data))
    }, [inicial])

    useEffect(() => {
        setPercentagem(100 / habitos.length)
    }, [habitos])

    function concluido(i, h) {
        if (!check.includes(i)) {
            setCheck([...check, i])
            setNum(num + percentagem)
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${i}/check`, vazio, config)
                .then(() => {
                    setAtual(atual + 1)
                    setInicial(false)
                    if (atual === h) {
                        setIgual(true)
                    }
                })
                .catch(err => console.log(err.response.data))
        } else {
            const newList = check.filter((h) => h !== i)
            setCheck(newList)
            setNum(num - percentagem)
            setAtual(atual - 1)
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${i}/uncheck`, vazio, config)
                .catch(err => console.log(err.response))
        }




    }
    return (
        <Container>
            {TopFooter}
            <Topo color={num === 0 ? "#BABABA" : "#8FC549"}>
                <h1 data-test="today">{d}</h1>
                <h2 data-test="today-counter">{check.length !== 0 ? `${num.toFixed(0)}% dos hábitos concluídos` : "Nem um habito concluido ainda"}</h2>
            </Topo>

            {habitos.map((h) => (
                <BoxContainer data-test="today-habit-container" key={h.id}>
                    <TituloHabito>
                        <h1 data-test="today-habit-name">{h.name}</h1>
                        <h2 data-test="today-habit-sequence" >{`Sequência atual: `}<Span color={h.done ? "#8FC549" : "#666666"}>{`${inicial ? h.currentSequence : atual} dias`}</Span></h2>
                        <h2 data-test="today-habit-record">{`Seu recorde: `}
                            <Span color={h.done === true ? "#8FC549" : "#666666"}>
                                {`${inicial === true && h.highestSequence > atual ? h.highestSequence : atual} dias`}</Span>
                        </h2>
                    </TituloHabito>
                    <Check data-test="today-habit-check-btn" background={check.includes(h.id) || h.done === true ? "#8FC549" : "#EBEBEB"} onClick={() => concluido(h.id, h.highestSequence)}><GoCheck /></Check>
                </BoxContainer>
            ))
            }

        </Container >
    )
}