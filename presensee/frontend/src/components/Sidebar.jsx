import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { getUsuario, logout } from "../services/auth"
import "../styles/Sidebar.css"

import {
  IconHome,
  IconAlunos,
  IconAlertas,
  IconDiario,
  IconIntervencao,
  IconTurma,
  IconRelatorio,
  IconLogout,
  IconCollapse,
  IconCamera,
  IconSun,
  IconMoon,
  MascotAvatar,
} from "./Icons"

const MENU = [
  { to: "/dashboard", label: "Home", Icon: IconHome },
  { to: "/alunos", label: "Alunos", Icon: IconAlunos },
  { to: "/alertas", label: "Alertas", Icon: IconAlertas },
  { to: "/diario", label: "Diário do monitor", Icon: IconDiario },
  { to: "/novo-aluno", label: "Intervenção", Icon: IconIntervencao },
  { to: "/turmas", label: "Turma", Icon: IconTurma },
  { to: "/relatorios", label: "Relatório", Icon: IconRelatorio },
]

function Sidebar() {

  const navigate = useNavigate()
  const usuario = getUsuario()

  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatarUsuario") || ""
  )

  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  )

  const [tema, setTema] = useState(
    localStorage.getItem("tema") || "light"
  )

  const inputAvatar = useRef(null)


  // Aplica o tema no <html> assim que a sidebar monta e sempre que muda
  useEffect(() => {

    document.documentElement.setAttribute("data-theme", tema)

    localStorage.setItem("tema", tema)

  }, [tema])


  function handleLogout() {
    logout()
    navigate("/login")
  }

  function alternarColapso() {
    const novoValor = !collapsed
    setCollapsed(novoValor)
    localStorage.setItem("sidebarCollapsed", String(novoValor))
  }

  function alternarTema() {
    setTema(tema === "light" ? "dark" : "light")
  }

  function escolherAvatar(e) {
    const arquivo = e.target.files[0]

    if (!arquivo) {
      return
    }

    const leitor = new FileReader()

    leitor.onload = () => {
      const imagem = leitor.result
      setAvatar(imagem)
      localStorage.setItem("avatarUsuario", imagem)
    }

    leitor.readAsDataURL(arquivo)
  }

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* LOGO + BOTÃO DE COLAPSAR */}

      <div className="sidebar-top">

        <div className="sidebar-logo">
          {!collapsed && (
            <h2 className="brand-font" translate="no">
              Presen<span>See</span>
            </h2>
          )}
        </div>

        <button
          className="collapse-toggle"
          onClick={alternarColapso}
          title={collapsed ? "Expandir menu" : "Encolher menu"}
        >
          <IconCollapse collapsed={collapsed} />
        </button>

      </div>

      {/* MENU */}

      <nav className="sidebar-menu">

        {MENU.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} title={collapsed ? label : undefined}>
            <Icon />
            {!collapsed && <span className="menu-label">{label}</span>}
          </NavLink>
        ))}

      </nav>

      {/* MODO ESCURO / CLARO */}

      <button
        className="theme-toggle"
        onClick={alternarTema}
        title={tema === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
      >
        {tema === "light" ? <IconMoon /> : <IconSun />}
        {!collapsed && (
          <span>{tema === "light" ? "Modo escuro" : "Modo claro"}</span>
        )}
      </button>

      {/* USUÁRIO */}

      <div className="sidebar-user">

        <div
          className="sidebar-avatar"
          onClick={() => inputAvatar.current.click()}
          title="Alterar foto"
        >
          {avatar ? (
            <img src={avatar} alt="Foto do usuário" />
          ) : (
            <MascotAvatar size={34} />
          )}

          <span className="avatar-camera">
            <IconCamera />
          </span>

          <input
            ref={inputAvatar}
            type="file"
            accept="image/*"
            onChange={escolherAvatar}
            style={{ display: "none" }}
          />
        </div>

        {!collapsed && (
          <div>
            <strong>{usuario?.nome || "Marcos A."}</strong>
            <span>Monitor</span>
          </div>
        )}

      </div>

      {/* SAIR */}

      <button
        className="logout-button"
        onClick={handleLogout}
        title="Encerrar Sessão"
      >
        <IconLogout />
        {!collapsed && <span>Encerrar Sessão</span>}
      </button>

    </aside>
  )
}

export default Sidebar