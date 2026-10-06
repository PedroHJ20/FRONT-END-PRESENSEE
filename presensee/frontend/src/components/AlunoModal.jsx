import { useEffect } from "react"
import { formatarData } from "../data/diarioMock"

function AlunoModal({ aluno, onClose }) {

  // Fecha o modal ao apertar Esc
  useEffect(() => {

    function aoTeclar(e) {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", aoTeclar)

    return () => document.removeEventListener("keydown", aoTeclar)

  }, [onClose])


  return (

    <div className="modal-overlay" onClick={onClose}>

      <div
        className="aluno-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="aluno-modal-titulo"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          type="button"
          className="aluno-modal-fechar"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>


        <h2 id="aluno-modal-titulo">
          {aluno.nomeCompleto}
        </h2>

        <p className="aluno-modal-sub">
          {aluno.turma} · Matrícula {aluno.matricula}
        </p>


        <section>

          <h3>Responsáveis</h3>

          <ul className="aluno-modal-lista">

            {aluno.responsaveis.map(resp => (

              <li key={resp.nome}>
                <span>
                  <strong>{resp.nome}</strong> ({resp.parentesco})
                </span>
                <small>{resp.telefone}</small>
              </li>

            ))}

          </ul>

        </section>


        <section>

          <h3>
            Histórico de faltas
            <small>{aluno.faltas} no total</small>
          </h3>

          {aluno.historicoFaltas.length > 0 ? (

            <ul className="aluno-modal-lista">

              {aluno.historicoFaltas.map(falta => (

                <li key={falta.data}>
                  <span>{formatarData(falta.data)}</span>
                  <small className={falta.justificada ? "justificada" : "sem-justificativa"}>
                    {falta.justificada ? "Justificada" : "Sem justificativa"}
                  </small>
                </li>

              ))}

            </ul>

          ) : (

            <p className="diario-vazio">
              Nenhuma falta registrada.
            </p>

          )}

        </section>


        <section>

          <h3>Observações</h3>

          <p>
            {aluno.observacoes || "Nenhuma observação registrada."}
          </p>

        </section>


        <section className="aluno-modal-resultados">

          <div>
            <h3>Resultado esperado</h3>
            <p>{aluno.resultadoEsperado}</p>
          </div>

          <div>
            <h3>Resultado obtido</h3>
            <p>{aluno.resultadoObtido}</p>
          </div>

        </section>

      </div>

    </div>

  )

}

export default AlunoModal
