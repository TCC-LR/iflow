import { useEffect, useState } from 'react'
import './InputTextWithSelect.css'
import { Info } from 'phosphor-react'
import { baseUrl } from '../../Config'
import { useParams } from 'react-router-dom'

export function InputTextWithSelect(props: any) {
  const { project_id, artifactId } = useParams()
  const requirementsArray = []
  const [artifacts, setArtifacts] = useState([])
  useEffect(() => {
    fetch(`${baseUrl}/non-functional/?project_id=${project_id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user_token')}`,
      },
    }).then((response) => {
      return response.json().then((data) => {
        console.log(data)
        const artifactsArray = []
        data.map((artifact) => {
          console.log('artifacts', artifact)
          artifactsArray.push(artifact)
        })
        setArtifacts(artifactsArray)
      })
    })
  }, [])
  if (!props.label) {
    const [selectValue, setSelectValue] = useState('')

    const onChangeInputHandler = () => {
      const select_element = document.getElementById(
        'select-' + props.level_id + '-' + props.level_item.id,
      )
      let inputValue = ''
      let inputData = ''
      let value = ''
      let nfunctional_id = ''

      inputValue = (select_element as HTMLInputElement).value
      inputData = inputValue.split('|')
      value = inputData[0]
      nfunctional_id = inputData[1]

      setNewNfr(value, nfunctional_id)
      setSelectValue(inputValue)
    }

    const setNewNfr = (new_value, nfunctional_id) => {
      const newNfrs = props.nfrData
      console.log('newNFR', newNfrs)

      switch (props.level_id) {
        case 1:
          newNfrs.first_level.map((level) => {
            if (level.id == props.level_item?.id) {
              level.name = new_value
              level.nfr_id = nfunctional_id
            }
          })
          break

        case 2:
          newNfrs.second_level.map((level) => {
            if (level.id == props.level_item?.id) {
              level.name = new_value
              level.nfr_id = nfunctional_id
            }
          })
          break

        case 3:
          newNfrs.third_level.map((level) => {
            if (level.id == props.level_item?.id) {
              level.name = new_value
              level.nfr_id = nfunctional_id
            }
          })
          break

        default:
          break
      }

      props.updateNfrDataHandler(newNfrs)
    }

    return (
      <div className="w-full flex items-center">
        <select
          id={'select-' + props.level_id + '-' + props.level_item?.id}
          defaultValue={''}
          className="select-nfr"
          onChange={(e) => {
            onChangeInputHandler()
          }}
        >
          <option value="">Selecione...</option>
          {artifacts.map((artifact, index) => {
            return (
              <option
                key={index}
                value={
                  artifact.requirement.name + '|' + artifact.nfunctional_id
                }
              >
                {artifact.requirement.name}
              </option>
            )
          })}
        </select>
      </div>
    )
  }

  return (
    <div className="w-full flex items-center">
      <div className="info-container">
        <Info size={20} />
        <div>{props.label_name}</div>
      </div>
    </div>
  )
}
