import { ContainerLogin, InputsLogin } from "./style"
import logo from "../../img/logo.png"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { URL_base } from "../URL"


export default function Cadastrar() {
    const [info, setInfo] = useState(undefined)
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [image, setImage] = useState()
    const [password, setPassword] = useState()

    useEffect(() => {
        axios.post(`${URL_base}/auth/sign-up`, info)
            .then(res => console.log(res.data))
            .catch(err => alert(err.response.data.message))
    }, [info])

    function cadastro(e) {
        e.preventDefault()
        setInfo({ email: email, name: name, image: image, password: password })
    }

    return (
        <ContainerLogin>
            <div>
                <img src={logo} />
            </div>
            <InputsLogin onSubmit={cadastro}>
                <input type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email"
                />
                <input
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="senha"
                />
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="nome" />
                <input
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    required
                    placeholder="foto" />
                <button type="submit">Entrar</button>
                <Link to={"/"}>
                    <div>Já tem uma conta? Faça login</div>
                </Link>
            </InputsLogin>
        </ContainerLogin>
    )
}