import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../img/logo.png"
import { ContainerLogin, InputsLogin } from "./style"
import { URL_base } from "../URL"
import { useEffect, useState } from "react"
import { Oval } from "react-loader-spinner"


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [disabled, setDisable] = useState(false)
    const navigate = useNavigate()

    function form(e) {
        e.preventDefault()
        setUser({ email: email, password: password })
        setLoading(true)
        setDisable(true)

        axios.post(`${URL_base}/auth/login`, user)
            .then(() => navigate("/hoje"))
            .catch(err => {
                alert("email ou senha incorretos")
                setLoading(false)
                setDisable(false)
            })

    }

    return (

        <ContainerLogin>
            <Oval
                height={80}
                width={80}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={loading}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}

            />
            <div>
                <img src={logo} />
            </div>
            <InputsLogin onSubmit={form}>
                <input
                    data-test="email-input"
                    disabled={disabled}
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="email" />
                <input
                    data-test="password-input"
                    disabled={disabled}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="senha" />
                <button data-test="login-btn" disabled={disabled} type="submit">Entrar</button>
                <Link data-test="signup-link" to={"/cadastrar"}>
                    <div>Não tem uma conta? Cadastre-se aqui</div>
                </Link>
            </InputsLogin>
        </ContainerLogin>

    )
}

