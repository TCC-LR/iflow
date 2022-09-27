import { Question } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { AddButton } from '../AddButton/AddButton'
import { Input } from '../Input/Input'
import { ILexiconItem, LexiconItem } from './LexiconItem'
import './LexiconsList.css'

export function LexiconsList(props: any) {
  const artifact = props.artifact
  const [lexicons, setLexicons] = useState([])
  const [idAuxiliar, setIdAuxiliar] = useState(0)
  const [addLexiconButton, setAddLexiconButton] = useState(false)
  const [addLexiconContainer, setAddLexiconContainer] = useState(<></>)
  // setRequirements(["1", "2"]);

  useEffect(() => {
    setAddLexiconButton(false)
  }, [])

  // useEffect(() => {
  //   let i = 0
  //   const newIdOrder = lexicons.map((obj) => {
  //     i++
  //     return { ...obj, id: i }
  //   })

  //   setLexicons(newIdOrder)
  // }, lexicons)

  const buttonClickHandler = () => {
    setAddLexiconButton(!addLexiconButton)
    if (addLexiconButton) {
      setAddLexiconContainer(<></>)
    } else {
      setAddLexiconContainer(
        <div
          id="new-requirement-container"
          className="new-requirement-container flex flex-col w-full mt-[15px]"
        >
          <div className="inputs-title">Adicionar Léxico</div>
          <div className="flex flex-row w-full">
            <div className="w-1/2">
              <Input id="lexicon-name" placeholder="Nome" />
            </div>
            <div className="mt-[15px] ml-[15px] flex w-1/2 items-center">
              <div className="flex flex-row ml-[12px]">
                <input name="lexicon-type" type="radio" value="object" />
                <label className="ml-[12px]">Objeto</label>
              </div>
              <div className="flex flex-row ml-[25px]">
                <input name="lexicon-type" type="radio" value="state" />
                <label className="ml-[12px]">Estado</label>
              </div>
              <div className="flex flex-row ml-[25px]">
                <input name="lexicon-type" type="radio" value="verb" />
                <label className="ml-[12px]">Verbo</label>
              </div>
            </div>
          </div>
          <Input id="lexicon-who" placeholder="Sinônimos" icon={<Question />} />
          <Input id="lexicon-what" placeholder="Noção?" icon={<Question />} />
          <Input id="lexicon-why" placeholder="Impacto?" icon={<Question />} />
          <div className="box-for-add-btn">
            <button
              className="btn-add"
              style={{ top: '20px', fontSize: '18px' }}
              onClick={saveLexiconHandler}
            >
              Salvar
            </button>
          </div>
        </div>,
      )
    }
  }

  const saveLexiconHandler = () => {
    const lexiconName = (
      document.getElementById('lexicon-name') as HTMLInputElement
    ).value
    const lexiconSynonym = (
      document.getElementById('lexicon-who') as HTMLInputElement
    ).value
    const lexiconNotion = (
      document.getElementById('lexicon-what') as HTMLInputElement
    ).value
    const lexiconImpact = (
      document.getElementById('lexicon-why') as HTMLInputElement
    ).value
    const lexiconType = (
      document.querySelector(
        'input[name="lexicon-type"]:checked',
      ) as HTMLInputElement
    )?.value

    console.log(
      'Radio inputs',
      document.querySelector('input[name="lexicon-type"]:checked'),
    )

    setIdAuxiliar(lexicons.length + 1)

    const helper = {
      id: idAuxiliar,
      name: lexiconName,
      type: lexiconType,
      synonym: lexiconSynonym,
      notion: lexiconNotion,
      impact: lexiconImpact,
    }

    console.log('Lexicons helper', helper)

    setLexicons([...lexicons, helper])
    const newArtifact = artifact
    newArtifact.lexicons = [...lexicons, helper]
    props.onChangeArtifactObjectHandler(newArtifact)
    setAddLexiconButton(false)
    setAddLexiconContainer(<></>)
  }

  return (
    <div className="inputs-container">
      {props.artifact.done ? (
        <div className="inputs-title">Lista de Léxicos</div>
      ) : (
        <>
          <div className="box-for-add-btn">
            <AddButton
              textId="add-requirement-btn-text"
              text={addLexiconButton ? 'Cancelar' : 'Adicionar Léxico'}
              onClick={buttonClickHandler}
            />
          </div>

          {addLexiconContainer}
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
        {artifact.lexicons != null && artifact.lexicons.length > 0 ? (
          artifact.lexicons.map((lexicon: ILexiconItem) => {
            return (
              <>
                <LexiconItem
                  key={lexicon.id}
                  onlyShow={props.artifact.done}
                  lexicon={lexicon}
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
            Nenhum Léxico foi cadastrado.
          </div>
        )}
      </div>
    </div>
  )
}
