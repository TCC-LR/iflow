import { Question, RedditLogo } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { IRequirementItem } from '../../Database'
import { AddButton } from '../AddButton/AddButton'
import { Input } from '../Input/Input'
import { RequirementItem } from './RequirementItem'
import './RequirementsList.css'

export function RequirementsList(props: any) {
  const [requirements, setRequirements] = props.requirementsState
  const [idAuxiliar, setIdAuxiliar] = useState(0)
  const [addRequirementButton, setAddRequirementButton] = useState(false)
  const [addRequirementContainer, setAddRequirementContainer] = useState(<></>)
  // setRequirements(["1", "2"]);

  useEffect(() => {
    setAddRequirementButton(false)
  }, [])

  useEffect(() => {
    let i = 0
    const newIdOrder = requirements.map((obj) => {
      i++
      return { ...obj, id: i }
    })

    setRequirements(newIdOrder)
  }, requirements)

  const buttonClickHandler = () => {
    setAddRequirementButton(!addRequirementButton)
    if (addRequirementButton) {
      setAddRequirementContainer(<></>)
    } else {
      setAddRequirementContainer(
        <div
          id="new-requirement-container"
          className="new-requirement-container flex flex-col w-full mt-[15px]"
        >
          <div className="inputs-title">Adicionar Requisito</div>
          <div className="flex flex-row w-full">
            <div className="w-1/2">
              <Input id="requirement-name" placeholder="Nome" />
            </div>
            <div className="mt-[15px] ml-[15px] flex w-1/2 items-center">
              <div className="flex flex-row ml-[12px]">
                <input
                  name="requirement-type"
                  type="radio"
                  value="true"
                  checked
                />
                <label className="ml-[12px]">Funcional</label>
              </div>
              <div className="flex flex-row ml-[25px]">
                <input name="requirement-type" type="radio" value="false" />
                <label className="ml-[12px]">Não Funcional</label>
              </div>
            </div>
          </div>
          <Input id="requirement-who" placeholder="Quem" icon={<Question />} />
          <Input
            id="requirement-what"
            placeholder="O quê?"
            icon={<Question />}
          />
          <Input
            id="requirement-why"
            placeholder="Por que?"
            icon={<Question />}
          />
          <div className="box-for-add-btn">
            <button
              className="btn-add"
              style={{ top: '20px', fontSize: '18px' }}
              onClick={saveRequirementHandler}
            >
              Salvar
            </button>
          </div>
        </div>,
      )
    }
  }

  const saveRequirementHandler = () => {
    const nameInput = (
      document.getElementById('requirement-name') as HTMLInputElement
    ).value
    const whoInput = (
      document.getElementById('requirement-who') as HTMLInputElement
    ).value
    const whatInput = (
      document.getElementById('requirement-what') as HTMLInputElement
    ).value
    const whyInput = (
      document.getElementById('requirement-why') as HTMLInputElement
    ).value
    const functionalInput = (
      document.querySelector(
        'input[name="requirement-type"]:checked',
      ) as HTMLInputElement
    )?.value

    console.log(
      'Radio inputs',
      document.querySelector('input[name="requirement-type"]:checked'),
    )

    setIdAuxiliar(requirements.length + 1)

    const helper = {
      id: idAuxiliar,
      name: nameInput,
      functional: functionalInput,
      who: whoInput,
      what: whatInput,
      why: whyInput,
    }
    console.log('Requirements helper', helper)

    setRequirements([...requirements, helper])
    setAddRequirementButton(false)
    setAddRequirementContainer(<></>)
  }

  return (
    <div className="inputs-container">
      {props.artifact.done ? (
        <div className="inputs-title">Lista de Requisitos</div>
      ) : (
        <>
          <div className="box-for-add-btn">
            <AddButton
              textId="add-requirement-btn-text"
              text={addRequirementButton ? 'Cancelar' : 'Adicionar Requisito'}
              onClick={buttonClickHandler}
            />
          </div>

          {addRequirementContainer}
        </>
      )}
      <div
        style={{
          width: '100%',
          overflowY: 'auto',
          maxHeight: '400px',
          marginTop: '50px',
        }}
      >
        {requirements.length > 0 ? (
          requirements.map((requirement: IRequirementItem) => {
            return (
              <>
                <RequirementItem
                  onlyShow={props.artifact.done}
                  requirement={requirement}
                  requirementsState={props.requirementsState}
                />
              </>
            )
          })
        ) : (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            Nenhum requisito foi cadastrado.
          </div>
        )}
      </div>
    </div>
  )
}
