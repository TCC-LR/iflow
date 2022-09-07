export interface IRequirementItem {
  id: number
  name: string
  functional: string
  who: string
  what: string
  why: string

  hasBeingDropped?: Boolean
}

export interface IFeature {
  id: number
  name: string
  plus_icon: Boolean
  userStories: IRequirementItem[]
}

export interface IEpic {
  id: number
  name: string
  features: IFeature[]
}

interface IArtifactSteps {
  id: number
  name: string

  /** 5W2H */
  what?: string
  why?: string
  where?: string
  when?: string
  who?: string
  how?: string
  how_much?: string

  /** Rich Picture */
  fileUrl?: string
  filename?: string
  description?: string
  requirements?: IRequirementItem[]
  lexicons?: ILexiconItem[]
  inputType?: string
  iconType?: string

  epics?: IEpic[]
  hasRequirementsElicitation: Boolean
  done: Boolean
}

interface IStep {
  id: number
  name: string
  hasArtifacts: Boolean
  artifactSteps: IArtifactSteps[]
}

export const globalSteps: IStep[] = [
  {
    id: 1,
    name: 'Pré-rastreabilidade',
    hasArtifacts: true,
    artifactSteps: [
      {
        id: 1,
        name: '5W2H',
        what: '',
        why: '',
        where: '',
        when: '',
        who: '',
        how: '',
        how_much: '',
        iconType: 'text',
        inputType: '5W2H',
        hasRequirementsElicitation: false,
        done: false,
      },
      {
        id: 2,
        name: 'Rich Picture',
        fileUrl: '/src/public/images/rich_picture.jpg',
        filename: 'rich_picture.jpg',
        iconType: 'image',
        inputType: 'image',
        hasRequirementsElicitation: false,
        done: true,
      },
    ],
  },
  {
    id: 2,
    name: 'Elicitação',
    hasArtifacts: false,
    artifactSteps: [
      {
        id: 1,
        name: 'Brainstorming',
        description:
          'Testando descrição do brainstorming e bla bla bla bla bla',
        iconType: 'text',
        inputType: 'text',
        hasRequirementsElicitation: true,
        requirements: [
          {
            id: 1,
            name: 'Cadastro Usuário',
            functional: 'true',
            what: 'Cadastrar usuário',
            who: 'Usuário',
            why: 'Para ter uma conta e acessar o app',
          },
        ],
        done: true,
      },
      {
        id: 2,
        name: 'Questionário',
        iconType: 'audio',
        inputType: 'text',
        description: '',
        hasRequirementsElicitation: true,
        requirements: [],
        done: false,
      },
      {
        id: 3,
        name: 'Protótipo de baixa qualidade',
        iconType: 'image',
        inputType: 'image',
        fileUrl: '/src/public/images/rich_picture.jpg',
        filename: 'rich_picture.jpg',
        hasRequirementsElicitation: true,
        requirements: [
          {
            id: 2,
            name: 'Login do Usuário',
            functional: 'true',
            what: 'Realizar login usuário',
            who: 'Usuário',
            why: 'Para acessar o app',
          },
          {
            id: 3,
            name: 'RF 2',
            functional: 'true',
            what: 'Realizar login usuário',
            who: 'Usuário',
            why: 'Para acessar o app',
          },
          {
            id: 4,
            name: 'RF 3',
            functional: 'true',
            what: 'Realizar login usuário',
            who: 'Usuário',
            why: 'Para acessar o app',
          },
          {
            id: 5,
            name: 'RF 4',
            functional: 'true',
            what: 'Realizar login usuário',
            who: 'Usuário',
            why: 'Para acessar o app',
          },
          {
            id: 6,
            name: 'RNF 4',
            functional: 'false',
            what: 'Realizar login usuário',
            who: 'Usuário',
            why: 'Para acessar o app',
          },
        ],
        done: true,
      },
      {
        id: 4,
        name: 'Storytelling',
        iconType: 'text',
        inputType: 'text',
        description: '',
        hasRequirementsElicitation: true,
        requirements: [],
        done: false,
      },
      {
        id: 5,
        name: 'Entrevista',
        iconType: 'audio',
        inputType: 'text',
        description: '',
        hasRequirementsElicitation: true,
        requirements: [],
        done: false,
      },
      {
        id: 6,
        name: 'Análise de protocolo',
        iconType: 'audio',
        inputType: 'audio',
        fileUrl: '/src/public/audios/Happy_wavy.mp3',
        filename: 'Happy_wavy.mp3',
        hasRequirementsElicitation: true,
        requirements: [],
        done: true,
      },
    ],
  },
  {
    id: 3,
    name: 'Modelagem',
    hasArtifacts: false,
    artifactSteps: [
      {
        id: 1,
        name: 'Backlog',
        inputType: 'Backlog',
        hasRequirementsElicitation: false,
        epics: [
          {
            id: 0,
            name: 'Usuário',
            features: [
              {
                id: 0,
                name: 'Login Usuário',
                plus_icon: false,
                userStories: [
                  {
                    id: 2,
                    name: 'Login do Usuário',
                    functional: 'true',
                    what: 'Realizar login usuário',
                    who: 'Usuário',
                    why: 'Para acessar o app',
                  },
                  {
                    id: 3,
                    name: 'RF 2',
                    functional: 'true',
                    what: 'Realizar login usuário',
                    who: 'Usuário',
                    why: 'Para acessar o app',
                  },
                ],
              },
            ],
          },
          {
            id: 1,
            name: 'Post',
            features: [
              {
                id: 0,
                name: 'Postagem',
                plus_icon: false,
                userStories: [
                  {
                    id: 4,
                    name: 'RF 3',
                    functional: 'true',
                    what: 'Realizar login usuário',
                    who: 'Usuário',
                    why: 'Para acessar o app',
                  },
                  {
                    id: 5,
                    name: 'RF 4',
                    functional: 'true',
                    what: 'Realizar login usuário',
                    who: 'Usuário',
                    why: 'Para acessar o app',
                  },
                ],
              },
            ],
          },
        ],
        done: false,
      },
      {
        id: 2,
        name: 'NFR',
        hasRequirementsElicitation: false,
        done: false,
      },
      {
        id: 3,
        name: 'Léxicos',
        inputType: 'Lexicon',
        hasRequirementsElicitation: false,
        lexicons: [
          {
            id: 0,
            name: 'Lexicon 1',
            synonym: 'A',
            notion: 'B',
            impact: 'C',
          },
        ],
        done: false,
      },
    ],
  },
  {
    id: 4,
    name: 'Verificação',
    hasArtifacts: false,
    artifactSteps: [],
  },
  {
    id: 5,
    name: 'House of Quality',
    hasArtifacts: false,
    artifactSteps: [
      {
        id: 1,
        name: 'House of Quality',
        inputType: 'House of Quality',
        hasRequirementsElicitation: false,
        done: false,
      },
    ],
  },
]

