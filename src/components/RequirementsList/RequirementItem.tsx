import { IdentificationCard, Question } from 'phosphor-react'
import './RequirementItem.css'

interface IRequirementItem {
  id: number
  name: string
  functional: string
  who: string
  what: string
  why: string
  level_type: string
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
      <div className="w-[49.6%] h-[auto] p-4 rounded-lg bg-[#81B29A]">
        <div className="w-full">
          <h1 className="w-full text-center text-[30px] font-[handlee]">
            {props.requirement?.functional === 'true' ||
            props.requirement?.functional === true
              ? 'Requisito Funcional'
              : 'Requisito Não Funcional'}
            {' - '}
            {props.requirement?.id}
          </h1>
        </div>
        <div className=" mt-2 flex align-center w-full border-b rounded-lg border-gray-100 p-1">
          <IdentificationCard size={25} />
          <div className="w-full pl-3">
            <span className="text-lg">{props.requirement.name}</span>
          </div>
        </div>
        <div className=" mt-5 flex align-center w-full border-b rounded-lg border-gray-100 p-1">
          <Question size={25} />
          <div className="w-full pl-3">
            <span className="text-lg">{props.requirement.who}</span>
          </div>
        </div>
        <div className=" mt-5 flex align-center w-full border-b rounded-lg border-gray-100 p-1">
          <Question size={25} />
          <div className="w-full pl-3">
            <span className="text-lg">{props.requirement.what}</span>
          </div>
        </div>
        <div className=" mt-5 flex align-center w-full border-b rounded-lg border-gray-100 p-1">
          <Question size={25} />
          <div className="w-full pl-3">
            <span className="text-lg">{props.requirement.why}</span>
          </div>
        </div>
      </div>

      // <div className="requirement-container">
      //   <div className="requirement-id">{props.requirement?.id}</div>
      //   <div className="requirement-content">
      //     <div className="requirement-row">
      //       <div className="w-[20%]" style={{ color: '#3D405B' }}>
      //         {props.requirement?.functional === 'true'
      //           ? 'Requisito Funcional'
      //           : 'Requisito Não Funcional'}
      //       </div>
      //       <div className="w-[80%]">
      //         <strong style={{ color: '#3D405B' }}>Nome: </strong>
      //         {props.requirement?.name}
      //       </div>
      //     </div>
      //     <div className="requirement-row">
      //       <div className="w-[33%]">
      //         <strong style={{ color: '#3D405B' }}>Quem: </strong>
      //         {props.requirement?.who}
      //       </div>
      //       <div className="w-[33%]">
      //         <strong style={{ color: '#3D405B' }}>O quê: </strong>
      //         {props.requirement?.what}
      //       </div>
      //       <div className="w-[33%]">
      //         <strong style={{ color: '#3D405B' }}>Por quê: </strong>
      //         {props.requirement?.why}
      //       </div>
      //     </div>
      //   </div>
      //   {props.onlyShow ? (
      //     ''
      //   ) : (
      //     // <div
      //     //   className="requirement-delete-box"
      //     //   onClick={deleteRequirementHandler}
      //     // >
      //     //   <Trash size={25} />
      //     // </div>
      //     <></>
      //   )}
      // </div>
    )
  } else {
    return <></>
  }
}
