import { MagnifyingGlass } from 'phosphor-react'
import { GetAllUserStories, IRequirementItem } from '../../Database'
import {} from '../SearchInput/SearchInput'
import './UserStoriesCardList.css'

export function UserStoriesCardList(props: any) {
  const userStories = GetAllUserStories()

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
      <div className="w-full h-full px-[80px] start-items">
        {userStories.map((us, index) => {
          return (
            <div
              key={index}
              id={'user-storie-' + us.id}
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
              <div>RF-{index}</div>
              <div>{us.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
