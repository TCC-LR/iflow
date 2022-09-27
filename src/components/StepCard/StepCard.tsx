import { useParams } from 'react-router-dom'
import { baseUrl } from '../../Config'
import { GetSteps } from '../../Database'
import './StepCard.css'

interface stepCard {
  name: string
  keyName?: string
  active?: Boolean
  icon?: any
  textColorActive?: Boolean
  hasLink?: Boolean
}

export function StepCard(props: stepCard) {
  const { stepId } = useParams()
  const projectId = localStorage.getItem('project_id')
  const userToken = localStorage.getItem('user_token')
  const anchorClickHandler = () => {
    const artifactData = {
      name: props.keyName,
      stage: GetSteps()[parseInt(stepId) - 1].key,
      project_id: projectId,
    }
    console.log('artifactData', artifactData)

    fetch(`${baseUrl}/artifact/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
      body: JSON.stringify(artifactData),
    })
      .then((response) => {
        return response.json().then((data) => {
          console.log(data)
          window.location.href = `/project/${projectId}/step/${stepId}/artifact/${data.artifact_id}`
        })
      })
      .catch((err) => {
        alert('Algo deu errado. Tente novamente')
        console.log(err)
      })
  }
  return (
    <div
      onClick={props.hasLink ? anchorClickHandler : () => {}}
      className="card-container"
      style={{
        background: props.active
          ? 'rgba(129,178,154, 1)'
          : 'rgba(129,178,154, .7)',
        color: props.textColorActive ? '#F2CC8F' : '#3D405B',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center',
        }}
      >
        {props.name}
      </div>
      {props.icon}
    </div>
  )
}
