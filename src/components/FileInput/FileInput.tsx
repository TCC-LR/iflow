import { CloudArrowDown, Image } from 'phosphor-react'
import { useEffect, useState } from 'react'
import './FileInput.css'

interface IFileInput {
  cornerTitle?: string
  cornerTitleIcon?: any
  acceptFileTypes: string
}

export function FileInput(props: IFileInput) {
  const [fileName, setFileName] = useState('Arraste a mídia para cá')

  useEffect(() => {
    const dropZoneElement = document.getElementById(
      'input-container',
    ) as HTMLInputElement
    const inputElement = document.getElementById('inputTag') as HTMLInputElement

    dropZoneElement.addEventListener('click', (e) => {
      inputElement.click()
    })

    inputElement.addEventListener('change', (e) => {
      console.log('Input Changed', e)
      if (inputElement?.files.length) {
        setFileName(inputElement.files[0].name)
      } else {
        setFileName('Arraste a mídia para cá')
      }
    })

    dropZoneElement.addEventListener('dragover', (e) => {
      e.preventDefault()
      dropZoneElement.classList.add('drop-zone-over')
    })
    ;['dragleave', 'dragend'].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove('drop-zone-over')
      })
    })

    dropZoneElement.addEventListener('drop', (e) => {
      e.preventDefault()

      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files
        setFileName(e.dataTransfer.files[0].name)
      }

      dropZoneElement.classList.remove('drop-zone-over')
    })
  }, [])

  return (
    <div className="inputContainer" id="input-container">
      <div className="corner-title">
        <>{props.cornerTitleIcon}</>
        <div>{props.cornerTitle}</div>
      </div>
      <div className="labelInput">
        <CloudArrowDown size={100} />
        <div>{fileName}</div>
        <input id="inputTag" type="file" accept={props.acceptFileTypes} />
        <span id="imageName"></span>
      </div>
    </div>
  )
}
