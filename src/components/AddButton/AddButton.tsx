import { PlusCircle } from 'phosphor-react'
import './AddButton.css'

interface addButton {
  id?: string
  textId?: string
  text: string
  onClick?: any
}

export function AddButton(props: addButton) {
  return (
    <button
      id={props.id}
      className="btn-add font-[Handlee] text-[20px]"
      onClick={props.onClick}
    >
      <PlusCircle />
      <span id={props.textId}>{props.text}</span>
    </button>
  )
}
