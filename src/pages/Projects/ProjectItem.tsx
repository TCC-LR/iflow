import './ProjectItem.css'

export function ProjectItem(props: any) {
  const anchorClickHandler = () => {
    localStorage.setItem('project_id', props.project_id)
    window.location.href = '/project/' + props.project_id + '/steps'
  }

  return (
    <div className="item-container" onClick={anchorClickHandler}>
      <div className="name-container">{props.name}</div>
      <div className="created-at-container">{props.objective}</div>
      <div className="who-container">{props.who}</div>
    </div>
  )
}
