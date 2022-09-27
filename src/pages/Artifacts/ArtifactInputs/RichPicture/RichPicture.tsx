import { CloudArrowDown, Image } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'
import { FileInput } from '../../../../components/FileInput/FileInput'
import './RichPicture.css'

export function RichPicture(props: any) {
  const artifact = props.artifact

  const { stepId, artifactId } = useParams()
  const projectId = localStorage.getItem('project_id')
  const artifact = props.artifact
  const [RichPicture, setRichPicture] = useState('')

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
            response.json().then((data) => {
              setRichPicture(data || {})
            }),
          )
        }
      }),
    )
  }, [])

  if (artifact.done) {
    return (
      <>
        <div className="fileName">
          <Image size={20} alt="" />
          <div>{artifact.filename}</div>
        </div>
        <div className="image-container">
          <div className="image-space">
            <img src={RichPicture} alt="" />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <FileInput
        cornerTitleIcon={<Image size={20} alt="" />}
        cornerTitle="Adicionar Imagem (PNG)"
        acceptFileTypes=".png"
      />
    </>
  )
}
