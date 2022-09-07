import { CloudArrowDown, Image } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'
import { FileInput } from '../../../../components/FileInput/FileInput'
import './RichPicture.css'

export function RichPicture(props: any) {
  const artifact = props.artifact

  if (artifact.done) {
    return (
      <>
        <div className="fileName">
          <Image size={20} alt="" />
          <div>{artifact.filename}</div>
        </div>
        <div className="image-container">
          <div className="image-space">
            <img src={artifact.fileUrl} alt="" />
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
