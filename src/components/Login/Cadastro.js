import { ContainerLogin, InputsLogin } from "./style"
import logo from "../../img/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { URL_base } from "../URL"
import { Oval } from "react-loader-spinner"


export default function Cadastrar() {
    const [info, setInfo] = useState(undefined)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [password, setPassword] = useState("")
    const [disabled, setDisable] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (email !== "") {
            axios.post(`${URL_base}/auth/sign-up`, info)
                .then(() => navigate("/"))
                .catch(err => {
                    alert(err.response.data.details[0])
                    setDisable(false)
                })
        }
    }, [info])

    function cadastro(e) {
        e.preventDefault()
        setInfo({ email: email, name: name, image: image, password: password })
        setDisable(true)
    }

    return (
        <ContainerLogin>
            <div>
                <img src={logo} />
            </div>
            <InputsLogin onSubmit={cadastro}>
                <input
                    data-test="email-input"
                    disabled={disabled}
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email"
                />
                <input
                    data-test="password-input"
                    disabled={disabled}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="senha"
                />
                <input
                    data-test="user-name-input"
                    disabled={disabled}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="nome" />
                <input
                    data-test="user-image-input"
                    disabled={disabled}
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    required
                    placeholder="foto" />
                <button data-test="signup-btn" disabled={disabled} type="submit">
                    {disabled ? <Oval
                        height={40}
                        width={40}
                        color="#ffffff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={disabled}
                        ariaLabel='oval-loading'
                        secondaryColor="#ababab"
                        strokeWidth={2}
                        strokeWidthSecondary={2}

                    /> : "Entrar"}</button>
                <Link data-test="login-link" to={"/"}>
                    <div>Já tem uma conta? Faça login</div>
                </Link>
            </InputsLogin>
        </ContainerLogin >
    )
}