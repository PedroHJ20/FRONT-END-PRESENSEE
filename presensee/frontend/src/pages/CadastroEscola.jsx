import { useState } from "react"
import "../styles/CadastroEscola.css"


function gerarSenhaTemporaria() {

  const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"

  let senha = ""

  for (let i = 0; i < 8; i++) {
    senha += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    )
  }

  return senha

}


function CadastroEscola() {

  const [etapa, setEtapa] = useState(1)

  const [copiado, setCopiado] = useState(false)

  const [escola, setEscola] = useState({
    nome: "",
    codigoInep: "",
    rede: "Pública Estadual",
    cidade: "",
    estado: ""
  })

  const [admin, setAdmin] = useState({
    nome: "",
    cargo: "Coordenador(a)",
    email: ""
  })

  const [senhaGerada, setSenhaGerada] = useState("")


  function atualizarEscola(campo, valor) {
    setEscola({ ...escola, [campo]: valor })
  }

  function atualizarAdmin(campo, valor) {
    setAdmin({ ...admin, [campo]: valor })
  }


  function avancarParaAdmin(e) {
    e.preventDefault()
    setEtapa(2)
  }


  function finalizarCadastro(e) {

    e.preventDefault()

    const senha = gerarSenhaTemporaria()

    setSenhaGerada(senha)

    setEtapa(3)

  }


  function copiarCredenciais() {

    const texto =
      `Escola: ${escola.nome}\n` +
      `Login: ${admin.email}\n` +
      `Senha temporária: ${senhaGerada}`

    navigator.clipboard.writeText(texto)

    setCopiado(true)

    setTimeout(() => setCopiado(false), 2000)

  }


  function novoCadastro() {

    setEscola({
      nome: "",
      codigoInep: "",
      rede: "Pública Estadual",
      cidade: "",
      estado: ""
    })

    setAdmin({
      nome: "",
      cargo: "Coordenador(a)",
      email: ""
    })

    setSenhaGerada("")

    setEtapa(1)

  }


  return (

    <div className="cadastro-escola-page">

      <div className="cadastro-escola-card">


        <div className="cadastro-escola-header">

          <span className="painel-interno-tag">
            Painel interno — uso exclusivo da equipe PresenSee
          </span>

          <h1>
            Cadastrar nova escola
          </h1>

          {etapa < 3 && (

            <div className="cadastro-escola-steps">

              <div className={`step ${etapa >= 1 ? "ativo" : ""}`}>
                1. Escola
              </div>

              <div className="step-linha" />

              <div className={`step ${etapa >= 2 ? "ativo" : ""}`}>
                2. Admin
              </div>

            </div>

          )}

        </div>


        {/* =========================
            ETAPA 1 — DADOS DA ESCOLA
        ========================= */}

        {etapa === 1 && (

          <form onSubmit={avancarParaAdmin}>

            <label>Nome da escola</label>
            <input
              className="cadastro-input"
              type="text"
              placeholder="Ex: Escola Técnica Estadual"
              value={escola.nome}
              onChange={(e) => atualizarEscola("nome", e.target.value)}
              required
            />

            <label>Código INEP</label>
            <input
              className="cadastro-input"
              type="text"
              placeholder="Ex: 26123456"
              value={escola.codigoInep}
              onChange={(e) => atualizarEscola("codigoInep", e.target.value)}
            />

            <label>Rede de ensino</label>
            <select
              className="cadastro-input"
              value={escola.rede}
              onChange={(e) => atualizarEscola("rede", e.target.value)}
            >
              <option>Pública Estadual</option>
              <option>Pública Municipal</option>
              <option>Privada</option>
            </select>

            <div className="cadastro-linha-dupla">

              <div>
                <label>Cidade</label>
                <input
                  className="cadastro-input"
                  type="text"
                  value={escola.cidade}
                  onChange={(e) => atualizarEscola("cidade", e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Estado</label>
                <input
                  className="cadastro-input"
                  type="text"
                  placeholder="PE"
                  maxLength={2}
                  value={escola.estado}
                  onChange={(e) => atualizarEscola("estado", e.target.value.toUpperCase())}
                  required
                />
              </div>

            </div>

            <button className="cadastro-button" type="submit">
              Continuar
            </button>

          </form>

        )}


        {/* =========================
            ETAPA 2 — DADOS DO ADMIN
        ========================= */}

        {etapa === 2 && (

          <form onSubmit={finalizarCadastro}>

            <label>Nome completo</label>
            <input
              className="cadastro-input"
              type="text"
              value={admin.nome}
              onChange={(e) => atualizarAdmin("nome", e.target.value)}
              required
            />

            <label>Cargo</label>
            <select
              className="cadastro-input"
              value={admin.cargo}
              onChange={(e) => atualizarAdmin("cargo", e.target.value)}
            >
              <option>Diretor(a)</option>
              <option>Coordenador(a)</option>
              <option>Secretaria</option>
            </select>

            <label>E-mail institucional</label>
            <input
              className="cadastro-input"
              type="email"
              placeholder="nome@escola.edu.br"
              value={admin.email}
              onChange={(e) => atualizarAdmin("email", e.target.value)}
              required
            />

            <div className="cadastro-botoes-duplos">

              <button
                type="button"
                className="cadastro-button-voltar"
                onClick={() => setEtapa(1)}
              >
                Voltar
              </button>

              <button className="cadastro-button" type="submit">
                Cadastrar escola
              </button>

            </div>

          </form>

        )}


        {/* =========================
            ETAPA 3 — CONFIRMAÇÃO
        ========================= */}

        {etapa === 3 && (

          <div className="cadastro-confirmacao">

            <div className="confirmacao-icone">✓</div>

            <h2>Escola cadastrada!</h2>

            <p>
              Copie as credenciais abaixo e envie pra administração
              da escola. Peça pra trocarem a senha no primeiro acesso.
            </p>

            <div className="credenciais-box">

              <div>
                <span>Escola</span>
                <strong>{escola.nome}</strong>
              </div>

              <div>
                <span>Login</span>
                <strong>{admin.email}</strong>
              </div>

              <div>
                <span>Senha temporária</span>
                <strong>{senhaGerada}</strong>
              </div>

            </div>

            <button
              className="cadastro-button"
              onClick={copiarCredenciais}
            >
              {copiado ? "Copiado ✓" : "Copiar credenciais"}
            </button>

            <button
              className="cadastro-button-voltar"
              onClick={novoCadastro}
            >
              Cadastrar outra escola
            </button>

          </div>

        )}


      </div>

    </div>

  )

}

export default CadastroEscola