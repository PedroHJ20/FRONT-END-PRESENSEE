
import DashboardLayout from "../layouts/DashboardLayout"
import "../styles/Alunos.css"
import { useMemo, useState } from "react"

function Alunos() {

  const [alunos] = useState([
    {
      nome: "Maria Joaquina",
      matricula: "001",
      turma: "3A",
      frequencia: 95,
      risco: "Baixo"
    },
    {
      nome: "João Silva",
      matricula: "002",
      turma: "2B",
      frequencia: 87,
      risco: "Baixo"
    },
    {
      nome: "Marcos Heitor",
      matricula: "003",
      turma: "3A",
      frequencia: 82,
      risco: "Médio"
    },
    {
      nome: "Ana Beatriz",
      matricula: "004",
      turma: "1A",
      frequencia: 76,
      risco: "Médio"
    },
    {
      nome: "Pedro Henrique",
      matricula: "005",
      turma: "2B",
      frequencia: 66,
      risco: "Alto"
    },
    {
      nome: "Gabriel Soares",
      matricula: "006",
      turma: "2B",
      frequencia: 65,
      risco: "Alto"
    }
  ])

  const [busca, setBusca] = useState("")
  const [turmaSelecionada, setTurmaSelecionada] = useState("")
  const [riscoSelecionado, setRiscoSelecionado] = useState("")
  const [frequenciaSelecionada, setFrequenciaSelecionada] = useState("")

  const alunosFiltrados = useMemo(() => {

    return alunos.filter((aluno) => {

      const nomeCorresponde =
        aluno.nome.toLowerCase().includes(busca.toLowerCase())

      const turmaCorresponde =
        turmaSelecionada === "" ||
        aluno.turma === turmaSelecionada

      const riscoCorresponde =
        riscoSelecionado === "" ||
        aluno.risco === riscoSelecionado

      let frequenciaCorresponde = true

      if (frequenciaSelecionada === "acima-80") {
        frequenciaCorresponde = aluno.frequencia > 80
      }

      if (frequenciaSelecionada === "70-80") {
        frequenciaCorresponde =
          aluno.frequencia >= 70 &&
          aluno.frequencia <= 80
      }

      if (frequenciaSelecionada === "abaixo-70") {
        frequenciaCorresponde = aluno.frequencia < 70
      }

      return (
        nomeCorresponde &&
        turmaCorresponde &&
        riscoCorresponde &&
        frequenciaCorresponde
      )
    })

  }, [
    alunos,
    busca,
    turmaSelecionada,
    riscoSelecionado,
    frequenciaSelecionada
  ])

  const [alunoSelecionado, setAlunoSelecionado] = useState(null)

  const [mostrarFrequencia, setMostrarFrequencia] =
    useState(false)

  const [mostrarNotas, setMostrarNotas] =
    useState(false)

  const [mostrarOcorrencias, setMostrarOcorrencias] =
    useState(false)

  const [mesSelecionado, setMesSelecionado] =
    useState("Agosto")

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ]

  const dadosFrequencia = {
    Janeiro: { dias: 31, faltas: 2 },
    Fevereiro: { dias: 28, faltas: 3 },
    Março: { dias: 31, faltas: 2 },
    Abril: { dias: 30, faltas: 4 },
    Maio: { dias: 31, faltas: 3 },
    Junho: { dias: 30, faltas: 4 },
    Julho: { dias: 31, faltas: 5 },
    Agosto: { dias: 15, faltas: 3 },
    Setembro: { dias: 30, faltas: 2 },
    Outubro: { dias: 31, faltas: 3 },
    Novembro: { dias: 30, faltas: 2 },
    Dezembro: { dias: 31, faltas: 1 }
  }

  function abrirAluno(aluno) {
    setAlunoSelecionado(aluno)
    setMostrarFrequencia(false)
    setMostrarNotas(false)
    setMostrarOcorrencias(false)
  }

  function fecharAluno() {
    setAlunoSelecionado(null)
    setMostrarFrequencia(false)
    setMostrarNotas(false)
    setMostrarOcorrencias(false)
  }

  function abrirFrequencia() {
    setMostrarFrequencia(true)
    setMostrarNotas(false)
    setMostrarOcorrencias(false)
  }

  function abrirNotas() {
    setMostrarNotas(true)
    setMostrarFrequencia(false)
    setMostrarOcorrencias(false)
  }

  function abrirOcorrencias() {
    setMostrarOcorrencias(true)
    setMostrarFrequencia(false)
    setMostrarNotas(false)
  }

  function voltarParaAluno() {
    setMostrarFrequencia(false)
    setMostrarNotas(false)
    setMostrarOcorrencias(false)
  }

  const dadosMesAtual =
    dadosFrequencia[mesSelecionado]

  const diasDoMes = useMemo(() => {

    const dias = []

    for (
      let dia = 1;
      dia <= dadosMesAtual.dias;
      dia++
    ) {

      const faltou =
        dia % 7 === 0 ||
        dia === 5 ||
        dia === 12

      dias.push({
        dia: dia,
        status: faltou ? "falta" : "presente"
      })
    }

    return dias

  }, [dadosMesAtual])

  const percentualFrequencia = useMemo(() => {

    const presentes =
      diasDoMes.filter(
        (dia) => dia.status === "presente"
      ).length

    return Math.round(
      (presentes / diasDoMes.length) * 100
    )

  }, [diasDoMes])

  const [mesNotas, setMesNotas] = useState("Agosto")

