import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import api from "../services/api"
import "../styles/Login.css"


function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState("")
  const [recaptchaToken, setRecaptchaToken] = useState(null)


  async function handleLogin(e) {

    e.preventDefault()

    setErro("")

    if (email === "" || senha === "") {
      setErro("Preencha todos os campos")
      return
    }

    if (!recaptchaToken) {
      setErro("Confirme que você não é um robô")
      return
    }

    try {

      const response = await api.post("/auth/login", {
        email: email,
        senha: senha,
        recaptchaToken: recaptchaToken
      })

      localStorage.setItem("token", response.data.token)

      navigate("/dashboard")

    }

    catch (error) {
      console.log(error)
      setErro("Email ou senha inválidos")
      setRecaptchaToken(null)
    }

  }


  function entrarComoVisitante() {

    localStorage.setItem("token", "token-demo")

    localStorage.setItem(
      "usuario",
      JSON.stringify({
        nome: "Visitante",
        perfil: "Demonstração"
      })
    )

    navigate("/dashboard")

  }


  return (

    <div className="login-page">

      {/* FUNDO */}
      <div className="login-blob-bg blob-a" />
      <div className="login-blob-bg blob-b" />
      <div className="login-blob-bg blob-a" />
      <div className="login-blob-bg blob-a" />
      <div className="login-blob-bg blob-b" />
      <div className="login-shape shape-fill-1" />
      <div className="login-shape shape-fill-2" />
      <div className="login-shape shape-ring" />
      <div className="login-shape shape-outline" />

      {/* LOGO */}
      <div className="login-topbar">
        <span className="login-ring-deco" />
        <h2 className="brand-font login-logo" translate="no">
          Presen<span>See</span>
        </h2>
      </div>

      <div className="login-panels">

        {/* PAINEL DE RECONHECIMENTO FACIAL */}
        <div className="scan-panel">

          <div className="scan-frame">

            <span className="scan-corner corner-tl" />
            <span className="scan-corner corner-tr" />
            <span className="scan-corner corner-bl" />
            <span className="scan-corner corner-br" />

            <div className="scan-face">
              <span className="scan-eye" />
              <span className="scan-eye" />
              <span className="scan-smile" />
            </div>

            <div className="scan-line" />

          </div>

          <h3>Cada presença importa, cada futuro também.</h3>
          <p>validando presença em tempo real</p>

          <div className="scan-badge">
            <span className="scan-dot" />
            <b> presente.</b>
          </div>

        </div>

        {/* CARTÃO DE LOGIN */}
        <div className="login-card">

          <h1 className="brand-font">
            Conecte-<span>se</span>
          </h1>

          <p className="login-subtitle">
            Acesse o painel de presença da sua turma.
          </p>

          <form onSubmit={handleLogin}>

            <label>Email</label>

            <input
              className="login-input"
              type="email"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Senha</label>

            <input
              className="login-input"
              type={mostrarSenha ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <p
              className="show-password"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            </p>

            {/* reCAPTCHA */}
            <div className="recaptcha-container">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(token) => {
                  setRecaptchaToken(token)
                  setErro("")
                }}
                onExpired={() => {
                  setRecaptchaToken(null)
                }}
              />
            </div>

            {erro && (
              <p className="error-message">{erro}</p>
            )}

            <button className="login-button" type="submit">
              Entrar
            </button>

            <button
              type="button"
              className="create-account"
              onClick={entrarComoVisitante}
            >
              Entrar como visitante
            </button>

          </form>

        </div>

      </div>

    </div>

  )

}


export default Login