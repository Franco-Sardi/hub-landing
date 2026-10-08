import { useState } from 'react'

const tactil = () => window.matchMedia?.('(hover: none)').matches

// Logo que gira y muestra el nombre y el link a la web de la empresa (pedido de HUB, 08-oct).
// En escritorio gira con hover o foco; en touch, el primer toque gira y el segundo usa el link.
// `ansioso`: en el carrusel, Safari no carga a tiempo las imágenes lazy que entran de costado.
export default function LogoFlip({ empresa, alto, oculto = false, ansioso = false }) {
  const [girado, setGirado] = useState(false)
  const { nombre, logo, web } = empresa
  return (
    <li
      className={`logo-flip${girado ? ' is-flipped' : ''}`}
      tabIndex={oculto ? -1 : 0}
      onClick={() => tactil() && setGirado((v) => !v)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setGirado(false)}
    >
      <div className="logo-flip-inner">
        <div className="logo-flip-front">
          <img src={logo} alt={oculto ? '' : nombre} height={alto} style={{ height: alto }} loading={ansioso ? 'eager' : 'lazy'} decoding="async" />
        </div>
        <div className="logo-flip-back" aria-hidden={oculto || undefined}>
          <strong>{nombre}</strong>
          {web && (
            <a href={web} target="_blank" rel="noopener noreferrer" tabIndex={oculto ? -1 : undefined} onClick={(e) => e.stopPropagation()}>
              Visitar web <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </li>
  )
}
