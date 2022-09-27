import { Pencil } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'
import { AddButton } from '../../../../components/AddButton/AddButton'
import './Brainstorming.css'
import '../../Artifact.css'
import { Input } from '../../../../components/Input/Input'

export function Brainstorming(props: any) {
  const artifact = props.artifact

  const { stepId, artifactId } = useParams()
  const projectId = localStorage.getItem('project_id')
  const artifact = props.artifact
  const [brainstorming, setBrainstorming] = useState({'text'})

  useEffect(() => {
    fetch(
      `${baseUrl}/artifact/?project_id=${projectId}&contents=true&artifact_id=${artifactId}`,
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
        if (data[0].contents.length > 0) {
          const content = data[0].contents[0].content_url
          fetch(`http://${content}`, {
            method: 'GET',
            mode: 'cors',
          }).then((response) =>
            response.json().then((data) => setBrainstorming(data || {})),
          )
        }
      }),
    )
  }, [])

  if (artifact.done) {
    return <></>
  }

  return (
    <>
      <Input
        typeTextarea={true}
        placeholder="Digite aqui o conteúdo..."
        icon={<Pencil />}
        height="150px"
        name="textArtifact"
        onChangeHandler={(e) => {
          props.onChangeArtifactHandler(e)
        }}
      />
    </>
  )
}