export function GetSteps(): IStep[] {
  return globalSteps
}

export function GetArtifacts(stepId: number) {
  const steps = GetSteps()

  const step = steps.filter((step) => {
    return step.id === stepId
  })[0]

  return step.artifactSteps
}

export function GetArtifact(stepId: number, artifactId: number) {
  const steps = GetSteps()

  const step = steps.filter((step) => {
    return step.id === stepId
  })[0]

  const artifact = step.artifactSteps.filter((artifact) => {
    return artifact.id === artifactId
  })[0]

  return artifact
}

export function GetAllUserStories() {
  const steps = GetSteps()

  const step = steps[1]

  const artifactSteps = step.artifactSteps
  const userStories: any = []

  for (let i = 0; i < artifactSteps.length; i++) {
    artifactSteps[i].requirements?.forEach((requirement) => {
      userStories.push(requirement)
    })
  }

  return userStories
}

export function GetAllEpics() {
  const steps = GetSteps()

  const step = steps[2]

  const artifactSteps = step.artifactSteps
  const epics: any = []

  for (let i = 0; i < artifactSteps.length; i++) {
    artifactSteps[i].epics?.forEach((epic) => {
      epics.push(epic)
    })
  }

  console.log('Database epics', epics)

  return epics
}

export function GetProjects() {
  return [
    {
      name: 'Projeto 1',
      created_at: 'Jun 06, 22',
      who: 'Usuário',
    },
    {
      name: 'Projeto 2',
      created_at: 'Jun 06, 22',
      who: 'Usuário',
    },
    {
      name: 'Projeto 3',
      created_at: 'Jun 06, 22',
      who: 'Usuário',
    },
    {
      name: 'Projeto 4',
      created_at: 'Jun 06, 22',
      who: 'Usuário',
    },
    {
      name: 'Projeto 5',
      created_at: 'Jun 06, 22',
      who: 'Usuário',
    },
    {
      name: 'Projeto 6',
      created_at: 'Jun 06, 22',
      who: 'Usuário',
    },
    {
      name: 'Projeto 7',
      created_at: 'Jun 06, 22',
      who: 'Usuário',
    },
  ]
}
