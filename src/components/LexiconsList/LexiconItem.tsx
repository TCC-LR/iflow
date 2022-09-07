import { Trash } from 'phosphor-react'
import './LexiconItem.css'

export interface ILexiconItem {
  id: number
  type: string
  name: string
  synonym: string
  notion: string
  impact: string
}

export function LexiconItem(props: any) {
  console.log('Props', props)
  const [lexicons, setLexicons] = props.lexiconState

  const deleteLexiconHandler = () => {
    const helper = lexicons.filter(function (lexicon: ILexiconItem) {
      return lexicon.id !== props.lexicon?.id
    })

    setLexicons(helper)
  }

  if (props.lexicon) {
    return (
      <div className="requirement-container">
        <div className="requirement-id">{props.lexicon?.id}</div>
        <div className="requirement-content">
          <div className="requirement-row">
            <div className="w-[20%]" style={{ color: '#3D405B' }}>
              {props.lexicon?.type === 'object'
                ? 'Objeto'
                : props.lexicon?.type === 'state'
                ? 'Estado'
                : 'Verbo'}
            </div>
            <div className="w-[80%]">
              <strong style={{ color: '#3D405B' }}>Nome: </strong>
              {props.lexicon?.name}
            </div>
          </div>
          <div className="requirement-row">
            <div className="w-[33%]">
              <strong style={{ color: '#3D405B' }}>Sinônimo: </strong>
              {props.lexicon?.synonym}
            </div>
            <div className="w-[33%]">
              <strong style={{ color: '#3D405B' }}>Noção: </strong>
              {props.lexicon?.notion}
            </div>
            <div className="w-[33%]">
              <strong style={{ color: '#3D405B' }}>Impacto: </strong>
              {props.lexicon?.impact}
            </div>
          </div>
        </div>
        {props.onlyShow ? (
          ''
        ) : (
          <div
            className="requirement-delete-box"
            onClick={deleteLexiconHandler}
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
