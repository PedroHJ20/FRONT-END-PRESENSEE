import DashboardLayout from "../layouts/DashboardLayout"
import { useEffect, useState } from "react"
import api from "../services/api"
import { getUsuario, getToken } from "../services/auth"
import { MascotAvatar, IconAlunos, IconAlertas } from "../components/Icons"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from "recharts"

function Dashboard() {

  const [dados, setDados] = useState(null)

  const [usuario, setUsuario] = useState(null)

  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatarUsuario") || ""
  )

  const [carregando, setCarregando] = useState(true)

  const [erro, setErro] = useState("")


  const alertas = [

    {
      aluno: "João Silva",
      percentual: "87%",
      nivel: "alto"
    },

    {
      aluno: "Marcos Heitor",
      percentual: "82%",
      nivel: "alto"
    },

    {
      aluno: "João Silva",
      percentual: "65%",
      nivel: "medio"
    }

  ]


  const riscoPorTurma = [

    {
      turma: "3A",
      percentual: 70
    },

    {
      turma: "2B",
      percentual: 50
    },

    {
      turma: "1A",
      percentual: 30
    }

  ]


  const frequenciaPorDia = [

    { dia: "Seg", frequencia: 92 },
    { dia: "Ter", frequencia: 94 },
    { dia: "Qua", frequencia: 90 },
    { dia: "Qui", frequencia: 93 },
    { dia: "Sex", frequencia: 85 }

  ]


  const distribuicaoRisco = [

    { nome: "Baixo", valor: 250, cor: "#22c55e" },
    { nome: "Médio", valor: 80, cor: "#fdcb6e" },
    { nome: "Alto", valor: 20, cor: "#ef4444" }

  ]


  const frequenciaPorTurma = [

    { turma: "1A", frequencia: 92 },
    { turma: "2B", frequencia: 85 },
    { turma: "3A", frequencia: 78 }

  ]


  // Dados do gráfico de evolução: vêm da API (trazido pela Echilin).
  // Enquanto não responde, fica em branco e mostra o aviso abaixo.
  const [evolucaoRisco, setEvolucaoRisco] = useState([])

  const evolucaoDemo = [

    { periodo: "Mar", risco: 22 },
    { periodo: "Abr", risco: 35 },
    { periodo: "Mai", risco: 38 },
    { periodo: "Jun", risco: 58 },
    { periodo: "Jul", risco: 64 }

  ]


  useEffect(() => {

    setUsuario(getUsuario())

    setAvatar(
      localStorage.getItem("avatarUsuario") || ""
    )

  }, [])


  useEffect(() => {

    const token = getToken()


    if (token === "token-demo") {

      setDados({

        totalAlunos: 350,

        alunosRisco: 20,

        alunosAltoRisco: 7,

        taxaFrequenciaGeral: 95,

        alertasAbertos: 5

      })

      setEvolucaoRisco(evolucaoDemo)

      setCarregando(false)

      return

    }


    // Gráfico carregado à parte: se falhar, o resto do dashboard continua funcionando
    api.get("/dashboard/evolucao-risco")

      .then(response => {

        setEvolucaoRisco(response.data)

      })

      .catch(error => {

        console.log(error)

        setEvolucaoRisco([])

      })


    api.get("/dashboard/resumo")

      .then(response => {

        setDados(response.data)

        setCarregando(false)

      })

      .catch(error => {

        console.log(error)

        setErro(
          "Não foi possível carregar os dados do dashboard."
        )

        setCarregando(false)

      })

  }, [])


  function atualizarAvatar() {

    setAvatar(
      localStorage.getItem("avatarUsuario") || ""
    )

  }


  if (carregando) {

    return (

      <DashboardLayout>

        <p>
          Carregando dashboard...
        </p>

      </DashboardLayout>

    )

  }


  if (erro) {

    return (

      <DashboardLayout>

        <div className="dashboard-error">

          ⚠️ {erro}

        </div>

      </DashboardLayout>

    )

  }


  // Valor do gauge vem direto de "dados" — sem contagem manual,
  // pra nunca travar em 0% como já aconteceu antes.
  const valorFrequencia = dados?.taxaFrequenciaGeral ?? 0

  const frequenciaGauge = [
    { value: valorFrequencia, fill: "#22c55e" }
  ]


  return (

    <DashboardLayout>

      <div className="dashboard-page">


        {/* =========================
            CABEÇALHO
        ========================= */}

        <div className="dashboard-header">

          <div className="dashboard-header-left">

            <div
              className="dashboard-avatar"
              onClick={atualizarAvatar}
              title="Foto do usuário"
            >

              {avatar ? (

                <img
                  src={avatar}
                  alt="Foto do usuário"
                />

              ) : (

                <MascotAvatar size={38} />

              )}

            </div>


            <div>

              <h1>
                E aí, {usuario?.nome || "Visitante"}!
              </h1>

            </div>

          </div>

        </div>


        {/* =========================
            TÍTULO DA SEÇÃO
            (acima dos cards, não só dos gráficos)
        ========================= */}

        <h2 className="section-title">
          Visão Geral
        </h2>


        {/* =========================
            CARDS
        ========================= */}

        <div className="dashboard-cards">


          <div className="dashboard-card">

            <div className="dashboard-card-icon">
              <IconAlunos />
            </div>

            <strong>
              {dados?.totalAlunos}
            </strong>

            <span>
              Alunos
            </span>

          </div>


          <div className="dashboard-card attention">

            <div className="dashboard-card-icon">
              <IconAlertas />
            </div>

            <strong>
              {dados?.alunosRisco}
            </strong>

            <span>
              Em atenção
            </span>

          </div>


          <div className="dashboard-card danger">

            <div className="dashboard-card-icon">
              <IconAlertas />
            </div>

            <strong>
              {dados?.alunosAltoRisco}
            </strong>

            <span>
              Alto Risco
            </span>

          </div>


        </div>


        {/* =========================
            GRÁFICO + GAUGE
        ========================= */}

        <div className="dashboard-charts-row">


          <div className="risk-chart-card">

            <h2>
              Evolução do risco de evasão
            </h2>


            <div className="risk-chart">

              {evolucaoRisco.length === 0 ? (

                <p>
                  Ainda não há dados suficientes para exibir a evolução.
                </p>

              ) : (

                <ResponsiveContainer width="100%" height="100%">

                  <LineChart data={evolucaoRisco}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255, 255, 255, 0.15)"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="periodo"
                      stroke="rgba(255, 255, 255, 0.65)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis hide />

                    <Tooltip
                      formatter={(value) => [`${value}%`, "Risco"]}
                      contentStyle={{
                        background: "#2a1b6b",
                        border: "none",
                        borderRadius: "10px",
                        color: "white"
                      }}
                      labelStyle={{ color: "#ffc66d", fontWeight: "bold" }}
                      cursor={{ stroke: "rgba(255,255,255,0.2)" }}
                    />

                    <Line
                      type="monotone"
                      dataKey="risco"
                      stroke="#ffc66d"
                      strokeWidth={3}
                      dot={{ fill: "#ffc66d", r: 5 }}
                      activeDot={{ r: 7 }}
                      animationDuration={900}
                    />

                  </LineChart>

                </ResponsiveContainer>

              )}

            </div>

          </div>


          <div className="risk-gauge-card">

            <h2>
              Frequência Geral
            </h2>

            <div className="risk-gauge-chart">

              <ResponsiveContainer width="100%" height="100%">

                <RadialBarChart
                  data={frequenciaGauge}
                  innerRadius="75%"
                  outerRadius="100%"
                  startAngle={90}
                  endAngle={-270}
                  barSize={12}
                >

                  <RadialBar
                    background={{ fill: "#ececf5" }}
                    dataKey="value"
                    cornerRadius={20}
                    isAnimationActive={true}
                    animationDuration={900}
                  />

                  <Tooltip
                    formatter={() => [
                      `${valorFrequencia}%`,
                      "Frequência"
                    ]}
                    contentStyle={{
                      background: "#1f1147",
                      border: "none",
                      borderRadius: "10px",
                      color: "white"
                    }}
                  />

                </RadialBarChart>

              </ResponsiveContainer>

              <div className="risk-gauge-label">
                {valorFrequencia} %
              </div>

            </div>

          </div>

        </div>


        {/* =========================
            SEGUNDA FILEIRA DE GRÁFICOS
        ========================= */}

        <div className="dashboard-charts-row-2">


          <div className="mini-chart-card">

            <h2>
              Frequência por dia da semana
            </h2>

            <div className="mini-chart">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={frequenciaPorDia}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#eee"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="dia"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis hide domain={[0, 100]} />

                  <Tooltip
                    formatter={(value) => [`${value}%`, "Frequência"]}
                    contentStyle={{
                      borderRadius: "10px",
                      border: "1px solid #eee"
                    }}
                  />

                  <Bar
                    dataKey="frequencia"
                    fill="#633df2"
                    radius={[6, 6, 0, 0]}
                    animationDuration={900}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>


          <div className="mini-chart-card">

            <h2>
              Distribuição de risco
            </h2>

            <div className="mini-chart">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={distribuicaoRisco}
                    dataKey="valor"
                    nameKey="nome"
                    innerRadius={48}
                    outerRadius={78}
                    paddingAngle={3}
                    animationDuration={900}
                  >

                    {distribuicaoRisco.map((item, index) => (
                      <Cell
                        key={index}
                        fill={item.cor}
                      />
                    ))}

                  </Pie>

                  <Tooltip
                    formatter={(value, nome) => [
                      `${value} alunos`,
                      nome
                    ]}
                    contentStyle={{
                      borderRadius: "10px",
                      border: "1px solid #eee"
                    }}
                  />

                  <Legend
                    verticalAlign="bottom"
                    height={28}
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span style={{ fontSize: 12, color: "#444" }}>
                        {value}
                      </span>
                    )}
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>


          <div className="mini-chart-card">

            <h2>
              Frequência média por turma
            </h2>

            <div className="mini-chart">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={frequenciaPorTurma}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#eee"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="turma"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis hide domain={[0, 100]} />

                  <Tooltip
                    formatter={(value) => [`${value}%`, "Frequência"]}
                    contentStyle={{
                      borderRadius: "10px",
                      border: "1px solid #eee"
                    }}
                  />

                  <Bar
                    dataKey="frequencia"
                    fill="#4b25c9"
                    radius={[6, 6, 0, 0]}
                    animationDuration={900}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>


        </div>


        {/* =========================
            PARTE INFERIOR
        ========================= */}

        <div className="dashboard-bottom">


          {/* ALUNOS EM ATENÇÃO */}

          <div className="attention-card">


            <h2>
              Alunos que precisam de atenção
            </h2>


            <div className="attention-list">


              {alertas.map((alerta, index) => (

                <div
                  className="attention-item"
                  key={index}
                >


                  <div className="attention-student">


                    <span
                      className={
                        `risk-dot ${alerta.nivel}`
                      }
                    ></span>


                    <span>
                      {alerta.aluno}
                    </span>


                  </div>


                  <strong>
                    {alerta.percentual}
                  </strong>


                </div>

              ))}


            </div>


          </div>


          {/* RISCO POR TURMA */}

          <div className="class-risk-card">


            <h2>
              Risco por turma
            </h2>


            <div className="class-risk-list">


              {riscoPorTurma.map((item, index) => (

                <div
                  className="class-risk-item"
                  key={index}
                >


                  <span>
                    {item.turma}
                  </span>


                  <div className="risk-bar">


                    <div
                      className="risk-bar-fill"
                      style={{
                        width:
                          `${item.percentual}%`
                      }}
                    ></div>


                  </div>


                </div>

              ))}


            </div>


          </div>


        </div>


      </div>

    </DashboardLayout>

  )

}

export default Dashboard