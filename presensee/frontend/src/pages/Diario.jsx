import { useState } from "react"
import { Link } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"
import GaugeChart from "../components/GaugeChart"
import ExpandButton from "../components/ExpandButton"
import AlunoModal from "../components/AlunoModal"
import { MascotAvatar } from "../components/Icons"
import {
  alunos,
  intervencoes,
  turmas,
  anotacoes,
  resumoDiario,
  formatarData,
  nivelRisco
} from "../data/diarioMock"
import "../styles/Diario.css"

function nomeDoAluno(id) {
  return alunos.find(aluno => aluno.id === id)?.nome
}

function Diario() {

  // Um bloco aberto por vez
  const [aberto, setAberto] = useState(null)

  const [alunoModal, setAlunoModal] = useState(null)

  const avatar = localStorage.getItem("avatarUsuario") || ""

  function alternar(chave) {
    setAberto(atual => (atual === chave ? null : chave))
  }


  const secoes = [

    {
      chave: "intervencoes",
      titulo: "Ver todas as intervenções",
      vazio: "Nenhuma intervenção registrada.",
      itens: intervencoes.map(item => (
        <li key={item.id}>
          <span>{nomeDoAluno(item.alunoId)} — {item.tipo}</span>
          <small>{formatarData(item.data)}</small>
        </li>
      ))
    },

    {
      chave: "turmas",
      titulo: "Ver todas as turmas",
      vazio: "Nenhuma turma cadastrada.",
      itens: turmas.map(turma => (
        <li key={turma.nome}>
          <span>{turma.nome} — {turma.alunos} alunos</span>
          <small>{turma.risco}% de risco</small>
        </li>
      ))
    },

    {
      chave: "alunos",
      titulo: "Ver todos os alunos",
      vazio: "Nenhum aluno cadastrado.",
      itens: alunos.map(aluno => (
        <li key={aluno.id}>
          <span className="diario-aluno">
            <span className={`risk-dot ${nivelRisco(aluno.risco)}`}></span>
            {aluno.nome}
            <small>{aluno.turma}</small>
          </span>
          <button
              type="button"
              className="diario-ver-dados"
              onClick={() => setAlunoModal(aluno)}
            >
              Ver dados
            </button>
          <Link to={`/diario/aluno/${aluno.id}`} className="diario-acompanhar">
            Acompanhar
          </Link>
        </li>
      ))
    },

    {
      chave: "anotacoes",
      titulo: "Anotações",
      vazio: "Nenhuma anotação ainda.",
      itens: anotacoes.map(nota => (
        <li key={nota.id} className="nota">
          <small>{formatarData(nota.data)}</small>
          <span>{nota.texto}</span>
        </li>
      ))
    }

  ]


  return (

    <DashboardLayout>

      <div className="diario-page">


        <div className="dashboard-header">

          <div className="dashboard-header-left">

            <div className="dashboard-avatar diario-avatar">

              {avatar ? (
                <img src={avatar} alt="Foto do usuário" />
              ) : (
                <MascotAvatar size={72} />
              )}

            </div>

            <h1>
              Diário do Monitor
            </h1>

          </div>

        </div>


        <div className="diario-grid">


          <div className="diario-coluna-esquerda">

            <h2 className="diario-total-titulo">
              Total de Intervenções
            </h2>

            <strong className="diario-total-valor">
              {intervencoes.length}
            </strong>


            <div className="diario-acordeoes">

              {secoes.map(secao => (

                <div key={secao.chave}>

                  <ExpandButton
                    label={secao.titulo}
                    aberto={aberto === secao.chave}
                    onClick={() => alternar(secao.chave)}
                  />

                  {aberto === secao.chave && (

                    <div className="diario-painel">

                      {secao.itens.length > 0 ? (
                        <ul className="diario-lista">
                          {secao.itens}
                        </ul>
                      ) : (
                        <p className="diario-vazio">
                          {secao.vazio}
                        </p>
                      )}

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>


          <div className="diario-coluna-direita">

            <section>

              <h2 className="gauge-titulo">
                Risco de evasão geral
              </h2>

              <div className="card-branco gauge-card-diario">
                <GaugeChart value={resumoDiario.riscoEvasaoGeral} />
              </div>

            </section>


            <section>

              <h2 className="gauge-titulo">
                Seu desempenho
              </h2>

              <div className="card-branco gauge-card-diario">
                <GaugeChart value={resumoDiario.desempenhoMonitor} />
              </div>

            </section>

          </div>


        </div>

      </div>

      {alunoModal && (
        <AlunoModal
          aluno={alunoModal}
          onClose={() => setAlunoModal(null)}
        />
      )}

    </DashboardLayout>

  )

}

export default Diario