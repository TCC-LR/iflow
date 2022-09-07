import './ProjectItem.css'
import { IProject } from './IProject'

export function ProjectItem(props: IProject) {
  return (
    <div className="item-container">
      <div className="name-container">{props.name}</div>
      <div className="created-at-container">{props.created_at}</div>
      <div className="who-container">{props.who}</div>
    </div>
  )
}
