import { WarningCircle } from 'phosphor-react'
import './TitleContainer.css'

interface ITitleContainer {
  name: string
  icon?: any
}

export function TitleContainer(props: ITitleContainer) {
  return (
    <div className="title-container">
      {props.icon}
      <div>{props.name}</div>
      <div className="floating-title-description">
        <WarningCircle size={35} />
      </div>
    </div>
  )
}
