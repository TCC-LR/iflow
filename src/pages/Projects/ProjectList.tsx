import { Header } from '../../components/Header'

import './ProjectList.css'
import { SearchInput } from '../../components/SearchInput/SearchInput'
import { AddButton } from '../../components/AddButton/AddButton'
import { ProjectItem } from './ProjectItem'
import { useEffect, useState } from 'react'
import { IProject } from './IProject'
import { Link } from 'react-router-dom'

import { GetProjects } from '../../Database'

export function ProjectList() {
  const [projects, setProjects] = useState<IProject[]>([])

  useEffect(() => {
    setProjects(GetProjects())
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
            <div className="th-created-at-container">Criado em</div>
            <div className="th-who-container">Responsável</div>
          </div>
          <div
            style={{ width: '100%', overflowY: 'scroll', maxHeight: '400px' }}
          >
            {projects.map((project) => {
              return (
                <ProjectItem
                  key={project.name}
                  name={project.name}
                  created_at={project.created_at}
                  who={project.who}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
