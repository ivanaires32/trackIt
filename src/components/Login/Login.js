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

    useEffect(() => {
        if (email !== "" && password !== "") {
            axios.post(`${URL_base}/auth/login`, user)
                .then((e) => {
                    navigate("/hoje")
                    console.log(e.data)
                })
                .catch(err => {
                    alert("email ou senha incorretos")
                    setLoading(false)
                    setDisable(false)
                })
        }
    }, [user])

    function form(e) {
        e.preventDefault()
        setUser({ email: email, password: password })
        setLoading(true)
        setDisable(true)
        console.log(user)
    }

    return (

        <ContainerLogin>
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
                <button data-test="login-btn" disabled={disabled} type="submit">
                    {loading ? <Oval
                        height={40}
                        width={40}
                        color="#ffffff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={loading}
                        ariaLabel='oval-loading'
                        secondaryColor="#ababab"
                        strokeWidth={2}
                        strokeWidthSecondary={2}

                    /> : "Entrar"}</button>
                <Link data-test="signup-link" to={"/cadastro"}>
                    <div>Não tem uma conta? Cadastre-se aqui</div>
                </Link>
            </InputsLogin>
        </ContainerLogin>

    )
}

