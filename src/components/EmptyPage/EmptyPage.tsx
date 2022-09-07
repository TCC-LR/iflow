import { Archive } from 'phosphor-react'

import './EmptyPage.css'

export function EmptyPage() {
  return (
    <div className="empty-container">
      <div>Nenhum artefato</div>
      <div>gerado</div>
      <Archive />
    </div>
  )
}
