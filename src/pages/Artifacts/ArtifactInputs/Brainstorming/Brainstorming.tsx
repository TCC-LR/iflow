import { Pencil } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'
import { AddButton } from '../../../../components/AddButton/AddButton'
import './Brainstorming.css'
import '../../Artifact.css'
import { Input } from '../../../../components/Input/Input'

export function Brainstorming(props: any) {
  const artifact = props.artifact

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
      />
    </>
  )
}
