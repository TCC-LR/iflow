import {
  FrameCorners,
  Question,
  PlusCircle,
  FileX,
  CopySimple,
} from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import parse from 'html-react-parser'
import { Input } from '../../../../components/Input/Input'
import './Backlog.css'
import {
  GetAllUserStories,
  IRequirementItem,
  IEpic,
  IFeature,
  GetAllEpics,
} from '../../../../Database'
import { baseUrl } from '../../../../Config'

export function Backlog(props: any) {
  const artifact = props.artifact
  const epic: IEpic = {
    id: 0,
    name: '',
    features: [
      {
        id: 0,
        name: '',
        plus_icon: true,
        userStories: [],
      },
    ],
  }
  const [epics, setEpics] = useState([epic])

  const getAllFeaturesFromEpic = (epicIndex: number, epicList: IEpic[]) => {
    let userStoriesLength = 0

    epics[epicIndex].features.forEach((feat) => {
      userStoriesLength += feat.userStories.length
    })
    return userStoriesLength
  }

  useEffect(() => {
    fetch(`${baseUrl}/functional/?backlog=true&requirement=true`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user_token')}`,
      },
    }).then((response) => {
      return response.json().then((backlog) => {
        const epics = []

        backlog.map((epic, index) => {
          if (epic.level_type === 'epic') {
            console.log('Epic', epic)
            // epic.id = index
            epic.name = epic.requirement.name
            epic.features = epic.backlog_relations
            epic.features.map((feature, index_feat) => {
              // feature.id = index_feat
              feature.name = feature.requirement.name
              feature.plus_icon = false
              feature.userStories = feature.backlog_relations
              feature.userStories.map((user_story, index_feat) => {
                // user_story.id = index_feat
                user_story.name = user_story.requirement.name
                user_story.who = user_story.requirement.who
                user_story.what = user_story.requirement.what
                user_story.why = user_story.requirement.why
              })
            })
            epics.push(epic)
          }
        })
        setEpics(epics)
      })
    })
  }, [])

  /**
   * O que falta é:
   * Fazer os Gets do Database.tsx pegando a lista de épicos, dai moldar ele na table
   */
  if (artifact.done) {
    const arrayEpics = artifact.epics
    return (
      <div style={{ width: '100%' }}>
        <table className="backlog-table just-show-table">
          <thead>
            <tr>
              <th rowSpan={2} className="w-[6%]">
                ID do<br></br>Épico
              </th>
              <th rowSpan={2} className="w-[16%]">
                Épico
              </th>
              <th rowSpan={2} className="w-[6%]">
                ID da<br></br>Feature
              </th>
              <th rowSpan={2} className="w-[16%]">
                Feature
              </th>
              <th rowSpan={2} className="w-[6%]">
                ID da<br></br>HS
              </th>
              <th colSpan={3} className="w-[46%]">
                História de Usuário
              </th>
            </tr>
            <tr>
              <th className="w-[12.3%]">Quem?</th>
              <th className="w-[15.3%]">O quê?</th>
              <th className="w-[18.3%]">Por quê?</th>
            </tr>
          </thead>
          <tbody id="backlog-tbody">
            {epics.map((epic, epicIndex) => {
              if (epic.id !== 0) {
                return (
                  <React.Fragment key={epicIndex}>
                    <tr>
                      <td
                        className="bordered_cell"
                        rowSpan={
                          epic.features.length +
                          getAllFeaturesFromEpic(epicIndex, arrayEpics) +
                          1
                        }
                      >
                        {epicIndex}
                      </td>
                      <td
                        className="bordered_cell"
                        rowSpan={
                          epic.features.length +
                          getAllFeaturesFromEpic(epicIndex, arrayEpics) +
                          1
                        }
                      >
                        {epic.name}
                      </td>
                    </tr>
                    {epic.features.map((feature, indexFeature) => {
                      if (feature.id != 0) {
                        return (
                          <React.Fragment key={indexFeature}>
                            <tr>
                              <td
                                rowSpan={feature.userStories.length + 1}
                                className="bordered_cell"
                              >
                                {indexFeature}
                              </td>
                              <td
                                rowSpan={feature.userStories.length + 1}
                                className="bordered_cell"
                              >
                                {feature.name}
                              </td>
                            </tr>
                            {feature.userStories.map(
                              (userStory, index_userStory) => {
                                if (userStory.id != 0) {
                                  return (
                                    <tr key={index_userStory}>
                                      <td className="bordered_cell">
                                        US0{index_userStory}
                                      </td>
                                      <td className="bordered_cell">
                                        {userStory.who}
                                      </td>
                                      <td className="bordered_cell">
                                        {userStory.what}
                                      </td>
                                      <td className="bordered_cell">
                                        {userStory.why}
                                      </td>
                                    </tr>
                                  )
                                }
                              },
                            )}
                          </React.Fragment>
                        )
                      }
                    })}
                  </React.Fragment>
                )
              }
            })}
          </tbody>
        </table>
      </div>
    )
  }

  const addEpicButtonHandler = () => {
    setEpics([
      ...epics,
      {
        id: epics.length + 1,
        name: '',
        features: [
          {
            id: 0,
            name: '',
            plus_icon: true,
            userStories: [],
          },
        ],
      },
    ])
  }

  const addFeatureButtonHandler = (index: number) => {
    const newEpics = [...epics]
    newEpics[index].features.pop()
    newEpics[index].features.push({
      id: newEpics[index].features.length + 1,
      name: '',
      plus_icon: false,
      userStories: [
        {
          id: 0,
          name: '',
          functional: '',
          who: '',
          what: '',
          why: '',
        },
      ],
    })
    newEpics[index].features.push({
      id: 0,
      name: '',
      plus_icon: true,
      userStories: [],
    })

    setEpics(newEpics)
    const newArtifact = artifact
    newArtifact.epics = newEpics
    props.onChangeArtifactObjectHandler(newArtifact)
  }

  const changeEpicNameHandler = (event, index) => {
    let newEpics = [...epics]
    if (event.target.value == '' && newEpics[index].features.length < 2) {
      newEpics = newEpics.splice(index, 1)
    } else {
      newEpics[index].name = event.target.value
    }

    // console.log(event.target.value)

    setEpics(newEpics)
    const newArtifact = artifact
    newArtifact.epics = newEpics
    props.onChangeArtifactObjectHandler(newArtifact)
  }

  const changeFeatureNameHandler = (event, epicIndex, featureIndex) => {
    const newEpics = [...epics]
    newEpics[epicIndex].features[featureIndex].name = event.target.value

    // console.log(newEpics[epicIndex].features[featureIndex].name)
    setEpics(newEpics)
    const newArtifact = artifact
    newArtifact.epics = newEpics
    props.onChangeArtifactObjectHandler(newArtifact)
  }

  const onDropUserStory = (indexFeature: number, epicIndex: number) => {
    /**
     * Vamos precisar criar um state que, no card que tem
     * OnDragStart={} Vai ter uma função pra salvar qual a
     * US ele estará enviando e quando soltar no OnDragLeave, pegaremos esse useState
     * que recebemos como parâmetro
     */
    const newEpics = [...epics]
    const userStoryCard = props.userStoryCard
    const feature_userStories =
      newEpics[epicIndex].features[indexFeature].userStories

    newEpics[epicIndex].features[indexFeature].userStories.pop()
    newEpics[epicIndex].features[indexFeature].userStories = [
      ...feature_userStories,
      {
        id: userStoryCard.requirement_id,
        name: userStoryCard.name,
        functional: userStoryCard.functional,
        who: userStoryCard.who,
        what: userStoryCard.what,
        why: userStoryCard.why,
      },
    ]
    newEpics[epicIndex].features[indexFeature].userStories.push({
      id: 0,
      name: '',
      functional: '',
      who: '',
      what: '',
      why: '',
    })

    const element = document.getElementById(
      'backlog-user-storie-' + userStoryCard.requirement_id,
    )
    element?.classList.add('dropped-user-story')
    element?.setAttribute('draggable', 'false')

    setEpics(newEpics)
    const newArtifact = artifact
    newArtifact.epics = newEpics
    props.onChangeArtifactObjectHandler(newArtifact)

    console.log(newEpics)
  }

  return (
    <div style={{ width: '100%' }}>
      <table className="backlog-table">
        <thead>
          <tr>
            <th rowSpan={2} className="w-[6%]">
              ID do<br></br>Épico
            </th>
            <th rowSpan={2} className="w-[16%]">
              Épico
            </th>
            <th rowSpan={2} className="w-[6%]">
              ID da<br></br>Feature
            </th>
            <th rowSpan={2} className="w-[16%]">
              Feature
            </th>
            <th rowSpan={2} className="w-[6%]">
              ID da<br></br>HS
            </th>
            <th colSpan={3} className="w-[46%]">
              História de Usuário
            </th>
          </tr>
          <tr>
            <th className="w-[12.3%]">Quem?</th>
            <th className="w-[15.3%]">O quê?</th>
            <th className="w-[18.3%]">Por quê?</th>
          </tr>
        </thead>
        <tbody id="backlog-tbody">
          {epics.map((epic, epicIndex) => {
            if (epicIndex !== 200)
              return (
                <React.Fragment>
                  <tr key={epicIndex}>
                    <td
                      className="bordered_cell"
                      rowSpan={
                        epic.features.length +
                        getAllFeaturesFromEpic(epicIndex, epics) +
                        1
                      }
                    >
                      {epicIndex}
                    </td>
                    <td
                      className="bordered_cell"
                      rowSpan={
                        epic.features.length +
                        getAllFeaturesFromEpic(epicIndex, epics) +
                        1
                      }
                    >
                      <input
                        autoFocus
                        type="text"
                        onChange={(event) => {
                          changeEpicNameHandler(event, epicIndex)
                        }}
                        value={epic.name}
                        className="ïnput-on-table"
                      />
                    </td>
                  </tr>
                  {epic.features.map((feature, indexFeature) => {
                    if (feature.plus_icon) {
                      return (
                        <tr key={indexFeature}>
                          <td></td>
                          <td
                            className="bordered_cell add_item_cell"
                            onClick={() => addFeatureButtonHandler(epicIndex)}
                          >
                            <PlusCircle
                              size={28}
                              style={{ margin: '0 auto' }}
                            />
                          </td>
                          <td colSpan={4}></td>
                        </tr>
                      )
                    } else {
                      return (
                        <React.Fragment key={indexFeature}>
                          <tr>
                            <td
                              rowSpan={feature.userStories.length + 1}
                              className="bordered_cell"
                            >
                              {indexFeature}
                            </td>
                            <td
                              rowSpan={feature.userStories.length + 1}
                              className="bordered_cell"
                            >
                              <input
                                autoFocus
                                type="text"
                                onChange={(event) => {
                                  changeFeatureNameHandler(
                                    event,
                                    epicIndex,
                                    indexFeature,
                                  )
                                }}
                                value={feature.name}
                                className="ïnput-on-table"
                              />
                            </td>
                          </tr>
                          {feature.userStories.map(
                            (userStory, index_userStory) => {
                              if (userStory.functional == '') {
                                return (
                                  <tr key={index_userStory}>
                                    <td
                                      colSpan={4}
                                      className="bordered_cell"
                                      onDragLeave={() => {
                                        onDropUserStory(indexFeature, epicIndex)
                                      }}
                                    >
                                      Arrate uma US para cá...
                                    </td>
                                  </tr>
                                )
                              } else {
                                return (
                                  <tr key={index_userStory}>
                                    <td className="bordered_cell">
                                      US0{index_userStory}
                                    </td>
                                    <td className="bordered_cell">
                                      {userStory.who}
                                    </td>
                                    <td className="bordered_cell">
                                      {userStory.what}
                                    </td>
                                    <td className="bordered_cell">
                                      {userStory.why}
                                    </td>
                                  </tr>
                                )
                              }
                            },
                          )}
                        </React.Fragment>
                      )
                    }
                  })}
                </React.Fragment>
              )
          })}
          <tr id="add-epic-container">
            <td></td>
            <td
              className="bordered_cell add_item_cell"
              onClick={addEpicButtonHandler}
            >
              <PlusCircle size={28} style={{ margin: '0 auto' }} />
            </td>
            <td colSpan={6}></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
