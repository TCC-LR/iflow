import { Link, useParams } from 'react-router-dom'
import { Header } from '../../components/Header'

import './NewArtifact.css'
import { GetArtifacts, GetSteps } from '../../Database'
import { StepCard } from '../../components/StepCard/StepCard'
import { EmptyPage } from '../../components/EmptyPage/EmptyPage'

export function NewArtifact() {
  const { project_id, stepId } = useParams()

  const steps = GetSteps()
  const artifacts = GetArtifacts(parseInt(stepId))
  console.log('Artifacts', artifacts)
  if (artifacts.length === 0) {
    return (
      <>
        <Header
          hasTitle
          title={steps[parseInt(stepId) - 1].name}
          hasBackArrow
          backUrl={'/project/' + project_id + '/step/' + stepId}
          backTitle="Adicionar Novo Artefato"
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
        backTitle="Adicionar novo artefato"
        backUrl={'/project/' + project_id + '/step/' + stepId}
      />
      <div
        className={
          'w-full h-full px-[80px] pt-[200px] ' +
          (artifacts.length > 5 ? 'start-items' : 'centralize-items')
        }
      >
        {artifacts.map((artifact) => {
          return (
            <StepCard
              key={artifact.id}
              active={true}
              textColorActive={false}
              name={artifact.name}
              keyName={artifact.key}
              hasLink={true}
            />
          )
        })}
      </div>
    </div>
  )
}

{
  /* <Link
      to={
        '/project/1/step/' +
        stepId +
        '/artifact/' +
        artifact.id.toString()
      }
    >
      <StepCard
        key={artifact.id}
        active={true}
        textColorActive={false}
        name={artifact.name}
      />
    </Link> */
}
