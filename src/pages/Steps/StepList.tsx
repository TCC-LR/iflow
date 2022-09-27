import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header } from '../../components/Header'
import { StepCard } from '../../components/StepCard/StepCard'
import { baseUrl } from '../../Config'
import { GetSteps } from '../../Database'

import './StepList.css'

export function StepList() {
  const steps = GetSteps()
  const [haveFinishedAllSteps, setHaveFinishedAllSteps] = useState(false)
  const project_id = localStorage.getItem('project_id')

  useEffect(() => {
    fetch(
      `${baseUrl}/artifact/?project_id=${project_id}&contents=true`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
      },
    ).then((response) =>
      response.json().then((data) => {
        console.log(data)
        data.map((artifact) => {
          if(artifact.name == 'House of Quality' && artifact.contents.length > 0){
            setHaveFinishedAllSteps(true)
          }
        })
      }),
    )
  }, [])

  const generateMVP = () => {

    //Criar lógica para gerar MVP no backend com o fetch
    
    window.location.href = `/project/${project_id}/mvp`
  }

  return (
    <div>
      <Header
        hasTitle
        title="Etapas"
        backTitle={''}
        hasBackArrow={true}
        backUrl="/projects"
        hasAddButton={haveFinishedAllSteps}
        addButtonTitle="Gerar MVP"
        clickButtonHandler={() => {
          generateMVP()
        }}
        addButtonUrl=""
      />
      <div className={'w-full h-full px-[80px] pt-[250px] centralize-items'}>
        {steps.map((step) => {
          if (step.name == 'Verificação') {
            return (
              <Link
                to={
                  '/project/' +
                  project_id +
                  '/step/' +
                  step.id.toString() +
                  '/verification'
                }
                key={step.id}
              >
                {/* <StepCard active={step.hasArtifacts} name={step.name} /> */}
                <StepCard active={true} name={step.name} />
              </Link>
            )
          }

          return (
            <Link
              to={'/project/' + project_id + '/step/' + step.id.toString()}
              key={step.id}
            >
              {/* <StepCard active={step.hasArtifacts} name={step.name} /> */}
              <StepCard active={true} name={step.name} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
