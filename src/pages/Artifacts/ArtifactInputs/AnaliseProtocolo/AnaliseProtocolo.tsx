import { MusicNote } from 'phosphor-react'
import './AnaliseProtocolo.css'
import '../../Artifact.css'
import { FileInput } from '../../../../components/FileInput/FileInput'

export function AnaliseProtocolo(props: any) {
  const artifact = props.artifact

  const artifact = props.artifact

  const { stepId, artifactId } = useParams()
  const projectId = localStorage.getItem('project_id')
  const artifact = props.artifact
  const [ProtocolAnalysis, setProtocolAnalysis] = useState('')

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
              setProtocolAnalysis(data || {})
            }),
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
      <FileInput
        cornerTitleIcon={<MusicNote size={20} />}
        cornerTitle="Adicionar Áudio (MP3)"
        acceptFileTypes=".mp3"
      />
    </>
  )
}
