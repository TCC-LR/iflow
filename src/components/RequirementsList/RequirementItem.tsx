import { Trash } from 'phosphor-react'
import './RequirementItem.css'

interface IRequirementItem {
  name: string
  functional: string
  who: string
  what: string
  why: string
}

export function RequirementItem(props: any) {
  console.log('Props', props)
  const [requirements, setRequirements] = props.requirementsState

  const deleteRequirementHandler = () => {
    const helper = requirements.filter(function (requirement) {
      return requirement.id !== props.requirement?.id
    })

    setRequirements(helper)
  }

  if (props.requirement) {
    return (
      <div className="requirement-container">
        <div className="requirement-id">{props.requirement?.id}</div>
        <div className="requirement-content">
          <div className="requirement-row">
            <div className="w-[20%]" style={{ color: '#3D405B' }}>
              {props.requirement?.functional === 'true'
                ? 'Requisito funcional'
                : 'Requisito Não funcional'}
            </div>
            <div className="w-[80%]">
              <strong style={{ color: '#3D405B' }}>Nome: </strong>
              {props.requirement?.name}
            </div>
          </div>
          <div className="requirement-row">
            <div className="w-[33%]">
              <strong style={{ color: '#3D405B' }}>Quem: </strong>
              {props.requirement?.who}
            </div>
            <div className="w-[33%]">
              <strong style={{ color: '#3D405B' }}>O quê: </strong>
              {props.requirement?.what}
            </div>
            <div className="w-[33%]">
              <strong style={{ color: '#3D405B' }}>Por quê: </strong>
              {props.requirement?.why}
            </div>
          </div>
        </div>
        {props.onlyShow ? (
          ''
        ) : (
          <div
            className="requirement-delete-box"
            onClick={deleteRequirementHandler}
          >
            <Trash size={25} />
          </div>
        )}
      </div>
    )
  } else {
    return <></>
  }
}