const notasPorMes = {
  Julho: [
    { disciplina: "Matemática", n1: 6.0, n2: 7.0 },
    { disciplina: "Dev. Mobile", n1: 7.5, n2: 8.0 },
    { disciplina: "História", n1: 6.5, n2: 6.0 },
    { disciplina: "Português", n1: 7.0, n2: 7.0 },
    { disciplina: "PI", n1: 8.0, n2: 7.5 },
    { disciplina: "Inglês", n1: 6.0, n2: 6.5 }
  ],
  Agosto: [
    { disciplina: "Matemática", n1: 7.0, n2: 3.0 },
    { disciplina: "Dev. Mobile", n1: 7.0, n2: 3.0 },
    { disciplina: "História", n1: 7.0, n2: 3.0 },
    { disciplina: "Português", n1: 7.0, n2: 3.0 },
    { disciplina: "PI", n1: 7.0, n2: 3.0 },
    { disciplina: "Inglês", n1: 7.0, n2: 3.0 }
  ]
}

const notasDoMes = (notasPorMes[mesNotas] || []).map((n) => {
  const media = (n.n1 + n.n2) / 2

  let tendencia = "estavel"
  if (n.n2 > n.n1) tendencia = "subindo"
  if (n.n2 < n.n1) tendencia = "caindo"

  return { ...n, media, tendencia }
})

function classeNota(valor) {
  if (valor < 5) return "nota-baixa"
  if (valor < 7) return "nota-media"
  return "nota-alta"
}

const textoTendencia = {
  subindo: "↑ Subindo",
  caindo: "↓ Caindo",
  estavel: "→ Estável"
}

