import { Header } from '../../components/Header'

import './ProjectList.css'
import { SearchInput } from '../../components/SearchInput/SearchInput'
import { AddButton } from '../../components/AddButton/AddButton'
import { ProjectItem } from './ProjectItem'
import { useEffect, useState } from 'react'
import { IProject } from './IProject'
import { Link } from 'react-router-dom'

import { baseUrl } from '../../Config'

export function ProjectList() {
  const [projects, setProjects] = useState<IProject[]>([])
  const userName = localStorage.getItem('user_name')?.toString()
  const userToken = localStorage.getItem('user_token')

  useEffect(() => {
    fetch(`${baseUrl}/user/projects`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then((response) => {
        return response.json().then((data) => {
          console.log(data)
          setProjects(data)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <Header hasTitle title="Dashboard" />
      <div className="w-full h-[929px] py-[70px] px-[35px]">
        <div className="w-full h-full bg-green-400 border-13px py-[35px] px-[100px]">
          <div className="flex-row">
            <p className="container-title">Projetos</p>
            <Link to="/project/new">
              <AddButton text="Projetos" />
            </Link>
          </div>
          <div style={{ width: '100%', marginTop: '45px' }}>
            <SearchInput placeholder="Pesquisar Projeto" />
          </div>
          <div className="th-container">
            <div className="th-name-container">Nome</div>
            <div className="th-created-at-container">Objetivo</div>
            <div className="th-who-container">Responsável</div>
          </div>
          <div
            style={{ width: '100%', overflowY: 'scroll', maxHeight: '400px' }}
          >
            {projects.map((project) => {
              return (
                <ProjectItem
                  project_id={project.project_id}
                  name={project.name}
                  objective={project.objective}
                  who={userName}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
