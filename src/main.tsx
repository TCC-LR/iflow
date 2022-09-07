import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.css'

import { ProjectList } from './pages/Projects/ProjectList'
import { Register } from './pages/Register'
import { NewProject } from './pages/NewProject/NewProject'
import { StepList } from './pages/Steps/StepList'
import { ArtifactsList } from './pages/Artifacts/ArtifactsList'
import { NewArtifact } from './pages/Artifacts/NewArtifact'
import { Artifact } from './pages/Artifacts/Artifact'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="projects" element={<ProjectList />} />
      <Route path="register" element={<Register />} />
      <Route path="project/new" element={<NewProject />} />
      <Route path="project/:project_id/steps" element={<StepList />} />
      <Route
        path="project/:project_id/step/:stepId"
        element={<ArtifactsList />}
      />
      <Route
        path="project/:project_id/step/:stepId/artifact/new"
        element={<NewArtifact />}
      />
      <Route
        path="project/:project_id/step/:stepId/artifact/:artifactId"
        element={<Artifact />}
      />
      <Route
        path="*"
        element={
          <main style={{ padding: '1rem' }}>
            <p>There is nothing here!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>,
)
