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
  FILETYPES,
  GetAllUserStories,
  GetArtifact,
  GetSteps,
  IRequirementItem,
} from '../../Database'
import { Input } from '../../components/Input/Input'
import { _5W2H } from './ArtifactInputs/_5W2H/_5W2H'
import { TitleContainer } from '../../components/TitleContainer/TitleContainer'
import { useEffect, useState } from 'react'
import { RequirementsList } from '../../components/RequirementsList/RequirementsList'
import { FileInput } from '../../components/FileInput/FileInput'
import { Backlog } from './ArtifactInputs/Backlog/Backlog'
import { UserStoriesCardList } from '../../components/UserStoriesCardList/UserStoriesCardList'
import { LexiconsList } from '../../components/LexiconsList/LexiconsList'
import { ILexiconItem } from '../../components/LexiconsList/LexiconItem'
import { HouseOfQuality } from './ArtifactInputs/HouseOfQuality/HouseOfQuality'
import { NFR } from './ArtifactInputs/NFR/NFR'
import { baseUrl } from '../../Config'

export function Artifact() {
  const { stepId, artifactId } = useParams()

  const projectId = localStorage.getItem('project_id')

  const back_url = '/project/' + projectId + '/step/' + stepId

  const steps = GetSteps()
  const [artifact, setArtifact] = useState({})
  // const artifact_from_database = GetArtifact(parseInt(stepId), parseInt(artifactId))

  const userStoryState = useState(GetAllUserStories())
  const requirement: IRequirementItem = {
    id: 0,
    name: '',
    functional: '',
    who: '',
    what: '',
    why: '',
  }

  const requirementState = useState([])

  const [userStoryCard, setUserStoryCard] = useState(requirement)

  const userStoryCardHandler = (us_card) => {
    setUserStoryCard(us_card)
  }

  useEffect(() => {
    fetch(
      `${baseUrl}/artifact?artifact_id=${artifactId}&contents=true&requirements=true`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
      },
    )
      .then((response) => {
        return response.json().then((data) => {
          console.log('Artifact individual', data)
          const artefato = data[0]
          artefato.done = artefato.contents.length > 0
          artefato.inputType = artefato.name
          artefato.houseOfQuality = {}
          if (artefato.contents.length > 0) {
            if (artefato.contents.length > 1) {
              artefato.fileImage = 'http://' + artefato.contents[0].content_url
              artefato.fileUrl = 'http://' + artefato.contents[1].content_url
              artefato.fileNameImage = artefato.contents[0].path
              artefato.fileName = artefato.contents[1].path
            } else {
              artefato.fileUrl = 'http://' + artefato.contents[0].content_url
              artefato.fileName = artefato.contents[0].path
            }
            if (artefato.stage === 'elicitation') {
              artefato.hasRequirementsElicitation = true
              const functionals = artefato.functionals.map((f) => {
                return {
                  id: f.functional_id,
                  level_type: f.level_type,
                  name: f.requirement.name,
                  what: f.requirement.what,
                  why: f.requirement.why,
                  who: f.requirement.who,
                  functional: true,
                }
              })
              const nonFunctionals = artefato.non_functionals.map((f) => {
                return {
                  id: f.non_functional_id,
                  level_type: f.level_type,
                  name: f.requirement.name,
                  what: f.requirement.what,
                  why: f.requirement.why,
                  who: f.requirement.who,
                  functional: false,
                }
              })
              const result = functionals.concat(nonFunctionals)
              requirementState[1](result)
              // requirementState[1](
              //   artefato.non_functionals.map((f) => {
              //     return {
              //       id: f.functional_id,
              //       level_type: f.level_type,
              //       name: f.requirement.name,
              //       what: f.requirement.what,
              //       why: f.requirement.why,
              //       who: f.requirement.who,
              //       functional: false,
              //     }
              //   }),
              // )
              console.log(
                'AAAAAAAAAAA',
                artefato.functionals.map((f) => f.functional_id),
              )
            }
            fetch(artefato.fileUrl, {
              method: 'GET',
              mode: 'cors',
            }).then((response) =>
              response
                .json()
                .then((data) => {
                  if (data.textArtifact) {
                    artefato.textArtifact = data.textArtifact
                  }
                  if (data.epics) {
                    artefato.epics = data.epics
                  }
                  if (data.lexicons) {
                    artefato.lexicons = data.lexicons
                  }
                  if (data.functionals) {
                    artefato.functionals = data.functionals
                  }
                  if (data.non_functionals) {
                    artefato.non_functionals = data.non_functionals
                  }
                  if (data.new_nfr && data.graph) {
                    artefato.new_nfr = data.new_nfr
                    artefato.graph = data.graph
                  }
                  if (data.houseOfQuality) {
                    artefato.houseOfQuality = data.houseOfQuality
                  }
                  setArtifact(artefato)
                })
                .catch((err) => {
                  setArtifact(artefato)
                  console.log(err)
                }),
            )
          } else {
            setArtifact(artefato)
          }
          console.log('AAAAAA', artefato)
          console.log('Requisitos', artefato.functionals)
        })
      })
      .catch((err) => {
        console.log('Deu erro')
        console.log(err)
      })
  }, [])

  const finishClickButtonHandler = (fileName, type) => {
    const formData = new FormData()
    console.log(JSON.stringify(artifact))
    console.log(artifact)
    let file
    formData.append('type', type)
    formData.append('artifact_id', artifactId)

    if (type === 'text') {
      file = new Blob([JSON.stringify(artifact)], {
        type: 'application/json',
      })
      formData.append('content', file, fileName)
      console.log('ENTROU AQUI 1')
      fetch(`${baseUrl}/content/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
        body: formData,
      })
        .then((response) => {
          return response.json().then((data) => {
            console.log('Content', data)
            // window.location.href = `/project/${projectId}/step/1/artifact/${artifactId}`
            alert('Artefato finalizado com sucesso!')
            window.location.href = back_url
          })
        })
        .catch((err) => {
          console.log('Deu erro')
          console.log(err)
        })
    } else if (type === 'image' || type === 'audio') {
      formData.append('content', artifact['file-name'])
      console.log('Entrou aqui')
      fetch(`${baseUrl}/content/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
        body: formData,
      })
        .then((response) => {
          return response.json().then((data) => {
            console.log('Content', data)
            const formDataText = new FormData()
            formDataText.append('type', 'text')
            formDataText.append('artifact_id', artifactId)
            file = new Blob([JSON.stringify(artifact)], {
              type: 'application/json',
            })

            formDataText.append('content', file, 'artifact.json')

            fetch(`${baseUrl}/content/`, {
              method: 'POST',
              mode: 'cors',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('user_token')}`,
              },
              body: formDataText,
            })
              .then((response) => {
                return response.json().then((data) => {
                  console.log('Content', data)

                  alert('Artefato finalizado com sucesso!')
                  window.location.href = back_url
                })
              })
              .catch((err) => {
                console.log('Deu erro')
                console.log(err)
              })
          })
        })
        .catch((err) => {
          console.log('Deu erro')
          console.log(err)
        })
    }
  }

  const onChangeArtifactHandler = (event) => {
    console.log('Target Changed', event.target)
    const name = event.target.getAttribute('name')
    let value
    if (event.target.type.includes('file')) {
      value = event.target.files[0] // VERIFICAR DPS
    } else if (
      event.target.type.includes('text') ||
      event.target.type.includes('textarea')
    ) {
      value = event.target.value
    }
    const newArtifact = Object.assign({}, artifact)

    newArtifact[`${name}`] = value
    console.log('On Artifact Change', newArtifact)
    setArtifact(newArtifact)
  }

  const onChangeArtifactObjectHandler = (new_artifact) => {
    setArtifact(new_artifact)
  }

  const inputElement: Element = getInputType()

  function getInputType(): JSX.Element {
    switch (artifact.inputType) {
      case '5W2H':
        return (
          <div className="inputs-container">
            <_5W2H
              artifact={artifact}
              onChangeArtifactHandler={onChangeArtifactHandler}
            />
          </div>
        )

      case 'text':
        if (artifact.done) {
          return (
            <div className="inputs-container">
              <Input
                typeTextarea={true}
                disabled
                value={artifact.textArtifact}
                placeholder=""
                icon={<Pencil />}
                height="150px"
              />
            </div>
          )
        }
        return (
          <div className="inputs-container">
            <Input
              typeTextarea={true}
              placeholder="Digite aqui o conteúdo..."
              icon={<Pencil />}
              height="150px"
            />
          </div>
        )
      case 'Brainstorming':
        if (artifact.done) {
          return (
            <>
              <div className="inputs-container">
                <Input
                  typeTextarea={true}
                  disabled
                  value={artifact.textArtifact}
                  placeholder=""
                  icon={<Pencil />}
                  name="textArtifact"
                  height="450px"
                />
              </div>
              <RequirementsList
                onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
                artifact={artifact}
                requirementsState={requirementState}
              />
            </>
          )
        }
        return (
          <>
            <div className="inputs-container">
              <Input
                typeTextarea={true}
                placeholder="Digite aqui o conteúdo..."
                icon={<Pencil />}
                height="150px"
                name="textArtifact"
                onChangeHandler={onChangeArtifactHandler}
              />
            </div>
            <RequirementsList
              onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
              artifact={artifact}
              requirementsState={requirementState}
            />
          </>
        )
      case 'Entrevista':
        if (artifact.done) {
          return (
            <>
              <div className="inputs-container">
                <Input
                  typeTextarea={true}
                  disabled
                  value={artifact.textArtifact}
                  placeholder=""
                  icon={<Pencil />}
                  height="450px"
                />
              </div>
              <RequirementsList
                onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
                artifact={artifact}
                requirementsState={requirementState}
              />
            </>
          )
        }
        return (
          <>
            <div className="inputs-container">
              <Input
                typeTextarea={true}
                placeholder="Digite aqui o conteúdo..."
                icon={<Pencil />}
                height="150px"
                name="textArtifact"
                onChangeHandler={onChangeArtifactHandler}
              />
            </div>
            <RequirementsList
              onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
              artifact={artifact}
              requirementsState={requirementState}
            />
          </>
        )
      case 'Questionário':
        if (artifact.done) {
          return (
            <>
              <div className="inputs-container">
                <Input
                  typeTextarea={true}
                  disabled
                  value={artifact.textArtifact}
                  placeholder=""
                  icon={<Pencil />}
                  height="450px"
                />
              </div>
              <RequirementsList
                onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
                artifact={artifact}
                requirementsState={requirementState}
              />
            </>
          )
        }
        return (
          <>
            <div className="inputs-container">
              <Input
                typeTextarea={true}
                placeholder="Digite aqui o conteúdo..."
                icon={<Pencil />}
                height="150px"
                name="textArtifact"
                onChangeHandler={onChangeArtifactHandler}
              />
            </div>
            <RequirementsList
              onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
              artifact={artifact}
              requirementsState={requirementState}
            />
          </>
        )
      case 'Storytelling':
        if (artifact.done) {
          return (
            <>
              <div className="inputs-container">
                <Input
                  typeTextarea={true}
                  disabled
                  value={artifact.textArtifact}
                  placeholder=""
                  icon={<Pencil />}
                  height="450px"
                />
              </div>
              <RequirementsList
                onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
                artifact={artifact}
                requirementsState={requirementState}
              />
            </>
          )
        }
        return (
          <>
            <div className="inputs-container">
              <Input
                typeTextarea={true}
                placeholder="Digite aqui o conteúdo..."
                icon={<Pencil />}
                height="150px"
                name="textArtifact"
                onChangeHandler={onChangeArtifactHandler}
              />
            </div>
            <RequirementsList
              onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
              artifact={artifact}
              requirementsState={requirementState}
            />
          </>
        )
      case 'audio':
        if (artifact.done) {
          return (
            <div className="inputs-container">
              <div className="fileName">
                <MusicNote size={20} />
                <div>{artifact.fileName}</div>
              </div>
              <div className="image-container">
                <div className="image-space">
                  <audio controls style={{ marginTop: '25px' }}>
                    <source src={artifact.fileUrl} type="audio/mp3" />
                  </audio>
                </div>
              </div>
            </div>
          )
        }

        return (
          <div className="inputs-container">
            <FileInput
              cornerTitleIcon={<MusicNote size={20} />}
              cornerTitle="Adicionar Áudio (MP3)"
              acceptFileTypes=".mp3"
            />
          </div>
        )
      case 'Análise de Protocolo':
        if (artifact.done) {
          return (
            <>
              <div className="inputs-container">
                <div className="fileName">
                  <MusicNote size={20} />
                  <div>{artifact.fileNameImage}</div>
                </div>
                <div className="image-container">
                  <div className="image-space">
                    <audio controls style={{ marginTop: '25px' }}>
                      <source src={artifact.fileImage} type="audio/mp3" />
                    </audio>
                  </div>
                </div>
              </div>
              <RequirementsList
                onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
                artifact={artifact}
                requirementsState={requirementState}
              />
            </>
          )
        }

        return (
          <>
            <div className="inputs-container">
              <FileInput
                cornerTitleIcon={<Image size={20} />}
                cornerTitle="Adicionar Áudio (MP3)"
                acceptFileTypes=".mp3,.wav"
                onChangeHandler={onChangeArtifactHandler}
              />
            </div>
            <RequirementsList
              onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
              artifact={artifact}
              requirementsState={requirementState}
            />
          </>
        )

      case 'image':
        if (artifact.done) {
          return (
            <div className="inputs-container">
              <div className="fileName">
                <Image size={20} />
                <div>{artifact.fileName}</div>
              </div>
              <div className="image-container">
                <div className="image-space">
                  <img src={artifact.fileUrl} />
                </div>
              </div>
            </div>
          )
        }

        return (
          <div className="inputs-container">
            <FileInput
              cornerTitleIcon={<Image size={20} />}
              cornerTitle="Adicionar Imagem (PNG)"
              acceptFileTypes=".png"
            />
          </div>
        )

      case 'Rich Picture':
        if (artifact.done) {
          return (
            <div className="inputs-container">
              <div className="fileName">
                <Image size={20} />
                <div>{artifact.fileNameImage}</div>
              </div>
              <div className="image-container mt-10">
                <div className="image-space">
                  <img width={800} src={artifact.fileImage} />
                </div>
              </div>
            </div>
          )
        }

        return (
          <div className="inputs-container">
            <FileInput
              cornerTitleIcon={<Image size={20} />}
              cornerTitle="Adicionar Imagem (PNG)"
              acceptFileTypes=".png,.jpg,.jpeg"
              onChangeHandler={onChangeArtifactHandler}
            />
          </div>
        )

      case 'Protótipo de Baixa Fidelidade':
        if (artifact.done) {
          return (
            <>
              <div className="inputs-container">
                <div className="fileName">
                  <Image size={20} />
                  <div>{artifact.fileNameImage}</div>
                </div>
                <div className="image-container">
                  <div className="image-space">
                    <img src={artifact.fileImage} />
                  </div>
                </div>
              </div>
              <RequirementsList
                onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
                artifact={artifact}
                requirementsState={requirementState}
              />
            </>
          )
        }

        return (
          <>
            <div className="inputs-container">
              <FileInput
                cornerTitleIcon={<Image size={20} />}
                cornerTitle="Adicionar Imagem (PNG)"
                acceptFileTypes=".png,.jpg,.jpeg"
                onChangeHandler={onChangeArtifactHandler}
              />
            </div>
            <RequirementsList
              onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
              artifact={artifact}
              requirementsState={requirementState}
            />
          </>
        )

      case 'Backlog':
        return (
          <>
            <div className="inputs-container">
              <Backlog
                onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
                artifact={artifact}
                userStoryCard={userStoryCard}
              />
            </div>
            {!artifact.done && (
              <UserStoriesCardList
                pre_id="backlog"
                userStoryCardHandler={userStoryCardHandler}
              />
            )}
          </>
        )

      case 'House of Quality':
        return (
          <HouseOfQuality
            artifact={artifact}
            onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
            userStoriesState={userStoryState}
            userStoryCard={userStoryCard}
            userStoryCardHandler={userStoryCardHandler}
          />

          // <>
          //   <div className="inputs-container">
          //     <HouseOfQuality
          //       rnf="RnF-01"
          //       artifact={artifact}
          //       userStoryCard={userStoryCard}
          //     />
          //   </div>
          //   <UserStoriesCardList
          //     pre_id="RnF-01"
          //     userStoriesState={userStoryState}
          //     userStoryCardHandler={userStoryCardHandler}
          //   />
          // <div className="inputs-container">
          //   <HouseOfQuality
          //     rnf="RnF-02"
          //     artifact={artifact}
          //     userStoryCard={userStoryCard}
          //   />
          // </div>
          // <UserStoriesCardList
          //   pre_id="RnF-02"
          //   userStoriesState={userStoryState}
          //   userStoryCardHandler={userStoryCardHandler}
          // />
          // <div className="inputs-container">
          //   <HouseOfQuality
          //     rnf="RnF-03"
          //     artifact={artifact}
          //     userStoryCard={userStoryCard}
          //   />
          // </div>
          // <UserStoriesCardList
          //   pre_id="RnF-03"
          //   userStoriesState={userStoryState}
          //   userStoryCardHandler={userStoryCardHandler}
          // />
          // </>
        )

      case 'NFR':
        return (
          <NFR
            artifact={artifact}
            onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
          />
        )

      case 'Léxicos':
        return (
          <LexiconsList
            onChangeArtifactObjectHandler={onChangeArtifactObjectHandler}
            artifact={artifact}
          />
        )

      default:
        return <></>
    }
  }

  return (
    <>
      <Header
        hasTitle
        title={steps[parseInt(stepId) - 1].name}
        hasBackArrow
        backUrl={back_url}
        backTitle={
          artifact.done ? artifact.name : 'Adicionar Novo ' + artifact.name
        }
        hasAddButton={!artifact.done}
        addButtonTitle="Finalizar"
        clickButtonHandler={() => {
          finishClickButtonHandler(
            FILETYPES[artifact.inputType][1],
            FILETYPES[artifact.inputType][0],
          )
        }}
        addButtonUrl=""
      />
      <div className="body-container">
        <TitleContainer icon={<FrameCorners />} name={artifact.name} />

        {<>{inputElement}</>}
      </div>
    </>
  )
}
