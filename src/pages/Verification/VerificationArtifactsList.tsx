import { MusicNotes, PencilSimple, Image, CheckCircle, FrameCorners } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AddButton } from '../../components/AddButton/AddButton'
import { EmptyPage } from '../../components/EmptyPage/EmptyPage'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input/Input'
import { StepCard } from '../../components/StepCard/StepCard'
import { TitleContainer } from '../../components/TitleContainer/TitleContainer'
import { GetArtifact, GetSteps } from '../../Database'

export interface IVerificationPoint {
  id: number,
  description: string
}

export function VerificationArtifactsList() {
  const verificationPointsArray: IVerificationPoint[] = []
  const [verificationPoints, setVerificationPoints] = useState(verificationPointsArray)
 
  const addVerificationPointHandler = () => {

    setVerificationPoints([...verificationPoints, {
      id: verificationPoints.length + 1,
      description: ''
    }])
  }

  const updateInputValueHandler = (point_id) => {

  }

  return (
    <>
      <Header
        hasTitle
        title={'Verificação'}
        hasBackArrow
        backUrl={'back/url'}
        backTitle={'Adicionar Verificação'}
        hasAddButton={true}
        addButtonTitle="Finalizar"
        addButtonUrl=""
      />
      <div className="body-container">
        <TitleContainer icon={<FrameCorners />} name={'Nome do Artefato'} />
        <div className="inputs-container">
        <div className="inputs-title" style={{color: '#3D405B', left: '0', width: '100%', fontSize: '30px' }}>Definir Pontos de Verificação</div>
          <div
            style={{
              width: '100%',
              overflowY: 'auto',
              maxHeight: '400px',
              marginTop: '5px',
            }}
          >
            { verificationPoints.map((point) => {
              return <Input id="" onChangeHandler={() => {updateInputValueHandler(point.id)}} placeholder={'Digite aqui a verificação...'} icon={<CheckCircle size="30" style={{color: '#3D405B'}}/>}  />
            })}
          </div>
          <div className="box-for-add-btn" style={{marginTop: '25px'}}>
            <AddButton
              textId="add-requirement-btn-text"
              text={'Adicionar Ponto de Verificação'}
              onClick={addVerificationPointHandler}
            />
          </div>
        </div>
      </div>
    </>
  )
}

function getCorrespondingIcon(artifact: any) {
    switch (artifact.iconType) {
        case 'text':
        return <PencilSimple size={100} />
        case 'image':
        return <Image size={100} />
        case 'audio':
        return <MusicNotes size={100} />
        default:
        return <></>
    }
}
  