const ocorrencias = [
  {
    tipo: "falta",
    icone: "⚠️",
    titulo: "Falta injustificada",
    data: "12 de Agosto",
    descricao: "Aluno não compareceu à aula."
  },
  {
    tipo: "desempenho",
    icone: "📝",
    titulo: "Baixo desempenho",
    data: "08 de Agosto",
    descricao: "Desempenho abaixo da média na avaliação."
  },
  {
    tipo: "conversa",
    icone: "💬",
    titulo: "Conversa com o monitor",
    data: "05 de Agosto",
    descricao: "Conversa realizada para acompanhamento do aluno."
  },
  {
    tipo: "falta",
    icone: "⚠️",
    titulo: "Faltas recorrentes",
    data: "01 de Agosto",
    descricao: "Registrado aumento no número de faltas."
  }
]

  return (

    <DashboardLayout>

      <div className="alunos-page">

        <div className="alunos-header">
          <div>
            <h1>
              Olá, Visitante!
            </h1>

            <p>
              Alunos
            </p>
          </div>
        </div>

        <input
          className="search-aluno"
          type="text"
          placeholder="Buscar aluno..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <div className="filters">

          <select
            value={turmaSelecionada}
            onChange={(e) =>
              setTurmaSelecionada(e.target.value)
            }
          >
            <option value="">
              Turma
            </option>

            <option value="1A">
              1A
            </option>

            <option value="2B">
              2B
            </option>

            <option value="3A">
              3A
            </option>
          </select>

          <select
            value={riscoSelecionado}
            onChange={(e) =>
              setRiscoSelecionado(e.target.value)
            }
          >
            <option value="">
              Nível de risco
            </option>

            <option value="Baixo">
              Baixo
            </option>

            <option value="Médio">
              Médio
            </option>

            <option value="Alto">
              Alto
            </option>
          </select>

          <select
            value={frequenciaSelecionada}
            onChange={(e) =>
              setFrequenciaSelecionada(e.target.value)
            }
          >
            <option value="">
              Frequência
            </option>

            <option value="acima-80">
              Acima de 80%
            </option>

            <option value="70-80">
              Entre 70% e 80%
            </option>

            <option value="abaixo-70">
              Abaixo de 70%
            </option>
          </select>

        </div>

        <table className="students-table">

          <thead>
            <tr>
              <th>Aluno</th>
              <th>Turma</th>
              <th>Frequência</th>
              <th>Risco</th>
            </tr>
          </thead>

          <tbody>

            {alunosFiltrados.map((aluno) => (

              <tr
                key={aluno.matricula}
                onClick={() => abrirAluno(aluno)}
              >

                <td>
                  {aluno.nome}
                </td>

                <td>
                  {aluno.turma}
                </td>

                <td>
                  {aluno.frequencia}%
                </td>

                <td>

                  <span
                    className={
                      `risk-status ${aluno.risco.toLowerCase()}`
                    }
                  >

                    <span className="risk-dot"></span>

                    {aluno.risco}

                  </span>

                </td>

              </tr>

            ))}

            {alunosFiltrados.length === 0 && (

              <tr>
                <td colSpan="4">
                  Nenhum aluno encontrado.
                </td>
              </tr>

            )}

          </tbody>

        </table>

        <div className="pagination">

          <span>
            {alunosFiltrados.length} aluno(s) encontrado(s)
          </span>

          <button>
            ‹
          </button>

          <button className="current-page">
            1
          </button>

          <span>
            de 1
          </span>

          <button>
            ›
          </button>

        </div>

      </div>


      {/* POPUP PRINCIPAL */}

      {alunoSelecionado &&
        !mostrarFrequencia &&
        !mostrarNotas &&
        !mostrarOcorrencias && (

        <div
          className="student-modal-overlay"
          onClick={fecharAluno}
        >

          <div
            className="student-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-modal"
              onClick={fecharAluno}
            >
              ×
            </button>

            <div className="student-modal-header">

              <div className="student-avatar">
                👤
              </div>

              <div>

                <h2>
                  {alunoSelecionado.nome}
                </h2>

                <p>
                  {alunoSelecionado.turma}
                </p>

              </div>

              <span
                className={
                  `modal-risk ${alunoSelecionado.risco.toLowerCase()}`
                }
              >
                Risco {alunoSelecionado.risco}
              </span>

            </div>

            <div className="student-summary">

              <div>

                <strong>
                  5.0
                </strong>

                <span>
                  Média geral
                </span>

              </div>

              <div>

                <strong>
                  4
                </strong>

                <span>
                  Ocorrências
                </span>

              </div>

              <button
                className="frequency-summary"
                onClick={abrirFrequencia}
              >

                <strong>
                  {alunoSelecionado.frequencia}%
                </strong>

                <span>
                  Frequência geral
                </span>

              </button>

            </div>

            <div className="risk-reason">

              <h3>
                Por que este aluno está em risco?
              </h3>

              <div>
                🟡 Frequência caindo progressivamente
              </div>

              <div>
                🟡 Queda das notas
              </div>

              <div>
                🟡 Faltas recentes
              </div>

              <div>
                🟡 Ocorrências recentes
              </div>

            </div>

            <div className="student-actions">

              <button onClick={abrirNotas}>
                📝
                <span>
                  Notas
                </span>
              </button>

              <button onClick={abrirOcorrencias}>
                📋
                <span>
                  Ocorrências
                </span>
              </button>

              <button>
                📖
                <span>
                  Diário do monitor
                </span>
              </button>

            </div>

          </div>

        </div>

      )}


      {/* POPUP FREQUÊNCIA */}

      {alunoSelecionado && mostrarFrequencia && (

        <div
          className="student-modal-overlay"
          onClick={fecharAluno}
        >

          <div
            className="frequency-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-modal"
              onClick={fecharAluno}
            >
              ×
            </button>

            <div className="frequency-student-header">

              <div className="student-avatar">
                👤
              </div>

              <div>

                <h2>
                  {alunoSelecionado.nome}
                </h2>

                <p>
                  {alunoSelecionado.turma}
                </p>

              </div>

              <span
                className={
                  `modal-risk ${alunoSelecionado.risco.toLowerCase()}`
                }
              >
                Risco {alunoSelecionado.risco}
              </span>

            </div>

            <div className="frequency-title">

              <div>

                <h2>
                  Frequência Geral
                </h2>

                <select
                  className="frequency-month-select"
                  value={mesSelecionado}
                  onChange={(e) =>
                    setMesSelecionado(e.target.value)
                  }
                >

                  {meses.map((mes) => (

                    <option
                      key={mes}
                      value={mes}
                    >
                      {mes}
                    </option>

                  ))}

                </select>

              </div>

              <div className="frequency-circle">

                <span>
                  {percentualFrequencia}%
                </span>

              </div>

            </div>

            <div className="frequency-week">

              <span>seg</span>
              <span>ter</span>
              <span>qua</span>
              <span>qui</span>
              <span>sex</span>

            </div>

            <div className="frequency-grid">

              {diasDoMes.map((dia) => (

                <div
                  className="frequency-day"
                  key={dia.dia}
                >

                  <span className="day-number">
                    {dia.dia}
                  </span>

                  <span
                    className={
                      `day-status ${dia.status}`
                    }
                  >
                    {dia.status === "presente"
                      ? "✓"
                      : "×"
                    }
                  </span>

                </div>

              ))}

            </div>

            <button
              className="back-frequency"
              onClick={voltarParaAluno}
            >
              ← Voltar
            </button>

          </div>

        </div>

      )}


    {/* POPUP NOTAS */}

{alunoSelecionado && mostrarNotas && (

  <div className="student-modal-overlay" onClick={fecharAluno}>

    <div
      className="detail-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <button className="close-modal" onClick={fecharAluno}>
        ×
      </button>

      <div className="detail-student-header">
        <div className="student-avatar">👤</div>

        <div>
          <h2>{alunoSelecionado.nome}</h2>
          <p>{alunoSelecionado.turma}</p>
        </div>

        <span className={`modal-risk ${alunoSelecionado.risco.toLowerCase()}`}>
          Risco {alunoSelecionado.risco}
        </span>
      </div>

      <h2 className="detail-title">Notas</h2>

      <div className="notes-filter">
        <label htmlFor="mes-notas">Ver de</label>

        <select
          id="mes-notas"
          value={mesNotas}
          onChange={(e) => setMesNotas(e.target.value)}
        >
          {meses.map((mes) => (
            <option key={mes} value={mes}>
              {mes}
            </option>
          ))}
        </select>
      </div>

      {notasDoMes.length > 0 ? (
        <>
          <div className="notes-table-wrapper">
            <table className="notes-table">
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>1</th>
                  <th>2</th>
                  <th>Média</th>
                  <th>Tendência</th>
                </tr>
              </thead>

              <tbody>
                {notasDoMes.map((nota) => (
                  <tr key={nota.disciplina}>
                    <td className="note-subject">{nota.disciplina}</td>
                    <td>{nota.n1.toFixed(1)}</td>
                    <td>{nota.n2.toFixed(1)}</td>
                    <td>
                      <span className={`note-badge ${classeNota(nota.media)}`}>
                        {nota.media.toFixed(1)}
                      </span>
                    </td>
                    <td>
                      <span className={`trend ${nota.tendencia}`}>
                        {textoTendencia[nota.tendencia]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="notes-average">
            <span>Média geral do mês</span>
            <strong>
              {(
                notasDoMes.reduce((soma, n) => soma + n.media, 0) /
                notasDoMes.length
              ).toFixed(1)}
            </strong>
          </div>
        </>
      ) : (
        <p className="empty-message">
          Sem notas registradas neste mês.
        </p>
      )}

      <button className="back-frequency" onClick={voltarParaAluno}>
        ← Voltar
      </button>

    </div>

  </div>

)}


{/* POPUP OCORRÊNCIAS */}

{alunoSelecionado && mostrarOcorrencias && (

  <div className="student-modal-overlay" onClick={fecharAluno}>

    <div
      className="detail-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <button className="close-modal" onClick={fecharAluno}>
        ×
      </button>

      <div className="detail-student-header">
        <div className="student-avatar">👤</div>

        <div>
          <h2>{alunoSelecionado.nome}</h2>
          <p>{alunoSelecionado.turma}</p>
        </div>

        <span className={`modal-risk ${alunoSelecionado.risco.toLowerCase()}`}>
          Risco {alunoSelecionado.risco}
        </span>
      </div>

      <h2 className="detail-title">Ocorrências</h2>

      <p className="detail-subtitle">
        Histórico de ocorrências do aluno
      </p>

      <div className="occurrences-list">
        {ocorrencias.map((item, index) => (
          <div className={`occurrence-item ${item.tipo}`} key={index}>

            <div className="occurrence-icon">{item.icone}</div>

            <div className="occurrence-content">
              <div className="occurrence-top">
                <strong>{item.titulo}</strong>
                <span>{item.data}</span>
              </div>

              <p>{item.descricao}</p>
            </div>

          </div>
        ))}
      </div>

      <button className="back-frequency" onClick={voltarParaAluno}>
        ← Voltar
      </button>

    </div>

  </div>

)}

    </DashboardLayout>

  )
}

export default Alunos
