import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"
import GaugeChart from "../components/GaugeChart"
import ExpandButton from "../components/ExpandButton"
import {
  alunos,
  intervencoes as intervencoesMock,
  TIPOS_INTERVENCAO,
  formatarData,
  dataHoje,
  nivelRisco
} from "../data/diarioMock"
import "../styles/Diario.css"

function corFrequencia(valor) {
  if (valor < 75) return "#ff0000"
  if (valor < 90) return "#e5b500"
  return "#22c55e"
}

function AlunoPerfil() {

  const { id } = useParams()

  const aluno = alunos.find(item => item.id === Number(id))


  const [intervencoes, setIntervencoes] = useState(
    intervencoesMock.filter(item => item.alunoId === Number(id))
  )

  const [pendencias, setPendencias] = useState(
    (aluno?.pendencias || []).map(texto => ({ texto, feita: false }))
  )

  const [dadosAberto, setDadosAberto] = useState(false)
  const [historicoAberto, setHistoricoAberto] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)

  const [tipo, setTipo] = useState(TIPOS_INTERVENCAO[0])
  const [descricao, setDescricao] = useState("")


  if (!aluno) {

    return (

      <DashboardLayout>

        <div className="page-header">
          <h1>Aluno não encontrado</h1>
        </div>

        <Link to="/diario" className="diario-link-aluno">
          Voltar para o Diário do Monitor
        </Link>

      </DashboardLayout>

    )

  }


  const ultima = intervencoes[0]


  function alternarPendencia(indice) {

    setPendencias(lista =>
      lista.map((item, i) =>
        i === indice ? { ...item, feita: !item.feita } : item
      )
    )

  }


  function fecharModal() {

    setModalAberto(false)
    setTipo(TIPOS_INTERVENCAO[0])
    setDescricao("")

  }


  function salvarIntervencao(e) {

    e.preventDefault()

    const nova = {
      id: Date.now(),
      alunoId: aluno.id,
      tipo,
      data: dataHoje(),
      descricao: descricao.trim()
    }

    setIntervencoes(lista => [nova, ...lista])

    fecharModal()

  }


  return (

    <DashboardLayout>

      <div className="perfil-page">


        {/* LINHA 1: FICHA + FREQUÊNCIA + FALTAS */}

        <div className="perfil-linha perfil-linha-topo">


          <div className="perfil-ficha">

            <div className="perfil-ficha-topo">

              <div className="perfil-foto"></div>

              <div>
                <h1>{aluno.nome}</h1>
                <p>{aluno.turma}</p>
              </div>

            </div>


            <div className="perfil-status">

              <div>
                <span className={`risk-dot ${nivelRisco(aluno.risco)}`}></span>
                {aluno.status}
              </div>

              <div>
                <span className={`risk-dot ${nivelRisco(aluno.risco)}`}></span>
                Risco Atual: {aluno.risco}%
              </div>

            </div>


            <ExpandButton
              label="Dados do Aluno"
              small
              aberto={dadosAberto}
              onClick={() => setDadosAberto(!dadosAberto)}
            />

            {dadosAberto && (

              <dl className="perfil-dados">

                <dt>Matrícula</dt>
                <dd>{aluno.matricula}</dd>

                <dt>Email</dt>
                <dd>{aluno.email}</dd>

                <dt>Responsável</dt>
                <dd>{aluno.responsaveis.map(r => r.nome).join(", ")}</dd>

              </dl>

            )}

          </div>


          <div className="card-branco perfil-card-gauge">

            <h2>Frequência</h2>

            <div className="perfil-gauge">
              <GaugeChart
                value={aluno.frequencia}
                color={corFrequencia(aluno.frequencia)}
              />
            </div>

          </div>


          <div className="card-branco perfil-card-faltas">

            <h2>Faltas</h2>

            <strong>{aluno.faltas}</strong>

          </div>


        </div>


        {/* LINHA 2: INTERVENÇÕES */}

        <div className="perfil-linha perfil-linha-meio">


          <div className="card-branco perfil-card-quantidade">

            <div className="perfil-card-titulo-linha">

              <h2>Quantidade de Intervenções</h2>

              <strong>{intervencoes.length}</strong>

            </div>

            <ExpandButton
              label="Nova intervenção"
              icone="plus"
              small
              onClick={() => setModalAberto(true)}
            />

          </div>


          <div className="card-branco perfil-card-ultima">

            <h2>Última intervenção</h2>

            {ultima ? (

              <>

                <p className="perfil-ultima-data">
                  {formatarData(ultima.data)}
                </p>

                <p>
                  <span className="perfil-tipo">{ultima.tipo}</span> com o aluno
                </p>

              </>

            ) : (

              <p className="diario-vazio">
                Nenhuma intervenção registrada.
              </p>

            )}

            <ExpandButton
              label="Ver todas as informações"
              small
              aberto={historicoAberto}
              onClick={() => setHistoricoAberto(!historicoAberto)}
            />

            {historicoAberto && (

              <ul className="diario-lista perfil-historico">

                {intervencoes.map(item => (

                  <li key={item.id}>
                    <span>
                      <strong>{item.tipo}</strong>
                      {item.descricao && ` — ${item.descricao}`}
                    </span>
                    <small>{formatarData(item.data)}</small>
                  </li>

                ))}

              </ul>

            )}

          </div>


        </div>


        {/* PENDÊNCIAS */}

        <section className="perfil-pendencias">

          <h2>Pendências</h2>

          {pendencias.length > 0 ? (

            <div className="perfil-pendencias-lista">

              {pendencias.map((item, indice) => (

                <label key={item.texto} className={item.feita ? "feita" : ""}>

                  <input
                    type="checkbox"
                    checked={item.feita}
                    onChange={() => alternarPendencia(indice)}
                  />

                  {item.texto}

                </label>

              ))}

            </div>

          ) : (

            <p className="diario-vazio">
              Nenhuma pendência para este aluno.
            </p>

          )}

        </section>


      </div>


      {/* MODAL: NOVA INTERVENÇÃO */}

      {modalAberto && (

        <div className="interv-overlay" onClick={fecharModal}>

          <form
            className="interv-modal"
            onClick={(e) => e.stopPropagation()}
            onSubmit={salvarIntervencao}
          >

            <h2>Nova intervenção</h2>

            <label htmlFor="interv-tipo">Tipo</label>

            <select
              id="interv-tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              {TIPOS_INTERVENCAO.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <label htmlFor="interv-descricao">Descrição</label>

            <textarea
              id="interv-descricao"
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="O que foi conversado ou combinado"
            />

            <div className="interv-acoes">

              <button type="button" className="interv-cancelar" onClick={fecharModal}>
                Cancelar
              </button>

              <button type="submit" className="interv-salvar">
                Salvar intervenção
              </button>

            </div>

          </form>

        </div>

      )}


    </DashboardLayout>

  )

}

export default AlunoPerfil
