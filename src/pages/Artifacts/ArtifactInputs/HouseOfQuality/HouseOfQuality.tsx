import './HouseOfQuality.css'

export function HouseOfQuality(props: any) {
  const artifact = props.artifact

  if (artifact.done) {
    return <></>
  }

  return (
    <div className="w-full">
      <div className="flex-row w-full">
        <p
          className="container-title w-full text-center"
          style={{ fontSize: '28px', color: '#3D405B' }}
        >
          Relacione os requisitos funcionais que contribuem para alcançar o
          RnF-01
        </p>
      </div>
      <div
        className="flex flex-row w-full h-[350px] mt-[20px]"
        style={{
          border: '1px solid #3D405B',
          borderRadius: '8px',
          color: '#3D405B',
        }}
      >
        <div className="flex flex-col w-full">
          <div className="w-full p-4 text-center">Forte</div>
          <div></div>
        </div>
        <div
          className="flex flex-col w-full"
          style={{
            borderLeft: '1px solid #3D405B',
            borderRight: '1px solid #3D405B',
          }}
        >
          <div className="w-full p-4 text-center">Médio</div>
          <div></div>
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full p-4 text-center">Fraco</div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
