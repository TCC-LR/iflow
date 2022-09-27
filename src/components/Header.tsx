import { Logo } from './Logo'
import { ArrowBendUpLeft } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { AddButton } from './AddButton/AddButton'

interface IHeader {
  hasTitle?: Boolean
  title?: string
  hasBackArrow?: Boolean
  backUrl?: string
  backTitle?: string
  hasAddButton?: Boolean
  clickButtonHandler: any
  addButtonTitle?: string
  addButtonUrl?: string
}

export function Header(props: IHeader) {
  return (
    <header className="w-full h-[65px] flex items-center justify-center bg-green-400">
      {props.hasBackArrow ? (
        <Link to={props.backUrl} className="backArrowOnHeader">
          <ArrowBendUpLeft />
          <span>{props.backTitle}</span>
        </Link>
      ) : (
        ''
      )}
      <Logo />
      <span className="font-[Handlee] text-[40px]">
        {props.hasTitle ? props.title : ''}
      </span>
      {props.hasAddButton ? (
        <Link to={props.addButtonUrl} className="addBtnOnHeader">
          <AddButton text={props.addButtonTitle} onClick={props.clickButtonHandler} />
        </Link>
      ) : (
        ''
      )}
    </header>
  )
}
