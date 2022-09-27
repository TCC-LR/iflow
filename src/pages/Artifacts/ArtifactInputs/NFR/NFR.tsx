import { useEffect, useState } from 'react'
import { InputTextWithSelect } from '../../../../components/InputTextWithSelect/InputTextWithSelect'
import './NFR.css'
import CytoscapeComponent from 'react-cytoscapejs'

export interface INFR {
  first_level: ILevel[]
  second_level: ILevel[]
  third_level: ILevel[]
}

export interface ILevel {
  id: number
  name: string
}

export function NFR(props: any) {
  const [width, setWidth] = useState('100%')
  const [height, setHeight] = useState('700px')
  // const [graphData, setGraphData] = useState([
  //   { data: { id: '1', label: 'Node 1' }, position: { x: 0, y: 0 } },
  //   { data: { id: '2', label: 'Node 2' }, position: { x: 100, y: 0 } },
  //   { data: { source: '1', target: '2', label: 'Edge from Node1 to Node2' } },
  // ])
  const [graphData, setGraphData] = useState([
    { data: { id: '0', label: 'Ferramenta' } },
  ])

  const artifact = props.artifact
  const nfr: INFR = {
    first_level: [
      {
        id: 0,
        name: '',
      },
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
      },
    ],
    second_level: [
      {
        id: 0,
        name: '',
      },
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
      },
    ],
    third_level: [
      {
        id: 0,
        name: '',
      },
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
      },
    ],
  }

  const [nfrData, setNfrData] = useState(nfr)

  if (artifact.done) {
    return (
      <>
        <div className="mt-5 w-full h-[700px] bg-[#81b29a]">
          <CytoscapeComponent
            elements={artifact.graph}
            style={{ width, height }}
            pan={{ x: 200, y: 200 }}
            layout={{
              name: 'breadthfirst',
              fit: true,
              directed: true,
              padding: 30,
              animate: true,
              animationDuration: 1000,
              avoidOverlap: true,
              nodeDimensionsIncludeLabels: false,
            }}
            stylesheet={[
              {
                selector: 'node',
                style: {
                  // 'background-image': `url(${cloudData})`,
                  'background-color': '#f4f1de',
                  label: 'data(label)',
                  shape: 'barrel',
                  width: 200,
                  height: 200,
                  'text-valign': 'center',
                  'text-halign': 'center',
                  'font-size': 20,
                  'text-wrap': 'wrap',
                  'text-max-width': 200,
                },
              },
              {
                selector: 'edge',
                style: {
                  width: 5,
                  'line-color': '#f4f1de',
                  'target-arrow-color': '#ccc',
                },
              },
            ]}
          />
        </div>
      </>
    )
  }

  const updateNfrDataHandler = (new_nfr: INFR) => {
    console.log('new NFRS', new_nfr)
    const newGraphData = [
      { data: { id: '0', label: 'Ferramenta' } },
      {
        data: {
          id: '1',
          label: new_nfr.first_level[0].name,
        },
      },
      {
        data: {
          id: '2',
          label: new_nfr.first_level[1].name,
        },
      },
      {
        data: {
          id: '3',
          label: new_nfr.first_level[2].name,
        },
      },
      {
        data: {
          id: '4',
          label: new_nfr.second_level[0].name,
        },
      },
      {
        data: {
          id: '5',
          label: new_nfr.second_level[1].name,
        },
      },
      {
        data: {
          id: '6',
          label: new_nfr.second_level[2].name,
        },
      },
      {
        data: {
          id: '7',
          label: new_nfr.third_level[0].name,
        },
      },
      {
        data: {
          id: '8',
          label: new_nfr.third_level[1].name,
        },
      },
      {
        data: {
          id: '9',
          label: new_nfr.third_level[2].name,
        },
      },
      {
        data: {
          source: '0',
          target: '1',
          label: 'Edge from 1 to 2',
        },
      },
      {
        data: {
          source: '0',
          target: '2',
          label: 'Edge from 2 to 3',
        },
      },
      {
        data: {
          source: '0',
          target: '3',
          label: 'Edge from 1 to 2',
        },
      },
      {
        data: {
          source: '1',
          target: '4',
          label: 'Edge from 2 to 3',
        },
      },
      {
        data: {
          source: '4',
          target: '7',
          label: 'Edge from 1 to 2',
        },
      },
      {
        data: {
          source: '2',
          target: '5',
          label: 'Edge from 2 to 3',
        },
      },
      {
        data: {
          source: '5',
          target: '8',
          label: 'Edge from 2 to 3',
        },
      },
      {
        data: {
          source: '3',
          target: '6',
          label: 'Edge from 2 to 3',
        },
      },
      {
        data: {
          source: '6',
          target: '9',
          label: 'Edge from 2 to 3',
        },
      },
    ]
    setGraphData(newGraphData)
    setNfrData(new_nfr)
    const newArtifact = artifact
    newArtifact.new_nfr = new_nfr
    newArtifact.graph = newGraphData
    console.log(newArtifact)
    props.onChangeArtifactObjectHandler(newArtifact)
  }

  return (
    <>
      <div className="inputs-container">
        <div className="flex-row gap-[4rem] w-full">
          <div className="w-full">
            <InputTextWithSelect label={true} label_name="Confiabilidade" />
          </div>
          <div className="w-full">
            <InputTextWithSelect label={true} label_name="Segurança" />
          </div>
          <div className="w-full">
            <InputTextWithSelect label={true} label_name="Facilidade" />
          </div>
        </div>
      </div>
      <div className="inputs-container">
        <div className="flex-row w-full">
          <p
            className="container-title w-full text-center"
            style={{ fontSize: '28px', color: '#3D405B' }}
          >
            Dentro dos aspectos indicados anteriormente, qual requisito não
            funcional é mais importante dentro de cada contexto?
          </p>
        </div>
        <div className="flex-row gap-[4rem] w-full mt-5">
          {nfrData.second_level.map((level, index) => {
            return (
              <div className="w-full">
                <InputTextWithSelect
                  placeholder="Digite Aqui..."
                  updateNfrDataHandler={updateNfrDataHandler}
                  level_id={1}
                  level_item={level}
                  index={index}
                  nfrData={nfrData}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className="inputs-container">
        <div className="flex-row w-full">
          <p
            className="container-title w-full text-center"
            style={{ fontSize: '28px', color: '#3D405B' }}
          >
            A partir dos requisitos selecionados anteriormente, qual requisito
            não funcional ajuda a satisfazer o seu anterior?
          </p>
        </div>
        <div className="flex-row gap-[4rem] w-full mt-5">
          {nfrData.third_level.map((level, index) => {
            return (
              <div className="w-full">
                <InputTextWithSelect
                  placeholder="Digite Aqui..."
                  updateNfrDataHandler={updateNfrDataHandler}
                  level_id={2}
                  level_item={level}
                  index={index}
                  nfrData={nfrData}
                />
              </div>
            )
          })}
        </div>
      </div>

      <div className="inputs-container">
        <div className="flex-row w-full">
          <p
            className="container-title w-full text-center"
            style={{ fontSize: '28px', color: '#3D405B' }}
          >
            Quais medidas mais concretas podem ser tomadas para alcançar cada um
            dos requisitos não funcionais selecionados anteriormente?
          </p>
        </div>
        <div className="flex-row gap-[4rem] w-full mt-5">
          {nfrData.third_level.map((level, index) => {
            return (
              <div className="w-full">
                <InputTextWithSelect
                  placeholder="Digite Aqui..."
                  updateNfrDataHandler={updateNfrDataHandler}
                  level_id={3}
                  level_item={level}
                  index={index}
                  nfrData={nfrData}
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
