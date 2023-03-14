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
    const navigate = useNavigate()

    function form(e) {
        e.preventDefault()
        setUser({ email: email, password: password })
        setLoading(true)

        axios.post(`${URL_base}/auth/login`, user)
            .then(() => navigate("/hoje"))
            .catch(err => {
                alert("email ou senha incorretos")
                setLoading(false)
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
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="email" />
                <input
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="senha" />
                <button type="submit">Entrar</button>
                <Link to={"/cadastrar"}>
                    <div>Não tem uma conta? Cadastre-se aqui</div>
                </Link>
            </InputsLogin>
        </ContainerLogin>

    )
}

