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

    epicList[epicIndex].features.forEach((feat) => {
      userStoriesLength += feat.userStories.length
    })
    return userStoriesLength
  }

  /**
   * O que falta é:
   * Fazer os Gets do Database.tsx pegando a lista de épicos, dai moldar ele na table
   */
  if (artifact.done) {
    const arrayEpics = GetAllEpics()
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
            {arrayEpics.map((epic, epicIndex) => {
              return (
                <React.Fragment>
                  <tr key={epicIndex}>
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
                  {epic.features.map((feature, index_feature) => {
                    return (
                      <React.Fragment>
                        <tr key={index_feature}>
                          <td
                            rowSpan={feature.userStories.length + 1}
                            className="bordered_cell"
                          >
                            {index_feature}
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
                            return (
                              <tr>
                                <td className="bordered_cell">
                                  US0{userStory.id}
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
                          },
                        )}
                      </React.Fragment>
                    )
                  })}
                </React.Fragment>
              )
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
      id: newEpics[index].features.length,
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
  }

  const changeEpicNameHandler = (event, index) => {
    let newEpics = [...epics]
    if (event.target.value == '' && newEpics[index].features.length < 2) {
      newEpics = newEpics.splice(index, 1)
    } else {
      newEpics[index].name = event.target.value
    }

    setEpics(newEpics)
  }

  const changeFeatureNameHandler = (event, epic_index, feature_index) => {
    const newEpics = [...epics]
    newEpics[epic_index].features[feature_index].name = event.target.value

    setEpics(newEpics)
  }

  const onDropUserStory = (index_feature: number, epicIndex: number) => {
    /**
     * Vamos precisar criar um state que, no card que tem
     * OnDragStart={} Vai ter uma função pra salvar qual a
     * US ele estará enviando e quando soltar no OnDragLeave, pegaremos esse useState
     * que recebemos como parâmetro
     */
    const newEpics = [...epics]
    const userStoryCard = props.userStoryCard
    const feature_userStories =
      newEpics[epicIndex].features[index_feature].userStories

    newEpics[epicIndex].features[index_feature].userStories.pop()
    newEpics[epicIndex].features[index_feature].userStories = [
      ...feature_userStories,
      {
        id: userStoryCard.id,
        name: userStoryCard.name,
        functional: userStoryCard.functional,
        who: userStoryCard.who,
        what: userStoryCard.what,
        why: userStoryCard.why,
      },
    ]
    newEpics[epicIndex].features[index_feature].userStories.push({
      id: 0,
      name: '',
      functional: '',
      who: '',
      what: '',
      why: '',
    })

    const element = document.getElementById('user-storie-' + userStoryCard.id)
    element?.classList.add('dropped-user-story')
    element?.setAttribute('draggable', 'false')

    setEpics(newEpics)
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
            if (epicIndex != 0)
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
                  {epic.features.map((feature, index_feature) => {
                    if (feature.plus_icon) {
                      return (
                        <tr key={index_feature}>
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
                        <React.Fragment>
                          <tr key={index_feature}>
                            <td
                              rowSpan={feature.userStories.length + 1}
                              className="bordered_cell"
                            >
                              {index_feature}
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
                                    index_feature,
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
                                  <tr>
                                    <td
                                      colSpan={4}
                                      className="bordered_cell"
                                      onDragLeave={() => {
                                        onDropUserStory(
                                          index_feature,
                                          epicIndex,
                                        )
                                      }}
                                    >
                                      Arrate uma US para cá...
                                    </td>
                                  </tr>
                                )
                              } else {
                                return (
                                  <tr>
                                    <td className="bordered_cell">
                                      US0{userStory.id}
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
