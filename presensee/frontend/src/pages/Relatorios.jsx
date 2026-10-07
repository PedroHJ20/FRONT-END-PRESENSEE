import DashboardLayout from "../layouts/DashboardLayout"
import "../styles/Relatorios.css"

// Substitua por dados vindos da API quando estiver pronta
const resumo = [
  { titulo: "Frequência Geral", valor: "87%" },
  { titulo: "Total de Alunos", valor: "120" },
  { titulo: "Alunos em Risco", valor: "12" },
]

const turmas = [
  { turma: "1º Ano A", alunos: 35, frequencia: 92 },
  { turma: "2º Ano B", alunos: 32, frequencia: 87 },
  { turma: "3º Ano A", alunos: 30, frequencia: 78 },
]

function nivelFrequencia(valor) {
  if (valor >= 90) return "ok"
  if (valor >= 80) return "atencao"
  return "risco"
}

function Relatorios() {
  function handleGerarRelatorio() {
    // Separador ";" e BOM UTF-8 para o Excel em português abrir com acentos corretos
    const linhas = [
      ["Relatório de Frequência - PresenSee"],
      ["Gerado em", new Date().toLocaleString("pt-BR")],
      [],
      ["Resumo"],
      ...resumo.map((item) => [item.titulo, item.valor]),
      [],
      ["Frequência por Turma"],
      ["Turma", "Alunos", "Frequência"],
      ...turmas.map((item) => [item.turma, item.alunos, `${item.frequencia}%`]),
    ]

    const csv = linhas.map((linha) => linha.join(";")).join("\n")
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "relatorio-frequencia.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <DashboardLayout>
      <div className="page-header report-header">
        <h1>Relatórios</h1>

        <button className="report-button" onClick={handleGerarRelatorio}>
          Gerar Relatório
        </button>
      </div>

      <div className="report-cards">
        {resumo.map((item) => (
          <div className="report-card" key={item.titulo}>
            <h3>{item.titulo}</h3>
            <p>{item.valor}</p>
          </div>
        ))}
      </div>

      <div className="report-table-container">
        <h2>Frequência por Turma</h2>

        <div className="report-table-scroll">
          <table className="report-table">
            <thead>
              <tr>
                <th>Turma</th>
                <th>Alunos</th>
                <th>Frequência</th>
              </tr>
            </thead>

            <tbody>
              {turmas.map((item) => (
                <tr key={item.turma}>
                  <td>{item.turma}</td>
                  <td>{item.alunos}</td>
                  <td>
                    <span className={`report-badge report-badge--${nivelFrequencia(item.frequencia)}`}>
                      {item.frequencia}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Relatorios
