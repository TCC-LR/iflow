import { MagnifyingGlass } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../Config'
import {
  artifact_types,
  GetAllUserStories,
  IRequirementItem,
} from '../../Database'
import {} from '../SearchInput/SearchInput'
import './UserStoriesCardList.css'
import axios from 'axios'

export function UserStoriesCardList(props: any) {
  const [userStories, setUserStories] = useState([
    {
      id: 10,
      name: 'saasa',
      what: '',
      why: '',
      who: '',
      functional: '',
    },
  ])

  const { project_id } = useParams()
  const artifact = props.artifact

  const userStoriesArray = []
  useEffect(() => {
    if (props.onlyFunctionalUS) {
      fetch(
        `${baseUrl}/functional?project_id=${project_id}&requirement=true&level_type=user story`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`,
          },
        },
      ).then((response) => {
        return response.json().then((data) => {
          const userStoriesArray = []
          let helper = {}
          data.map((artifact) => {
            helper = artifact.requirement
            helper.functional_id = artifact.functional_id
            userStoriesArray.push(helper)
          })
          console.log('UserStory Array', userStoriesArray)
          setUserStories(userStoriesArray)
        })
      })
    } else {
      fetch(`${baseUrl}/artifact?project_id=${project_id}&requirements=true`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
      }).then((response) => {
        return response.json().then((data) => {
          const userStoriesArray = []
          data.map((artifact) => {
            artifact.functionals.map((functional) => {
              console.log(functional.requirement)
              userStoriesArray.push(functional.requirement)
            })
          })
          setUserStories(userStoriesArray)
        })
      })
    }
  }, [])

  const handleDragStart = (e, userStory: IRequirementItem) => {
    props.userStoryCardHandler(userStory)
    e.target.style.opacity = '0.4'
    e.target.style.transform = 'rotate(-2.5deg)'
  }

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1'
    e.target.style.transform = 'rotate(0deg)'
  }

  return (
    <div className="inputs-container">
      <div className="flex-row w-full">
        <p
          className="container-title"
          style={{ fontSize: '28px', color: '#3D405B' }}
        >
          Selecionar Requisito
        </p>
      </div>
      <div style={{ width: '100%', marginTop: '15px' }}>
        <div className="user-story-search-input">
          <MagnifyingGlass />
          <input type="text" placeholder="Pesquisar Requisito"></input>
        </div>
      </div>
      <div className="w-full max-h-[350px] px-[80px] start-items overflow-y-auto">
        {userStories.map((us, index) => {
          return (
            <div
              key={index}
              id={props.pre_id + '-user-storie-' + us.requirement_id}
              onDragStart={(e) => {
                handleDragStart(e, us)
              }}
              onDragEnd={handleDragEnd}
              className="user-story-card"
              draggable={us.hasBeingDropped ? 'false' : 'true'}
              style={{
                opacity: us.hasBeingDropped ? '0.6' : '1',
                cursor: us.hasBeingDropped ? 'none' : 'move',
                marginTop: '35px',
              }}
            >
              <div>RF-{index + 1}</div>
              <div>{us.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
