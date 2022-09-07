import { Link, useParams } from 'react-router-dom'
import { Header } from '../../components/Header'

import { PencilSimple, Image, MusicNotes } from 'phosphor-react'

import './ArtifactsList.css'
import { EmptyPage } from '../../components/EmptyPage/EmptyPage'
import { StepCard } from '../../components/StepCard/StepCard'
import { GetSteps, GetArtifacts } from '../../Database'
import { useEffect } from 'react'

export function ArtifactsList() {
  const { project_id, stepId } = useParams()

  const steps = GetSteps()

  const artifacts = GetArtifacts(parseInt(stepId))

  const done_artifacts = artifacts.filter((artifact) => {
    return artifact.done == true
  })

  if (done_artifacts.length == 0) {
    return (
      <>
        <Header
          hasTitle
          title={steps[parseInt(stepId) - 1].name}
          hasBackArrow
          backUrl="/project/1/steps"
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
        backUrl="/project/1/steps"
        backTitle=""
        hasAddButton
        addButtonUrl={
          '/project/' + project_id + '/step/' + stepId + '/artifact/new'
        }
        addButtonTitle="Artefato"
      />
      <div className="w-full h-full px-[80px] pt-[250px] centralize-items">
        {done_artifacts.map((artifact) => {
          return (
            <Link
              to={
                '/project/' +
                project_id +
                '/step/' +
                stepId +
                '/artifact/' +
                artifact.id.toString()
              }
            >
              <StepCard
                key={artifact.id}
                active={true}
                textColorActive={true}
                name={artifact.name}
                icon={getCorrespondingIcon(artifact)}
              />
            </Link>
          )
        })}
      </div>
    </div>
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
