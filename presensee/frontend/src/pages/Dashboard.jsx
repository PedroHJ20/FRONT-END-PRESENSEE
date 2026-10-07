import DashboardLayout from "../layouts/DashboardLayout"
import { useEffect, useState } from "react"
import api from "../services/api"
import { getUsuario, getToken } from "../services/auth"
import { MascotAvatar, IconAlunos, IconAlertas } from "../components/Icons"
import {
  LineChart,
  Line,
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

  const [gaugeValue, setGaugeValue] = useState(0)


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


  // Dados do gráfico (vêm da API; formato: [{ periodo: "Mar", risco: 22 }, ...])
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


  // Anima o número do gauge contando de 0 até o valor real
  useEffect(() => {

    if (dados?.taxaFrequenciaGeral == null) {
      return
    }

    const valorFinal = dados.taxaFrequenciaGeral

    let valorAtual = 0

    const duracao = 900
    const intervaloPasso = 16
    const totalPassos = duracao / intervaloPasso
    const incremento = valorFinal / totalPassos

    const timer = setInterval(() => {

      valorAtual += incremento

      if (valorAtual >= valorFinal) {

        valorAtual = valorFinal

        clearInterval(timer)

      }

      setGaugeValue(Math.round(valorAtual))

    }, intervaloPasso)

    return () => clearInterval(timer)

  }, [dados?.taxaFrequenciaGeral])


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


  const frequenciaGauge = [
    { value: gaugeValue, fill: "#22c55e" }
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
            TÍTULO DA SEÇÃO
        ========================= */}

        <h2 className="section-title">
          Visão Geral
        </h2>


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
                  />

                  <Tooltip
                    formatter={() => [
                      `${dados?.taxaFrequenciaGeral}%`,
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
                {gaugeValue} %
              </div>

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