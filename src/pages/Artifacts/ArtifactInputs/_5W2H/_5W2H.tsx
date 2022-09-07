import { Question } from 'phosphor-react'
import { Input } from '../../../../components/Input/Input'
import './_5W2H.css'

export function _5W2H(props: any) {
  const artifact = props.artifact

  if (artifact.done) {
    return (
      <>
        <Input
          icon={<Question />}
          placeholder="O Quê?"
          disabled
          value={artifact.what}
        />
        <Input
          icon={<Question />}
          placeholder="Por quê?"
          disabled
          value={artifact.why}
          typeTextarea
          height="150px"
        />
        <Input
          icon={<Question />}
          placeholder="Onde?"
          disabled
          value={artifact.where}
        />
        <Input
          icon={<Question />}
          placeholder="Quando?"
          disabled
          value={artifact.when}
        />
        <Input
          icon={<Question />}
          placeholder="Por quem?"
          disabled
          value={artifact.who}
        />
        <Input
          icon={<Question />}
          placeholder="Como?"
          disabled
          value={artifact.how}
          typeTextarea
          height="150px"
        />
        <Input
          icon={<Question />}
          placeholder="Quanto custa?"
          disabled
          value={artifact.how_much}
        />
      </>
    )
  }

  return (
    <>
      <Input icon={<Question />} placeholder="O Quê?" />
      <Input
        icon={<Question />}
        placeholder="Por quê?"
        typeTextarea
        height="150px"
      />
      <Input icon={<Question />} placeholder="Onde?" />
      <Input icon={<Question />} placeholder="Quando?" />
      <Input icon={<Question />} placeholder="Por quem?" />
      <Input
        icon={<Question />}
        placeholder="Como?"
        typeTextarea
        height="150px"
      />
      <Input icon={<Question />} placeholder="Quanto custa?" />
    </>
  )
}
