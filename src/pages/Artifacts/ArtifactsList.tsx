import { Link, useParams } from 'react-router-dom'
import { Header } from '../../components/Header'

import { PencilSimple, Image, MusicNotes } from 'phosphor-react'

import './ArtifactsList.css'
import { EmptyPage } from '../../components/EmptyPage/EmptyPage'
import { StepCard } from '../../components/StepCard/StepCard'
import { GetSteps, GetArtifacts } from '../../Database'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../Config'

export function ArtifactsList() {
  const { project_id, stepId } = useParams()
  const [artifacts, setArtifacts] = useState([])

  const artifactsTypes = {
    '5W2H': 'text',
    'Rich Picture': 'image',
    Brainstorming: 'text',
    Questionário: 'text',
    'Protótipo de Baixa Fidelidade': 'image',
    Storytelling: 'text',
    Entrevista: 'text',
    'Análise de Protocolo': 'audio',
  }

  const steps = GetSteps()
  const currentStep = steps[parseInt(stepId) - 1]

  useEffect(() => {
    fetch(`${baseUrl}/artifact?project_id=${project_id}&contents=true`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('user_token')}`,
      },
    })
      .then((response) => {
        return response.json().then((data) => {
          console.log('Artifacts', data)
          if (data.length > 0) {
            const filteredArtifacts = data.filter((artifact) => {
              if (
                artifact.stage === 'elicitation' &&
                currentStep.name === 'Modelagem'
              ) {
                return (
                  artifact.name === 'Backlog' ||
                  artifact.name === 'NFR' ||
                  artifact.name === 'Léxicos'
                )
              }
              if (
                artifact.stage === 'elicitation' &&
                currentStep.name === 'House of Quality'
              ) {
                return artifact.name === 'House of Quality'
              }
              if (
                artifact.name === 'Backlog' ||
                artifact.name === 'NFR' ||
                artifact.name === 'Léxicos' ||
                artifact.name === 'House of Quality'
              ) {
                return false
              }

              return artifact.stage === currentStep.key
            })

            setArtifacts(filteredArtifacts)
          }
        })
      })
      .catch((err) => {
        console.log('Deu erro')
        console.log(err)
      })
  }, [])

  // const artifacts = GetArtifacts(parseInt(stepId))

  // const done_artifacts = artifacts.filter((artifact) => {
  //   return artifact.done == true
  // })

  // if (done_artifacts.length == 0) {
  if (artifacts.length === 0) {
    return (
      <>
        <Header
          hasTitle
          title={steps[parseInt(stepId) - 1].name}
          hasBackArrow
          backUrl={'/project/' + project_id + '/steps'}
          backTitle=""
          hasAddButton
          addButtonUrl={
            '/project/' + project_id + '/step/' + stepId + '/artifact/new'
          }
          addButtonTitle="Artefato"
        />
        <EmptyPage />
      </>
    )
  }

  return (
    <div>
      <Header
        hasTitle
        title={steps[parseInt(stepId) - 1].name}
        hasBackArrow
        backUrl={'/project/' + project_id + '/steps'}
        backTitle=""
        hasAddButton
        addButtonUrl={
          '/project/' + project_id + '/step/' + stepId + '/artifact/new'
        }
        addButtonTitle="Artefato"
      />
      <div className="w-full h-full px-[80px] pt-[250px] centralize-items">
        {/* {done_artifacts.map((artifact) => { */}
        {artifacts.map((artifact, index) => {
          if (artifact.contents.length > 0) {
            return (
              <Link
                key={index}
                to={
                  '/project/' +
                  project_id +
                  '/step/' +
                  stepId +
                  '/artifact/' +
                  artifact.artifact_id
                }
              >
                <StepCard
                  key={artifact.artifact_id}
                  active={true}
                  textColorActive={true}
                  name={artifact.name}
                  icon={getCorrespondingIcon(artifactsTypes[artifact.name])}
                />
              </Link>
            )
          } else {
            return (
              <Link
                key={index}
                to={
                  '/project/' +
                  project_id +
                  '/step/' +
                  stepId +
                  '/artifact/' +
                  artifact.artifact_id
                }
              >
                <StepCard key={artifact.artifact_id} name={artifact.name} />
              </Link>
            )
          }
        })}
      </div>
    </div>
  )
}

function getCorrespondingIcon(type: string) {
  switch (type) {
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
