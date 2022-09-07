import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import { StepCard } from '../../components/StepCard/StepCard'
import { GetSteps } from '../../Database'

import './StepList.css'

export function StepList() {
  const steps = GetSteps()

  return (
    <div>
      <Header
        hasTitle
        title="Etapas"
        hasBackArrow={true}
        backUrl="/project/new"
      />
      <div className={'w-full h-full px-[80px] pt-[250px] centralize-items'}>
        {steps.map((step) => {
          return (
            <Link to={'/project/1/step/' + step.id.toString()} key={step.id}>
              <StepCard active={step.hasArtifacts} name={step.name} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
