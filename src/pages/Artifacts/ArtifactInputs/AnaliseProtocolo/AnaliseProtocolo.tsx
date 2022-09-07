import { MusicNote } from 'phosphor-react'
import './AnaliseProtocolo.css'
import '../../Artifact.css'
import { FileInput } from '../../../../components/FileInput/FileInput'

export function AnaliseProtocolo(props: any) {
  const artifact = props.artifact

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
