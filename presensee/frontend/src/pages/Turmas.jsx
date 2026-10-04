import DashboardLayout from "../layouts/DashboardLayout"
import "../styles/Turmas.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Turmas() {
  const navigate = useNavigate()

  const [turmaSelecionada, setTurmaSelecionada] = useState(null)

  function abrirTurma(turma) {
    setTurmaSelecionada(turma)
  }

  function fecharTurma() {
    setTurmaSelecionada(null)
  }


  const turmas = [
  {
    nome: "1º Ano A",
    curso: "Ensino Médio",
    alunos: 35,
    turno: "Manhã",
    frequencia: 91,
    atencao: 3,
    altoRisco: 1
  },

  {
    nome: "2º Ano B",
    curso: "Ensino Médio",
    alunos: 32,
    turno: "Tarde",
    frequencia: 84,
    atencao: 5,
    altoRisco: 2
  },

  {
    nome: "3º Ano A",
    curso: "Ensino Médio",
    alunos: 30,
    turno: "Manhã",
    frequencia: 78,
    atencao: 6,
    altoRisco: 4
  }
]


  return (

    <DashboardLayout>


      <div className="page-header">


        <h1>
          Turmas
        </h1>


        <button className="add-button">

          + Nova Turma

        </button>


      </div>




      <table className="classes-table">


        <thead>

          <tr>

            <th>
              Turma
            </th>


            <th>
              Curso
            </th>


            <th>
              Alunos
            </th>


            <th>
              Turno
            </th>

            <th>
              Frequência
            </th>

            <th>
              Em atenção
            </th>

            <th>
              Alto risco
            </th>

            <th>
              Ações
            </th>


          </tr>


        </thead>



        <tbody>


        {
          turmas.map((turma,index)=>(


            <tr
              key={index}
              onClick={() => abrirTurma(turma)}
              className="turma-row"
            >


             <td>
              {turma.nome}
             </td>

              <td>
                {turma.curso}
              </td>


              <td>
                {turma.alunos}
              </td>


              <td>
                {turma.turno}
              </td>

              <td>
                {turma.frequencia}%
              </td>

              <td>
                {turma.atencao}
              </td>

              <td>
                {turma.altoRisco}
              </td>

              <td>


                <button className="edit-button">
                  Editar
                </button>



                <button className="delete-button">
                  Excluir
                </button>


              </td>


            </tr>


          ))
        }


        </tbody>


      </table>

      {turmaSelecionada && (
  <div className="student-modal-overlay" onClick={fecharTurma}>

    <div
      className="student-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <button
        className="student-modal-close"
        onClick={fecharTurma}
      >
        ×
      </button>

      <div className="student-modal-header">
        <div>
          <h2>{turmaSelecionada.nome}</h2>
          <span>
            {turmaSelecionada.curso} • {turmaSelecionada.turno}
          </span>
        </div>
      </div>

      <div className="student-modal-stats">

        <div>
          <strong>{turmaSelecionada.alunos}</strong>
          <span>Alunos</span>
        </div>

        <div>
          <strong>{turmaSelecionada.frequencia}%</strong>
          <span>Frequência média</span>
        </div>

        <div>
          <strong>{turmaSelecionada.atencao}</strong>
          <span>Em atenção</span>
        </div>

        <div>
          <strong>{turmaSelecionada.altoRisco}</strong>
          <span>Alto risco</span>
        </div>

            </div>

      <button
        className="turma-alunos-button"
        onClick={() => navigate("/alunos", {
          state: { turma: turmaSelecionada.nome }
        })}
      >
        Ver alunos da turma
      </button>
    </div>

  </div>
)}



    </DashboardLayout>

  )

}


export default Turmas