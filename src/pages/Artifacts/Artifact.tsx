import { Link, useParams } from 'react-router-dom'
import { Header } from '../../components/Header'
import {
  FileX,
  FrameCorners,
  IdentificationCard,
  MusicNote,
  Pencil,
  Question,
  Image,
} from 'phosphor-react'

import './Artifact.css'
import {
  GetAllUserStories,
  GetArtifact,
  GetSteps,
  IRequirementItem,
} from '../../Database'
import { Input } from '../../components/Input/Input'
import { _5W2H } from './ArtifactInputs/_5W2H/_5W2H'
import { TitleContainer } from '../../components/TitleContainer/TitleContainer'
import { useState } from 'react'
import { RequirementsList } from '../../components/RequirementsList/RequirementsList'
import { FileInput } from '../../components/FileInput/FileInput'
import { Backlog } from './ArtifactInputs/Backlog/Backlog'
import { UserStoriesCardList } from '../../components/UserStoriesCardList/UserStoriesCardList'
import { LexiconsList } from '../../components/LexiconsList/LexiconsList'
import { ILexiconItem } from '../../components/LexiconsList/LexiconItem'
import { HouseOfQuality } from './ArtifactInputs/HouseOfQuality/HouseOfQuality'

export function Artifact() {
  const { project_id, stepId, artifactId } = useParams()

  const back_url = '/project/' + project_id + '/step/' + stepId

  const steps = GetSteps()
  const artifact = GetArtifact(parseInt(stepId), parseInt(artifactId))

  const userStorieState = useState(GetAllUserStories())

  const requirementState = useState(artifact.requirements)
  const requirement: IRequirementItem = {
    id: 0,
    name: '',
    functional: '',
    who: '',
    what: '',
    why: '',
  }

  const lexiconState = useState(artifact.lexicons)

  const [userStoryCard, setUserStoryCard] = useState(requirement)

  const userStoryCardHandler = (us_card: IRequirementItem) => {
    setUserStoryCard(us_card)
  }

  const inputElement: Element = getInputType(artifact, userStoryCard)

  return (
    <>
      <Header
        hasTitle
        title={steps[parseInt(stepId) - 1].name}
        hasBackArrow
        backUrl={back_url}
        backTitle={'Adicionar Novo ' + artifact.name}
        hasAddButton={!artifact.done}
        addButtonTitle="Salvar"
        addButtonUrl=""
      />
      <div className="body-container">
        <TitleContainer icon={<FrameCorners />} name={artifact.name} />
        <div id="artifact-inputs-container" className="inputs-container">
          {<>{inputElement}</>}
        </div>
        {artifact.hasRequirementsElicitation ? (
          <RequirementsList
            artifact={artifact}
            requirementsState={requirementState}
          />
        ) : (
          ''
        )}
        {(artifact.inputType == 'Backlog' ||
          artifact.inputType == 'House of Quality') &&
        artifact.done == false ? (
          <UserStoriesCardList
            userStoriesState={userStorieState}
            userStoryCardHandler={userStoryCardHandler}
          />
        ) : (
          ''
        )}
        {artifact.inputType == 'Lexicon' ? (
          <LexiconsList artifact={artifact} lexiconState={lexiconState} />
        ) : (
          ''
        )}
      </div>
    </>
  )
}

function getInputType(
  artifact: any,
  userStoryCard: IRequirementItem,
): JSX.Element {
  switch (artifact.inputType) {
    case '5W2H':
      return <_5W2H artifact={artifact} />

    case 'text':
      if (artifact.done) {
        return (
          <>
            <Input
              typeTextarea={true}
              disabled
              value={artifact.description}
              placeholder=""
              icon={<Pencil />}
              height="150px"
            />
          </>
        )
      }
      return (
        <>
          <Input
            typeTextarea={true}
            placeholder="Digite aqui o conteúdo..."
            icon={<Pencil />}
            height="150px"
          />
        </>
      )
    case 'audio':
      if (artifact.done) {
        return (
          <>
            <div className="fileName">
              <MusicNote size={20} />
              <div>{artifact.filename}</div>
            </div>
            <div className="image-container">
              <div className="image-space">
                <audio controls style={{ marginTop: '25px' }}>
                  <source src={artifact.fileUrl} type="audio/mp3" />
                </audio>
              </div>
            </div>
          </>
        )
      }

      return (
        <>
          <FileInput
            cornerTitleIcon={<MusicNote size={20} />}
            cornerTitle="Adicionar Áudio (MP3)"
            acceptFileTypes=".mp3"
          />
        </>
      )
    case 'image':
      if (artifact.done) {
        return (
          <>
            <div className="fileName">
              <Image size={20} />
              <div>{artifact.filename}</div>
            </div>
            <div className="image-container">
              <div className="image-space">
                <img src={artifact.fileUrl} />
              </div>
            </div>
          </>
        )
      }

      return (
        <>
          <FileInput
            cornerTitleIcon={<Image size={20} />}
            cornerTitle="Adicionar Imagem (PNG)"
            acceptFileTypes=".png"
          />
        </>
      )

    case 'Backlog':
      return <Backlog artifact={artifact} userStoryCard={userStoryCard} />

    case 'House of Quality':
      return (
        <HouseOfQuality artifact={artifact} userStoryCard={userStoryCard} />
      )

    default:
      return <></>
  }
}
