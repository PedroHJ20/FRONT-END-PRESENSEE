import mascoteImg from "../assets/mascote.png"


const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
}

export function IconHome(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V19a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9" />
    </svg>
  )
}

export function IconAlunos(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 5.2c1.4.4 2.4 1.7 2.4 3.2 0 1.6-1.1 2.9-2.6 3.2" />
      <path d="M18 14.3c2.3.5 4 2.5 4 4.9" />
    </svg>
  )
}

export function IconAlertas(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 18.5 12 4l8 14.5a1 1 0 0 1-.9 1.5H4.9a1 1 0 0 1-.9-1.5Z" />
      <path d="M12 10v4" />
      <path d="M12 17.2v.1" />
    </svg>
  )
}

export function IconDiario(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 4h11a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H8a2 2 0 0 1-2-2V4Z" />
      <path d="M6 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
    </svg>
  )
}

export function IconIntervencao(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8.2v7.6" />
      <path d="M8.2 12h7.6" />
    </svg>
  )
}

export function IconTurma(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="4" width="17" height="6" rx="1.5" />
      <rect x="3.5" y="14" width="17" height="6" rx="1.5" />
      <path d="M7 7h.01" />
      <path d="M7 17h.01" />
    </svg>
  )
}

export function IconRelatorio(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3.5h9l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path d="M15 3.5V8h4" />
      <path d="M8.5 13v4" />
      <path d="M12 11v6" />
      <path d="M15.5 15v2" />
    </svg>
  )
}

export function IconLogout(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 20H5.5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1H9" />
      <path d="M16 16.5 20.5 12 16 7.5" />
      <path d="M20.2 12H9.5" />
    </svg>
  )
}

export function IconCollapse({ collapsed, ...props }) {
  return (
    <svg {...base} {...props} style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform .2s" }}>
      <path d="M15 5 8 12l7 7" />
    </svg>
  )
}

export function IconCamera(props) {
  return (
    <svg {...base} width={12} height={12} strokeWidth={2} {...props}>
      <path d="M4 7.5 5.2 5h3.6L10 7.5" />
      <rect x="3" y="7.5" width="18" height="12.5" rx="2" transform="scale(0.78)" />
      <circle cx="12" cy="14" r="3" />
    </svg>
  )
}

export function IconChevronDown(props) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function IconPlus(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  )
}



export function MascotAvatar({ size = 34 }) {
  return (
    <img
      src={mascoteImg}
      alt="Mascote PresenSee"
      width={size}
      height={size}
      style={{
        borderRadius: "50%",
        objectFit: "cover",
        display: "block",
      }}
    />
  )

  
}export function IconSun(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2" />
      <path d="M12 19.3v2.2" />
      <path d="M4.2 4.2l1.6 1.6" />
      <path d="M18.2 18.2l1.6 1.6" />
      <path d="M2.5 12h2.2" />
      <path d="M19.3 12h2.2" />
      <path d="M4.2 19.8l1.6-1.6" />
      <path d="M18.2 5.8l1.6-1.6" />
    </svg>
  )
}

export function IconMoon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 14.5a8.5 8.5 0 1 1-10.5-11 7 7 0 0 0 10.5 11Z" />
    </svg>
  )
}