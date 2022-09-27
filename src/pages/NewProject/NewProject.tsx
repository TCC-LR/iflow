import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import { baseUrl } from '../../Config'

import './NewProject.css'

export function NewProject() {
  function handleCreateNewProject() {
    const userId = localStorage.getItem('user_id')
    const projectName = document.getElementById(
      'project-name',
    ) as HTMLInputElement
    const projectDescription = document.getElementById(
      'project-description',
    ) as HTMLInputElement
    const projectObjective = document.getElementById(
      'project-objective',
    ) as HTMLInputElement

    const project = JSON.stringify({
      name: projectName.value,
      objective: projectObjective.value,
      description: projectDescription.value,
      user_id: userId,
    })

    fetch(`${baseUrl}/project`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('user_token')}`,
      },
      body: project,
    })
      .then((response) => {
        return response.json().then((data) => {
          window.location.href = '/project/' + data.project_id + '/steps'
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Header hasTitle title="Novo Projeto" />
      <div className="w-full h-[929px] py-[70px] px-[35px]">
        <div
          className="w-full h-full bg-green-400 border-13px py-[35px] px-[200px]"
          style={{ overflowY: 'auto' }}
        >
          <div
            className="font-[Handlee] text-[45px] align-center"
            style={{ color: 'rgba(62, 64, 91, 1)' }}
          >
            Informações do Projeto
          </div>
          <div className="border-css align-center">
            <strong>Projeto X</strong>
          </div>
          {/* <div className="border-css description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div> */}
          <div className="border-css">
            <input
              id="project-name"
              type="text"
              placeholder="Nome do projeto"
            />
          </div>
          <div className="border-css">
            <textarea
              id="project-description"
              placeholder="O que é este projeto?"
              style={{ height: '80px' }}
            ></textarea>
          </div>
          <div className="border-css">
            <textarea
              id="project-objective"
              placeholder="Qual o objetivo desse projeto?"
              style={{ height: '80px' }}
            ></textarea>
          </div>
          <div className="btns-container">
            <Link to="/projects">
              <button className="border border-blue-400 w-[130px] h-[38px] bg-blue-400 rounded-lg text-[16px] text-white-200">
                Voltar
              </button>
            </Link>
            {/* <Link to="/project/1/steps"> */}
            <button
              onClick={handleCreateNewProject}
              className="border border-blue-400 w-[130px] h-[38px] bg-blue-400 rounded-lg text-[16px] text-white-200"
            >
              Criar
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  )
}
