import { createContext, useEffect, useState } from 'react'
import { baseUrl } from '../Config'

interface Artifact {
  artifact_id: string
  name: string
  stage: string
}

interface ArtifactContextType {
  artifacts: Artifact[]
}

interface ArtifactProviderProps {
  children: any
}

export const ArtifactsContext = createContext({} as ArtifactContextType)

export function ArtifactsProvider(props: ArtifactProviderProps) {
  const [artifacts, setArtifacts] = useState<Artifact[]>([])

  async function loadArtifacts() {
    const projectId = localStorage.getItem('project_id')
    // 2bd3ef66-a23b-4147-b237-c195d6497d53
    const response = await fetch(
      `${baseUrl}/artifact/?project_id=2bd3ef66-a23b-4147-b237-c195d6497d53`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
      },
    )
    const data = await response.json()

    console.log(data)

    setArtifacts(data)
  }

  useEffect(() => {
    loadArtifacts()
  }, [])

  return (
    <ArtifactsContext.Provider value={{ artifacts }}>
      {props.children}
    </ArtifactsContext.Provider>
  )
}
