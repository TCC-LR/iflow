import { Question } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Input } from '../../../../components/Input/Input'
import { baseUrl } from '../../../../Config'
import './_5W2H.css'

export function _5W2H(props: any) {
  const { stepId, artifactId } = useParams()
  const projectId = localStorage.getItem('project_id')
  const artifact = props.artifact
  const [data5W2H, setData5W2H] = useState({
    who: '',
    what: '',
    when: '',
    where: '',
    why: '',
    how: '',
    'how much': '',
  })

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
            response.json().then((data) => setData5W2H(data || {})),
          )
        }
      }),
    )
  }, [])
  if (artifact.done) {
    return (
      <>
        <Input
          icon={<Question />}
          placeholder="O Quê?"
          disabled
          value={data5W2H.what}
        />
        <Input
          icon={<Question />}
          placeholder="Por quê?"
          disabled
          value={data5W2H.why}
          typeTextarea
          height="150px"
        />
        <Input
          icon={<Question />}
          placeholder="Onde?"
          disabled
          value={data5W2H.where}
        />
        <Input
          icon={<Question />}
          placeholder="Quando?"
          disabled
          value={data5W2H.when}
        />
        <Input
          icon={<Question />}
          placeholder="Por quem?"
          disabled
          value={data5W2H.who}
        />
        <Input
          icon={<Question />}
          placeholder="Como?"
          disabled
          value={data5W2H.how}
          typeTextarea
          height="150px"
        />
        <Input
          icon={<Question />}
          placeholder="Quanto custa?"
          disabled
          value={data5W2H['how much']}
        />
      </>
    )
  }

  return (
    <>
      <Input
        icon={<Question />}
        name="what"
        placeholder="O Quê?"
        onChangeHandler={(e) => {
          props.onChangeArtifactHandler(e)
        }}
      />
      <Input
        icon={<Question />}
        placeholder="Por quê?"
        typeTextarea
        height="150px"
        name="why"
        onChangeHandler={(e) => {
          props.onChangeArtifactHandler(e)
        }}
      />
      <Input
        name="where"
        icon={<Question />}
        placeholder="Onde?"
        onChangeHandler={(e) => {
          props.onChangeArtifactHandler(e)
        }}
      />
      <Input
        name="when"
        icon={<Question />}
        placeholder="Quando?"
        onChangeHandler={(e) => {
          props.onChangeArtifactHandler(e)
        }}
      />
      <Input
        name="who"
        icon={<Question />}
        placeholder="Por quem?"
        onChangeHandler={(e) => {
          props.onChangeArtifactHandler(e)
        }}
      />
      <Input
        icon={<Question />}
        placeholder="Como?"
        typeTextarea
        height="150px"
        name="how"
        onChangeHandler={(e) => {
          props.onChangeArtifactHandler(e)
        }}
      />
      <Input
        name="how much"
        icon={<Question />}
        placeholder="Quanto custa?"
        onChangeHandler={(e) => {
          props.onChangeArtifactHandler(e)
        }}
      />
    </>
  )
}
