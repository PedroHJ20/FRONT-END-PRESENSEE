import { useNavigate } from "react-router-dom"
import "../styles/Welcome.css"

import mascoteWelcome from "../assets/mascote-welcome.png"


function Welcome() {

  const navigate = useNavigate()

  return (

    <div className="welcome-page">

      {/* FUNDO */}
      <div className="welcome-blob-bg blob-a" />
      <div className="welcome-blob-bg blob-b" />

      <div className="welcome-shape shape-fill-1" />
      <div className="welcome-shape shape-fill-2" />
      <div className="welcome-shape shape-ring" />
      <div className="welcome-shape shape-outline" />


      <div className="welcome-content">


        <div className="welcome-text">

          <h1>
            Bem vindo ao
            <span className="brand-font welcome-brand" translate="no">
              Presen<b>See</b>
            </span>
          </h1>


          <button
            className="welcome-button"
            onClick={() => navigate("/login")}
          >
            Vamos começar?
          </button>

        </div>


        <img
          className="welcome-mascot"
          src={mascoteWelcome}
          alt="Mascote PresenSee usando um notebook"
        />


      </div>

    </div>

  )

}

export default Welcome