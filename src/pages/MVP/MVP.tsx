import React, { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { baseUrl } from '../../Config'
import { IEpic } from '../../Database'
import './MVP.css'

export function MVP() {
  const project_id = localStorage.getItem('project_id')

  const [epics, setEpics] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}/functional/mvp`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user_token')}`,
      },
    }).then((response) => {
      return response.json().then((data) => {
        const requirementsIdArray = []

        data.map((item) => {
          requirementsIdArray.push(item)
        })

        fetch(`${baseUrl}/functional/?backlog=true&requirement=true`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`,
          },
        }).then((response) => {
          return response.json().then((backlog) => {
            const epics = []

            console.log('requirementsIdArray', requirementsIdArray)
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
                    user_story.must = requirementsIdArray.includes(
                      user_story.functional_id,
                    )
                  })
                })
                epics.push(epic)
              }
            })
            setEpics(epics)
          })
        })
      })
    })
  }, [])

  useEffect(() => {
    // Buscar MVP gerado para esse project_id com fetch
  }, [])

  const getAllFeaturesFromEpic = (epicIndex: number) => {
    let userStoriesLength = 0
    console.log('EPICS', epics)
    epics[epicIndex].features.map((feat) => {
      userStoriesLength += feat.userStories.length
    })
    console.log('userStoriesLength', userStoriesLength)
    return userStoriesLength
  }

  const tableToCSV = () => {
    // Variable to store the final csv data
    let csv_data = []

    // Get each row data
    const rows = document.getElementsByTagName('tr')
    for (let i = 0; i < rows.length; i++) {
      // Get each column data
      const cols = rows[i].querySelectorAll('td,th')

      // Stores each csv row data
      const csvrow = []
      for (let j = 0; j < cols.length; j++) {
        // Get the text data of each cell of
        // a row and push it to csvrow
        csvrow.push(cols[j].innerHTML)
      }

      // Combine each column value with comma
      csv_data.push(csvrow.join(','))
    }
    // combine each row data with new line character
    csv_data = csv_data.join('\n')

    return csv_data
  }

  const exportCSV = () => {
    const csv_data = tableToCSV()
    // Create CSV file object and feed our
    // csv_data into it
    const CSVFile = new Blob([csv_data], { type: 'text/csv' })

    // Create to temporary link to initiate
    // download process
    const temp_link = document.createElement('a')

    // Download csv file
    temp_link.download = 'MVP.csv'
    const url = window.URL.createObjectURL(CSVFile)
    temp_link.href = url

    // This link should not be displayed
    temp_link.style.display = 'none'
    document.body.appendChild(temp_link)

    // Automatically click the link to trigger download
    temp_link.click()
    document.body.removeChild(temp_link)
  }

  return (
    <div>
      <Header
        hasTitle
        title="MVP"
        backTitle={''}
        hasBackArrow={true}
        backUrl={`/project/${project_id}/steps`}
        hasAddButton={true}
        addButtonTitle="Exportar CSV"
        clickButtonHandler={() => {
          exportCSV()
        }}
        addButtonUrl=""
      />
      <div className="inputs-container">
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
                return (
                  <React.Fragment key={epicIndex}>
                    <tr>
                      <td
                        className="bordered_cell"
                        rowSpan={
                          getAllFeaturesFromEpic(epicIndex, epics) +
                          epic.features.length +
                          1
                        }
                      >
                        {epicIndex}
                      </td>
                      <td
                        className="bordered_cell"
                        rowSpan={
                          getAllFeaturesFromEpic(epicIndex, epics) +
                          epic.features.length +
                          1
                        }
                      >
                        {epic.name}
                      </td>
                    </tr>
                    {epic.features.map((feature, index_feature) => {
                      return (
                        <React.Fragment key={index_feature}>
                          <tr>
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
                                  {userStory.must ? (
                                    <td className="bordered_cell">M</td>
                                  ) : (
                                    <></>
                                  )}
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
      </div>
    </div>
  )
}
