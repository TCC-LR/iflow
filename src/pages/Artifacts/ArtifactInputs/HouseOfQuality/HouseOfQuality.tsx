import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserStoriesCardList } from '../../../../components/UserStoriesCardList/UserStoriesCardList'
import { baseUrl } from '../../../../Config'
import { IRequirementItem } from '../../../../Database'

import './HouseOfQuality.css'

export function HouseOfQuality(props: any) {
  const artifact = props.artifact
  const requirement: IRequirementItem = {
    id: 0,
    functional: '',
    name: '',
    what: '',
    who: '',
    why: '',
  }
  const [strongRequirements, setStrongRequirements] = useState([requirement])
  const [mediumRequirements, setMediumRequirements] = useState([requirement])
  const [weakRequirements, setWeakRequirements] = useState([requirement])

  const [NFR, setNFR] = useState([])

  const { project_id } = useParams()

  useEffect(() => {
    fetch(`${baseUrl}/artifact/?project_id=${project_id}&contents=true`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user_token')}`,
      },
    }).then((response) => {
      return response.json().then((data) => {
        data.map((artifact) => {
          if (artifact.name === 'NFR') {
            if (artifact.contents) {
              fetch('http://' + artifact.contents[0].content_url, {
                method: 'GET',
                mode: 'cors',
              }).then((response) => {
                return response.json().then((data) => {
                  const NFRArray = NFR
                  data.new_nfr.third_level.map((values) => {
                    NFRArray.push(values)
                    console.log('NFRS', values)
                  })
                  setNFR([...NFRArray, { id: -1 }])
                  console.log('NFR STATE', NFR)
                })
              })
            }
          }
        })
      })
    })

    if (artifact.done) {
      setStrongRequirements(artifact.houseOfQuality.strongRequirements)
      setMediumRequirements(artifact.houseOfQuality.mediumRequirements)
      setWeakRequirements(artifact.houseOfQuality.weakRequirements)
    }
  }, [])

  if (artifact.done) {
    return (
      <>
        {NFR.map((nfr, nfr_index) => {
          if (nfr.id !== -1) {
            return (
              <>
                <div className="inputs-container">
                  <div className="w-full">
                    <div className="flex-row w-full">
                      <p
                        className="container-title w-full text-center"
                        style={{ fontSize: '28px', color: '#f4f1de' }}
                      >
                        {nfr.name}
                      </p>
                    </div>
                    <div
                      className="flex flex-row w-full mt-[20px]"
                      style={{
                        border: '1px solid #f4f1de',
                        borderRadius: '8px',
                        color: '#f4f1de',
                      }}
                    >
                      <div className="flex flex-col w-full p-[25px]">
                        <div className="w-full px-4 pb-4 text-center">
                          Forte
                        </div>
                        <div
                          className="h-[350px] w-full flex-start flex-row"
                          style={{ transition: 'all .3s', flexWrap: 'wrap' }}
                          id={nfr_index + '-strong-requirements'}
                          onDragLeave={(e) => {
                            onDropRequirement('strong', nfr_index, nfr)
                          }}
                        >
                          {strongRequirements.map((requirement, index) => {
                            if (
                              requirement.functional !== '' &&
                              requirement.index == nfr_index
                            ) {
                              return (
                                <div
                                  className="minimized_requirement_card"
                                  style={{
                                    border: '1px solid #F4F1DE',
                                  }}
                                >
                                  {requirement.name}
                                </div>
                              )
                            }
                          })}
                        </div>
                      </div>
                      <div
                        className="flex flex-col w-full p-[25px]"
                        style={{
                          borderLeft: '1px solid #f4f1de',
                          borderRight: '1px solid #f4f1de',
                        }}
                      >
                        <div className="w-full px-4 pb-4 text-center">
                          Médio
                        </div>
                        <div
                          className="h-[350px] w-full flex-start flex-row"
                          style={{ transition: 'all .3s', flexWrap: 'wrap' }}
                          id={nfr_index + '-medium-requirements'}
                          onDragLeave={(e) => {
                            onDropRequirement('medium', nfr_index, nfr)
                          }}
                        >
                          {mediumRequirements.map((requirement, index) => {
                            if (
                              requirement.functional !== '' &&
                              requirement.index == nfr_index
                            ) {
                              return (
                                <div
                                  className="minimized_requirement_card"
                                  style={{
                                    border: '1px solid #F4F1DE',
                                  }}
                                >
                                  {requirement.name}
                                </div>
                              )
                            }
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col w-full p-[25px]">
                        <div className="w-full px-4 pb-4 text-center">
                          Fraco
                        </div>
                        <div
                          className="h-[350px] w-full flex-start flex-row"
                          style={{ transition: 'all .3s', flexWrap: 'wrap' }}
                          id={nfr_index + '-weak-requirements'}
                          onDragLeave={(e) => {
                            onDropRequirement('weak', nfr_index, nfr)
                          }}
                        >
                          {weakRequirements.map((requirement, index) => {
                            if (
                              requirement.functional !== '' &&
                              requirement.index == nfr_index
                            ) {
                              return (
                                <div
                                  className="minimized_requirement_card"
                                  style={{
                                    border: '1px solid #F4F1DE',
                                  }}
                                >
                                  {requirement.name}
                                </div>
                              )
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          }
        })}
      </>
    )
  }

  const onDropRequirement = (type, index, nfr) => {
    const userStoryCard = props.userStoryCard
    const newArtifact = props.artifact
    userStoryCard.index = index

    if (type === 'strong') {
      userStoryCard.weight = 9
      newArtifact.houseOfQuality.strongRequirements = [
        ...strongRequirements,
        userStoryCard,
      ]
      setStrongRequirements([...strongRequirements, userStoryCard])
    } else if (type === 'medium') {
      userStoryCard.weight = 3
      newArtifact.houseOfQuality.mediumRequirements = [
        ...mediumRequirements,
        userStoryCard,
      ]
      setMediumRequirements([...mediumRequirements, userStoryCard])
    } else if (type === 'weak') {
      userStoryCard.weight = 1
      newArtifact.houseOfQuality.weakRequirements = [
        ...weakRequirements,
        userStoryCard,
      ]
      setWeakRequirements([...weakRequirements, userStoryCard])
    }

    props.onChangeArtifactObjectHandler(newArtifact)
    disableUserStoryCard(userStoryCard, index)
  }

  const disableUserStoryCard = (userStoryCard: IRequirementItem, index) => {
    const element = document.getElementById(
      index.toString() + '-user-storie-' + userStoryCard.requirement_id,
    )

    element?.classList.add('dropped-user-story')
    element?.setAttribute('draggable', 'false')
  }

  return (
    <>
      {NFR.map((nfr, nfr_index) => {
        if (nfr.id !== -1) {
          return (
            <>
              <div className="inputs-container">
                <div className="w-full">
                  <div className="flex-row w-full">
                    <p
                      className="container-title w-full text-center"
                      style={{ fontSize: '28px', color: '#3D405B' }}
                    >
                      Relacione os requisitos funcionais que contribuem para
                      alcançar o Requisito Não Funcional{' '}
                      <strong>{nfr.name}</strong>
                    </p>
                  </div>
                  <div
                    className="flex flex-row w-full mt-[20px]"
                    style={{
                      border: '1px solid #3D405B',
                      borderRadius: '8px',
                      color: '#3D405B',
                    }}
                  >
                    <div className="flex flex-col w-full p-[25px]">
                      <div className="w-full px-4 pb-4 text-center">Forte</div>
                      <div
                        className="h-[350px] w-full flex-start flex-row"
                        style={{ transition: 'all .3s', flexWrap: 'wrap' }}
                        id={nfr_index + '-strong-requirements'}
                        onDragLeave={(e) => {
                          onDropRequirement('strong', nfr_index, nfr)
                        }}
                      >
                        {strongRequirements.map((requirement, index) => {
                          if (
                            requirement.functional !== '' &&
                            requirement.index == nfr_index
                          ) {
                            return (
                              <div className="minimized_requirement_card">
                                {requirement.name}
                              </div>
                            )
                          }
                        })}
                      </div>
                    </div>
                    <div
                      className="flex flex-col w-full p-[25px]"
                      style={{
                        borderLeft: '1px solid #3D405B',
                        borderRight: '1px solid #3D405B',
                      }}
                    >
                      <div className="w-full px-4 pb-4 text-center">Médio</div>
                      <div
                        className="h-[350px] w-full flex-start flex-row"
                        style={{ transition: 'all .3s', flexWrap: 'wrap' }}
                        id={nfr_index + '-medium-requirements'}
                        onDragLeave={(e) => {
                          onDropRequirement('medium', nfr_index, nfr)
                        }}
                      >
                        {mediumRequirements.map((requirement, index) => {
                          if (
                            requirement.functional !== '' &&
                            requirement.index == nfr_index
                          ) {
                            return (
                              <div className="minimized_requirement_card">
                                {requirement.name}
                              </div>
                            )
                          }
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col w-full p-[25px]">
                      <div className="w-full px-4 pb-4 text-center">Fraco</div>
                      <div
                        className="h-[350px] w-full flex-start flex-row"
                        style={{ transition: 'all .3s', flexWrap: 'wrap' }}
                        id={nfr_index + '-weak-requirements'}
                        onDragLeave={(e) => {
                          onDropRequirement('weak', nfr_index, nfr)
                        }}
                      >
                        {weakRequirements.map((requirement, index) => {
                          if (
                            requirement.functional !== '' &&
                            requirement.index == nfr_index
                          ) {
                            return (
                              <div className="minimized_requirement_card">
                                {requirement.name}
                              </div>
                            )
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <UserStoriesCardList
                pre_id={nfr_index.toString()}
                onlyFunctionalUS={true}
                userStoriesState={props.userStoriesState}
                userStoryCardHandler={props.userStoryCardHandler}
              />
            </>
          )
        }
      })}
    </>
  )
}
